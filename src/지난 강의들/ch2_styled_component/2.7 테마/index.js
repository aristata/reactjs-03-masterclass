import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "styled-components";
import App from "./App";

// =============================================================================
// 2.7 Theme
// ThemeProvider 로 App 을 감싸면 App 에서 theme props 에 접근 할 수 있다
// =============================================================================
const darkTheme = {
  textColor: "whitesmoke",
  backgroundColor: "#111"
};

const lightTheme = {
  textColor: "#111",
  backgroundColor: "whitesmoke"
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
