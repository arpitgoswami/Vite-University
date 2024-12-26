import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

// Material UI Theme
import { ThemeProvider, CssBaseline, createTheme } from "@mui/material";

// Styles
import "./styles/App.css";
import "./styles/Sidebar.css";
import "./styles/Font.css";

// Create a default theme
const theme = createTheme();

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Resets default browser styles */}
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
