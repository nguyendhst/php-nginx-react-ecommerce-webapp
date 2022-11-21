import React from "react";
import { Col, Card, Container, Row, Pagination } from "react-bootstrap";

import "./index.css";

const productInfoAPI = "http://127.0.0.1:8000/api/products/list";
const productImagesAPI = "http://127.0.0.1:8000/api/products/images";
const productMainImageAPI = "http://127.0.0.1:8000/api/products/mainimage";

const fetchAllProductsInfo = async () => {
  const response = await fetch(productInfoAPI);
  const data = await response.json();
  console.log(data);
  const products = JSON.parse(data);
  console.log(products);
  return products;
};

const fetchProductImages = async (id) => {
  const response = await fetch(`${productImagesAPI}/${id}`);
  const data = await response.json();
  const images = JSON.parse(data);
  return images;
};

const fetchProductMainImage = async (id) => {
  const response = await fetch(`${productMainImageAPI}?id=${id}`);
  const data = await response.json();
  const image = JSON.parse(data);
  console.log(image);
  return image[0];
};

function ProductsGrid(props) {
  const [products, setProducts] = React.useState([]);
  const [images, setImages] = React.useState([]);
  const [category, setCategory] = React.useState([]);
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
    Math.ceil(products.length / productsPerPage)
  );

  const [isLoaded, setIsLoaded] = React.useState(false);

  // load products from API when first mounted
  React.useEffect(() => {
    fetchAllProductsInfo().then((data) => {
      setProducts(data);
      setIsLoaded(true);
    });
  }, []);

  // fetch main image for each product
  React.useEffect(() => {
    products.map((product) => {
      fetchProductMainImage(product.id).then((data) => {
        setImages([...images, data]);
      });
    });
  }, [products]);

  // load products from API when category changes
  // React.useEffect(() => {
  //   fetchAllProducts().then((data) => {
  //     setProducts(data);
  //     setIsLoaded(true);
  //   });
  // }, [category]);

  const getImageOfProduct = (id) => {
    const image = images.find((image) => image.link_id === id);
    console.log(image);
    console.log(products);
    console.log(images);
    return image;
  };

  return (
    <div className="main-content">
      <Container>
        <Row>
          <Col md={12}>
            <Row>
              {products.map((product) => (
                <Col md={4} key={product.id}>
                  <Card className="product-card">
                    <Card.Img
                      variant="top"
                      src={getImageOfProduct(product.id).link}
                    />
                    <Card.Body>
                      <Card.Title>{product.name}</Card.Title>
                      <Card.Text>{product.description}</Card.Text>
                      <Card.Text>{product.price}</Card.Text>
                    </Card.Body>
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
