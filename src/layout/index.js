import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import GlobalStyles from "../utils/globalStyle";

//pages
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import MyPage from "../pages/MyPage";
import StockList from "../pages/Stock";
import OrderList from "../pages/Order";
import OrderDetail from "../pages/Order/detail";

// components
import Sidebar from "../components/Sidebar";

// cookie
import { Cookies } from "react-cookie";
export const cookies = new Cookies();

const App = () => {
  return (
    <>
      <GlobalStyles />
      {cookies.get("PartnerRefresh") ? (
        <Sidebar>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/stock" element={<StockList />} />
            <Route path="/order" element={<OrderList />} />
            <Route path="/order/item/:id" element={<OrderDetail />} />
          </Routes>
        </Sidebar>
      ) : (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      )}
    </>
  );
};

export default App;
