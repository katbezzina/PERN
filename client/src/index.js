import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ThemeProvider, createTheme } from "@mui/material";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));

const theme = createTheme({
  palette: {
    primary: {
      main: "rgba(52, 4, 87, 0.874)",
      light: "rgba(141, 141, 211, 0.493)",
      dark: "rgba(52, 4, 87, 0.874)",
    },
    secondary: {
      main: "rgba(29, 28, 28, 0.842)",
      light: "rgba(239, 235, 235, 0.784)",
      dark: "rgba(29, 28, 28, 0.842)",
    },
  },
});

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
