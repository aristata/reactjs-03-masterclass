import React from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "styled-components";
import { theme } from "./styles/themes";
import App from "./App";

const container = document.getElementById("root");
const root = createRoot(container!); // exclamation mark (!) is known as the non-null assertion operator in Typescript
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
