import React from "react";
import { Route, Routes } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import Home from "./pages/LandingPage";
import Header from "./components/Navbar";
import Footer from "./components/Footer";
import Products from "./pages/ProductPage";
import DashBoard from "./pages/Dashboard";
import NotFound from "./pages/404";
import Users from "./pages/Users";
import Login from "./pages/Users/Login";

function App() {
    return (
        <React.Fragment>
            <Header />
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="products/*" element={<Products />} />
                    <Route path="users" element={<Users />}>
                        <Route path="login" element={<Login />} />
                    </Route>
                    <Route path="admin/*" element={<DashBoard />} />

                    <Route path="*" element={<NotFound />} />
                </Routes>
            </main>
            <Footer></Footer>
        </React.Fragment>
    );
}

export default App;
