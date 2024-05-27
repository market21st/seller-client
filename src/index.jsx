import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./layout/index";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: { main: "#0082FF" },
    secondary: { main: "#A65895" },
  },
  components: {
    MuiTableCell: {
      styleOverrides: {
        root: { padding: "10px", fontFamily: "'Spoqa Han Sans','Sans-serif'" },
      },
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <Toaster position="top-center" toastOptions={{ duration: 600 }} />
      <App />
    </ThemeProvider>
  </BrowserRouter>
);
