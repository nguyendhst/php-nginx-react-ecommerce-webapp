import InfiniteScroll from "react-infinite-scroll-component";

import React from "react";
import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import "./style.css";

const productMainImageAPI = "http://127.0.0.1:8080/api/products/mainimage";

const fetchProductMainImage = async (id) => {
    console.log("id", id)
    const response = await fetch(`${productMainImageAPI}?id=${id}`);
    const data = await response.json();
    const image = JSON.parse(data);
    console.log("image", image);
    return image[0].link;
};

class Democomponent extends React.Component {
    // Constructor
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            DataisLoaded: false,
        };
    }

    // ComponentDidMount is used to
    // execute the code
    componentDidMount() {
        fetch("http://127.0.0.1:8080/api/products/item?id=" + this.props.value)
            .then((res) => res.json())
            .then((json) => {
                console.log("item", JSON.parse(json));
                this.setState({
                    items: JSON.parse(json)[0],
                    DataisLoaded: true,
                });
            })
            .then(() => {
                fetchProductMainImage(this.props.value).then((image) => {
                    this.setState({
                        items: {
                            ...this.state.items,
                            image: image,
                        },
                    });
                });
            });
    }

    render() {
        // const Openprofile = (id) => {
        //     const navigate = useNavigate();
        //     navigate("/single-product", {
        //         state: {
        //             id: "1",
        //         },
        //     });
        // };

        const { DataisLoaded, items } = this.state;
        if (!DataisLoaded)
            return (
                <div>
                    <h1> Pleses wait some time.... </h1>{" "}
                </div>
            );

        return (
            <Link
                className="product-item-a"
                to={"/products/item/" + items.id}
                state={{
                    id: items.id,
                }}
            >
                <img className="image-product" src={items.image} alt="" />
                <div className="info-product">
                    <div className="name-product">{items.name}</div>
                    <div className="price-product">${items.price}</div>
                </div>
            </Link>
        );
    }
}

function ProductScroll() {
    const [state, setState] = useState(Array.from({ length: 3 }));
    const fetchMoreData = () => {
        if (state.length >= 35) {
            this.setState({ hasMore: false });
            return;
        }
        // a fake async api call like which sends
        // 20 more records in 1.5 secs
        setTimeout(() => {
            setState(state.concat(Array.from({ length: 3 })));
        }, 1500);
    };
    return (
        <InfiniteScroll
            className="product-page"
            dataLength={state.length}
            next={fetchMoreData}
            hasMore={true}
            endMessage={
                <p style={{ textAlign: "center" }}>
                    <b>Yay! You have seen it all</b>
                </p>
            }
        >
            {state.map((i, index) => (
                <div className="product-item-all" key={index}>
                    <Democomponent value={index + 1} />
                    {/* Item #{index} */}
                </div>
            ))}
        </InfiniteScroll>
    );
}

export default ProductScroll;
