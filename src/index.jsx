import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./layout/index";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material";
import { green, red } from "@mui/material/colors";

export const theme = createTheme({
  palette: {
    primary: { main: "#0082FF" },
    error: { main: red[100] },
    success: { main: green[100] },
    excel: { main: "#2A8B53", contrastText: "#fff" },
  },
  components: {
    MuiTableCell: {
      styleOverrides: {
        root: { padding: "10px", fontFamily: "inherit" },
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
