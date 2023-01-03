import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import GlobalStyles from "../utils/globalStyle";

//pages
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";

// components
import Sidebar from "../components/Sidebar";

// cookie
import { Cookies } from "react-cookie";
export const cookies = new Cookies();

const App = () => {
  useEffect(() => {}, [cookies.get("Authentication")]);
  return (
    <>
      <GlobalStyles />
      {cookies.get("Authentication") ? (
        <Sidebar>
          <Routes>
            <Route path="/" element={<Home />} />
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
