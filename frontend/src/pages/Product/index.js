import React from "react";

import { useEffect } from "react";

import { useParams } from "react-router-dom";

import { Container, Row, Col } from "react-bootstrap";
import "./style.css";

const API = "http://127.0.0.1:8080/api/products/item";
const productMainImageAPI = "http://127.0.0.1:8080/api/products/mainimage";



function intToVND(price) {
    return price.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
    });
}

async function fetchProduct(id) {
    const res = await fetch(`${API}?id=${id}`);
    const data = await res.json();
    const product = JSON.parse(data);
    return product;
}

async function fetchProductMainImage(id) {
    const response = await fetch(`${productMainImageAPI}?id=${id}`);
    const data = await response.json();
    const image = JSON.parse(data);
    console.log(image);
    return image[0].link;
}

function Product() {
    const { id } = useParams();
    const [product, setProduct] = React.useState({});

    useEffect(() => {
        fetchProduct(id)
            .then((data) => {
                console.log(data);
                setProduct(data[0]);
            })
            .then(
                fetchProductMainImage(id).then((data) => {
                    console.log(data);
                    setProduct((prev) => ({ ...prev, image: data }));
                })
            );
    }, []);

    return (
        <div className="single-product-main">
           

            <section class="section" id="product">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-6">
                            <div class="product-image">
                                <img
                                    src={product.image}
                                    alt="product"
                                    class="img-fluid"
                                />
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="product-details">
                                <h3>{product.name}</h3>
                                <div class="price">
                                    <h4>{product.price ? intToVND(product.price) : 0}</h4>

                                    <div class="description">
                                        <p>{product.desc}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Product;
