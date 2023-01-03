import React from "react";
import { Route, Router, Routes } from "react-router-dom";
import GlobalStyles from "../utils/globalStyle";
//pages
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";

const App = () => {
  return (
    <>
      <GlobalStyles />
      {/* <Nav /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
};

export default App;
