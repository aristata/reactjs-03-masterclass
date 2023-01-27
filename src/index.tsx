import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import Router from "./config/Router";
import { theme } from "./config/themes";

const container = document.getElementById("root");

const root = createRoot(container!); // exclamation mark (!) is known as the non-null assertion operator in Typescript
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <RouterProvider router={Router} />
    </ThemeProvider>
  </React.StrictMode>
);
