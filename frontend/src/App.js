import React from "react";
import { Route, Routes } from "react-router-dom";
// import NavBar from "./components/NavBar/NavBar";
import Home from "./pages/LandingPage/Home";
import Header from "./Header";
import Footer from "./Footer";
// import LandingPage from "./pages/LandingPage/LandingPage";
import PaginatedItems from "./pages/ProductPage/ProductPage";
import SingleProduct from "./pages/ProductPage/SingleProduct";
import Cable from "./pages/ProductPage/Cable"; 
import Charge from "./pages/ProductPage/Charge";
import LifeStyle from "./pages/ProductPage/LifeStyle";
import Other from "./pages/ProductPage/Other";
import PowerBlank from "./pages/ProductPage/PowerBlank";
import TWS from "./pages/ProductPage/TWS";
function App() {
  return (
    
    <React.Fragment>


      <main>

          <Header></Header>
            <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<PaginatedItems />} />
            <Route path="/single-product" element={<SingleProduct />} />
            <Route path="/cable" element={<Cable />} />
            <Route path="/charge" element={<Charge />} />
            <Route path="/LifeStyle" element={<LifeStyle />} />
            <Route path="/Other" element={<Other />} />
            <Route path="/PowerBlank" element={<PowerBlank />} />
            <Route path="/TWS" element={<TWS />} />




            </Routes>
            <Footer></Footer>

      </main>
    </React.Fragment>
  );
}

export default App;
