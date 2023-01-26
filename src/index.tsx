import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { lightTheme } from "./theme";
import Router from "./Router";

/*
 * React Router Dom v5 를 사용할땐 App 안에 Router 컴포넌트를 선언하였지만,
 * React Router Dom v6 을 사용할땐 RouterProvider 를 사용하여 Router 를 제공한다
 */

const container = document.getElementById("root");

const root = createRoot(container!); // exclamation mark (!) is known as the non-null assertion operator in Typescript
root.render(
  <React.StrictMode>
    <ThemeProvider theme={lightTheme}>
      <RouterProvider router={Router} />
    </ThemeProvider>
  </React.StrictMode>
);
