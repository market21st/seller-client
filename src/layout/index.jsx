import React from "react";
import { Route, Routes } from "react-router-dom";
import GlobalStyles from "../utils/globalStyle";
// components
import Sidebar from "../components/common/Sidebar";
// cookie
import { Cookies } from "react-cookie";
//pages
import Home from "../pages/home/index";
import MyPage from "../pages/my/index";
import StockList from "../pages/stock/index";
import OrderList from "../pages/order/index";
import ProductList from "../pages/product/index";
import LogIn from "../pages/login/index";
import Register from "../pages/register/index";
import OrderDetail from "../pages/order/detail";

import Products from "../pages/products/index";


export const cookies = new Cookies();

const App = () => {
  return (
    <>
      <GlobalStyles />
      {localStorage.getItem("isLogin") ? (
        <Sidebar>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/stock" element={<StockList />} />
            <Route path="/order" element={<OrderList />} />
            <Route path="/product" element={<ProductList />} />
            <Route path="/order/item/:id" element={<OrderDetail />} />
            <Route path="/products" element={<Products />} />
          </Routes>
        </Sidebar>
      ) : (
        <Routes>
          <Route path="/" element={<LogIn />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      )}
    </>
  );
};

export default App;
