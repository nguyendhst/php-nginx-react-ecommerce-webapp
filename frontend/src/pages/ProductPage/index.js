// ProductPage is the page that displays the product details

import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Routes, Route } from "react-router-dom";
import CategorizedPage from "./CategorizedPage";

import NotFound from "../404";
import CategoryBanner from "./components/Banner";
import ProductsGrid from "./components/ProductsGrid";

const categories = [
    "charger",
    "tws",
    "cable",
    "powerbank",
    "lifestyle",
    "other",
];

const tempImg =
    "https://product.hstatic.net/200000384841/product/mau_ghi_e3de701ab52c4c9a91682b6e4e7ef44a_grande.jpg";

const mockData = [
    {
        id: 1,
        cat: "charger",
        name: "Charger 1",
        price: 10,
        status: "available",
        image: tempImg,
    },
    {
        id: 2,
        cat: "charger",
        name: "Charger 2",
        price: 20,
        status: "available",
        image: tempImg,
    },
    {
        id: 3,
        cat: "cable",
        name: "Cable 1",
        price: 30,
        status: "outofstock",
        image: tempImg,
    },
    {
        id: 4,
        cat: "powerbank",
        name: "Powerbank 1",
        price: 40,
        status: "available",
        image: tempImg,
    },
    {
        id: 5,
        cat: "lifestyle",
        name: "Lifestyle 1",
        price: 50,
        status: "outofstock",
        image: tempImg,
    },
    {
        id: 6,
        cat: "other",
        name: "Other 1",
        price: 60,
        status: "available",
        image: tempImg,
    },
    {
        id: 7,
        cat: "tws",
        name: "TWS 1",
        price: 70,
        status: "outofstock",
        image: tempImg,
    },
    {
        id: 8,
        cat: "charger",
        name: "Charger 3",
        price: 80,
        status: "available",
        image: tempImg,
    },
    {
        id: 9,
        cat: "charger",
        name: "Charger 4",
        price: 90,
        status: "outofstock",
        image: tempImg,
    },
    {
        id: 10,
        cat: "cable",
        name: "Cable 2",
        price: 100,
        status: "outofstock",
        image: tempImg,
    },
    {
        id: 11,
        cat: "powerbank",
        name: "Powerbank 2",
        price: 110,
        status: "outofstock",
        image: tempImg,
    },
    {
        id: 12,
        cat: "lifestyle",
        name: "Lifestyle 2",
        price: 120,
        status: "available",
        image: tempImg,
    },
    {
        id: 13,
        cat: "other",
        name: "Other 2",
        price: 130,
        status: "outofstock",
        image: tempImg,
    },
    {
        id: 14,
        cat: "tws",
        name: "TWS 2",
        price: 140,
        status: "available",
        image: tempImg,
    },
    {
        id: 15,
        cat: "charger",
        name: "Charger 5",
        price: 150,
        status: "outofstock",
        image: tempImg,
    },
];

const ProductPage = () => {
    // read url path
    const url = window.location.pathname;
    const urlArray = url.split("/");
    console.log(urlArray);
    let category = "";

    if (urlArray.length > 2) {
        category = urlArray[urlArray.length - 1];

        console.log("got category:", category);

        if (!categories.includes(category)) {
            // 404 page
            return <NotFound />;
        }
    }

    let fmtCategory = category.charAt(0).toUpperCase() + category.slice(1);
    return (
        <React.Fragment>
            <CategoryBanner
                title={
                    urlArray.length > 2
                        ? fmtCategory
                        : "Products"
                }
            />

            <ProductsGrid
                category={
                    category == ""
                        ? null
                        : fmtCategory
                }
            />

            {/* <Routes>
        <Route path="single-product" element={<CategorizedPage />} />
        <Route path="cable" element={<CategorizedPage />} />
        <Route path="charge" element={<CategorizedPage />} />
        <Route path="lifestyle" element={<CategorizedPage />} />
        <Route path="other" element={<CategorizedPage />} />
        <Route path="powerbank" element={<CategorizedPage />} />
        <Route path="tws" element={<CategorizedPage />} />
      </Routes> */}
        </React.Fragment>
    );
};

export default ProductPage;
