import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import GlobalStyles from "../utils/globalStyle";

//pages
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import MyPage from "../pages/MyPage";

// components
import Sidebar from "../components/Sidebar";

const App = () => {
  return (
    <>
      <GlobalStyles />
      {localStorage.getItem("corpCeo") ? (
        <Sidebar>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/mypage" element={<MyPage />} />
          </Routes>
        </Sidebar>
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      )}
    </>
  );
};

export default App;
