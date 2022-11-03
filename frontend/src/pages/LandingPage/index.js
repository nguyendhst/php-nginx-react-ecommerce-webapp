import React from "react";
import FeaturedCarousel from "./components/Carousel";
import HomeCategory from "./components/Category";

function Home() {
  return (
    <React.Fragment>
      
      <FeaturedCarousel />

      <HomeCategory />

    </React.Fragment>
  );
}
export default Home;
