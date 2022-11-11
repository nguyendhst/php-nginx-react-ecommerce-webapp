import React from "react";
import { Col, Card, Container, Row, Pagination } from "react-bootstrap";

import "./index.css";

function ProductsGrid(props) {
  const [products, setProducts] = React.useState(props.products);
  const [category, setCategory] = React.useState(props.category);
  const [page, setPage] = React.useState(1);

  const [sort, setSort] = React.useState("default");
  const [sortOptions, setSortOptions] = React.useState([
    { value: "default", label: "Default" },
    { value: "price-asc", label: "Price: Low to High" },
    { value: "price-desc", label: "Price: High to Low" },
    { value: "name-asc", label: "Name: A to Z" },
    { value: "name-desc", label: "Name: Z to A" },
  ]);

  const [filter, setFilter] = React.useState("all");
  const [filterOptions, setFilterOptions] = React.useState([
    { value: "all", label: "All" },
    { value: "available", label: "Available" },
    { value: "outofstock", label: "Out of Stock" },
  ]);

  const [productsPerPage, setProductsPerPage] = React.useState(5);
  const [totalPages, setTotalPages] = React.useState(
    Math.ceil(props.products.length / 5)
  );
  console.log(totalPages);

  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {}, []);

  const populatePage = (pageNumber) => {
    const start = (pageNumber - 1) * productsPerPage;
    const end = start + productsPerPage;
    const pageProducts = products.slice(start, end);
    return pageProducts;
  };

  return (
    <div className="main-content">
      <Container>
        <Row>
          <Col md={12}>
            <Row>
              {populatePage(page).map((product) => (
                <Col md={4} key={product.id}>
                  <Card>
                    <Card.Img variant="top" src={product.image} />
                    <Card.Body>
                      <Card.Title>{product.name}</Card.Title>
                      <Card.Text>{product.description}</Card.Text>
                    </Card.Body>
                    <Card.Footer>
                      <small className="text-muted">{product.price}</small>
                    </Card.Footer>
                  </Card>
                </Col>
              ))}
            </Row>
            <div className="pagination">
              <Pagination>
                <Pagination.First
                  onClick={() => {
                    setPage(1);
                  }}
                />
                <Pagination.Prev
                  onClick={() => {
                    if (page > 1) {
                      setPage(page - 1);
                    }
                  }}
                />
                {Array.from({ length: totalPages }, (_, i) => (
                  <Pagination.Item
                    key={i}
                    active={i + 1 === page}
                    onClick={() => setPage(i + 1)}
                  >
                    {i + 1}
                  </Pagination.Item>
                ))}
                <Pagination.Next
                  onClick={() => {
                    if (page < totalPages) {
                      setPage(page + 1);
                    }
                  }}
                />
                <Pagination.Last
                  onClick={() => {
                    setPage(totalPages);
                  }}
                />
              </Pagination>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ProductsGrid;
