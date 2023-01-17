import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

const container = document.getElementById("root");

const root = createRoot(container!); // exclamation mark (!) is known as the non-null assertion operator in Typescript
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
