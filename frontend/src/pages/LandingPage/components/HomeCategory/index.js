import React, { Component } from "react";
import { Link, Routes, Route } from "react-router-dom";
import render from "react-dom";
import "./index.css";

import homeCategory01 from "../../img/home_category_image_1.webp";
import homeCategory02 from "../../img/home_category_image_2.webp";
import homeCategory03 from "../../img/home_category_image_3.webp";
import homeCategory04 from "../../img/home_category_image_4.webp";
import homeCategory05 from "../../img/home_category_image_5.webp";
import homeCategory06 from "../../img/home_category_image_6.webp";

const images = [
  homeCategory01,
  homeCategory02,
  homeCategory03,
  homeCategory04,
  homeCategory05,
  homeCategory06,
];

const categories = [
  "Charger",
  "TWS",
  "Cable",
  "Power Bank",
  "Lifestyle",
  "More",
];

function urlCleaner(url) {
  return "/products/" + url.replace(/[^a-zA-Z0-9]/g, "-").toLowerCase();
}

class HomeCategory extends Component {
  // set props
  constructor(props) {
    super(props);
    this.state = {
      images: images,
      categories: categories,
    };
  }

  render() {
    const categoryItems = this.state.categories.map((category, index) => (
      <HomeCategoryItem
        key={index}
        image={this.state.images[index]}
        category={category}
        url={urlCleaner(category)}
      />
    ));
    return (
      <div className="home-category">
        <div className="container home-category-wrapper">
          <div className="row row-cols-6 flex-nowrap">{categoryItems}</div>
        </div>
      </div>
    );
  }
}

class HomeCategoryItem extends Component {
  render() {
    return (
      <div className="col">
        <div className="category-item">
          <Link to={this.props.url}>
            <img src={this.props.image} alt="" width="80px"/>
            <p>{this.props.category}</p>
          </Link>
        </div>
      </div>
    );
  }
}

export default HomeCategory;
