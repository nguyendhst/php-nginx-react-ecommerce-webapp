import React from "react";
import { Route, Routes } from "react-router-dom";

import NavBar from "./components/NavBar/NavBar";

import LandingPage from "./pages/LandingPage/LandingPage";
import ProductPage from "./pages/ProductPage/ProductPage";

function App() {
  return (
    <React.Fragment>
      <NavBar />

      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/product" element={<ProductPage />} />
        </Routes>
      </main>
    </React.Fragment>
  );
}

export default App;
