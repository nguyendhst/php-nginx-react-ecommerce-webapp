import React from "react";
import { Route, Routes } from "react-router-dom";
// import NavBar from "./components/NavBar/NavBar";
import Home from "./pages/LandingPage/Home";
import Header from "./Header";
import Footer from "./Footer";
// import LandingPage from "./pages/LandingPage/LandingPage";
import PaginatedItems from "./pages/ProductPage/ProductPage";
import SingleProduct from "./pages/ProductPage/SingleProduct";
function App() {
  return (
    
    <React.Fragment>


      <main>

          <Header></Header>
            <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<PaginatedItems />} />
            <Route path="/single-product" element={<SingleProduct />} />


            </Routes>
            <Footer></Footer>

      </main>
    </React.Fragment>
  );
}

export default App;
