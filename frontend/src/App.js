import React from "react";
import { Route, Routes } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';


import Home from "./pages/LandingPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Products from "./pages/ProductPage";
import NotFound from "./pages/404";


function App() {
  return (
    <React.Fragment>
      <Header/>
      <main>
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="products/*" element={<Products />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
        
      </main>
      <Footer></Footer>
    </React.Fragment>
  );
}

export default App;
