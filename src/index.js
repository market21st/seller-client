import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "../src/layout/index";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { CookiesProvider } from "react-cookie";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Toaster position="top-center" toastOptions={{ duration: 600 }} />
    <CookiesProvider>
      <App />
    </CookiesProvider>
  </BrowserRouter>
);

reportWebVitals();
