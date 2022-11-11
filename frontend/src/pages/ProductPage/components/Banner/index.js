import React from "react";
import "./index.css";

const imgLink =
  "https://theme.hstatic.net/200000384841/1000740278/14/collection_banner.jpg?v=1109";

function CategoryBanner(props) {
  return (
    <React.Fragment>
      <div className="category-banner">
        <img src={imgLink} alt="category banner" />
        <div className="cat-title">
          <h2>{props.title}</h2>
        </div>
      </div>
    </React.Fragment>
  );
}

export default CategoryBanner;
