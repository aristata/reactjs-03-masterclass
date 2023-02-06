import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import Router from "./routers/Router";

const queryClient = new QueryClient();

const container = document.getElementById("root");

const root = createRoot(container!); // exclamation mark (!) is known as the non-null assertion operator in Typescript
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={Router} />
    </QueryClientProvider>
  </React.StrictMode>
);
