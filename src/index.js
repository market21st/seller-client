import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "../src/layout/index";
import reportWebVitals from "./reportWebVitals";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Toaster position="top-center" toastOptions={{ duration: 600 }} />
    <App />
  </BrowserRouter>
);

reportWebVitals();
