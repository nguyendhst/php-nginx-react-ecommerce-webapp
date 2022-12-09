
import React from "react";

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
                title={urlArray.length > 2 ? fmtCategory : "Products"}
            />

            <ProductsGrid category={category == "" ? null : fmtCategory} />

    
        </React.Fragment>
    );
};

export default ProductPage;
