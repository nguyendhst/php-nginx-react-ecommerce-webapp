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
