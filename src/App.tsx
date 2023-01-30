import { Outlet } from "react-router-dom";
import { GlobalStyle } from "./styles/global-styles";

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Outlet />
    </>
  );
};

export default App;
