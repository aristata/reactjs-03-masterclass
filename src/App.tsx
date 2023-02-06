import { Outlet, useNavigate } from "react-router-dom";
import { GlobalStyle } from "./styles/global-styles";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useEffect } from "react";

const App = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/coins");
  }, []);
  return (
    <>
      <GlobalStyle />
      <Outlet />
      <ReactQueryDevtools initialIsOpen={true} />
    </>
  );
};

export default App;
