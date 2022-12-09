import React from "react";
import FeaturedCarousel from "./components/Carousel";
import HomeCategory from "./components/HomeCategory";
import ProductScroll from "./components/Products";

function Home() {
  return (
    <React.Fragment>
      
      <FeaturedCarousel />

      <HomeCategory />

      <ProductScroll />

    </React.Fragment>
  );
}
export default Home;
