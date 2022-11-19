import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Alert } from "antd";
import { useDispatch } from "react-redux";

import Login from "./page/Login/Login";
import DashBoard from "./page/DashBoard";
import Products from "./page/DashBoard/Products";
import Users from "./page/DashBoard/Users";

function App() {
  const dispatch = useDispatch();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<DashBoard />}>
          <Route path="products" element={<Products />}></Route>
          <Route path="users" element={<Users />}></Route>
          <Route
            path=""
            element={
              <Alert
                message="Choose setting on menu bar !"
                type="info"
                showIcon
                closable
              />
            }
          ></Route>
        </Route>
        <Route path="login" element={<Login />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
