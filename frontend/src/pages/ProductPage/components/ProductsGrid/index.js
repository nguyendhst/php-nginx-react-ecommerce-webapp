import React from "react";
import { Col, Card, Container, Row } from "react-bootstrap";

import "./index.css";

const productInfoAPI = "http://127.0.0.1:8080/api/products/list";
const productImagesAPI = "http://127.0.0.1:8080/api/products/images";
const productMainImageAPI = "http://127.0.0.1:8080/api/products/mainimage";

const fetchAllProductsInfo = async (cat) => {
    if (cat != "") {
        console.log("fetching products with category: ", cat);
        const response = await fetch(`${productInfoAPI}?category=${cat}`);
        const data = await response.json();
        const products = JSON.parse(data);
        return products;
    } else {
        const response = await fetch(productInfoAPI);
        const data = await response.json();
        const products = JSON.parse(data);
        return products;
    }
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
    return image[0].link;
};

const intToVND = (price) => {
    return price.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
    });
};

function ProductsGrid(props) {
    const { category } = props;

    // products based on set category
    const [products, setProducts] = React.useState([]);
    const [images, setImages] = React.useState([]);

    // load products from API when first mounted
    React.useEffect(() => {
        fetchAllProductsInfo(category).then((data) => {
            console.log("data:", data);
            setProducts(data);
        });
    }, []);

    // map main image to each product
    React.useEffect(() => {
        products.forEach((product) => {
            fetchProductMainImage(product.id).then((data) => {
                console.log("image:", data);
                const image = {
                    id: product.id,
                    link: data,
                };
                setImages((images) => [...images, image]);
            });
        });
    }, [products]);

    const getMainImage = (id) => {
        let image = images.find((image) => image.id === id);
        if (image) {
            return image.link;
        } else {
            console.log("no image found");
        }
    };

    return (
        <div className="main-content">
            <Container>
                <Row>
                    <Col md={12}>
                        <Row>
                            {products.map((product) => {
                                return (
                                    <Col md={3} key={product.id}>
                                        <a
                                            href={`/products/item/${product.id}`}
                                            id="product-link"
                                        >
                                            <Card className="product-card">
                                                <Card.Img
                                                    variant="top"
                                                    src={getMainImage(
                                                        product.id
                                                    )}
                                                />
                                                <Card.Body>
                                                    <Card.Title
                                                        style={{
                                                            "marginBottom":
                                                                "10px",
                                                        }}
                                                    >
                                                        {product.name}
                                                    </Card.Title>
                                                    <Card.Text>
                                                        {intToVND(
                                                            product.price
                                                        )}
                                                    </Card.Text>
                                                </Card.Body>
                                            </Card>
                                        </a>
                                    </Col>
                                );
                            })}
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default ProductsGrid;
