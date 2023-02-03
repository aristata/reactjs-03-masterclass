import { Outlet } from "react-router-dom";
import { GlobalStyle } from "./styles/global-styles";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Outlet />
      <ReactQueryDevtools initialIsOpen={true} />
    </>
  );
};

export default App;
