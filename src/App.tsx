import { Outlet, useNavigate } from "react-router-dom";
import { GlobalStyle } from "./styles/global-styles";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./styles/themes";

const App = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/coins");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [isDark, setIsDark] = useState(false);
  const toggleTheme = () => setIsDark((prev) => !prev);
  return (
    <>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <GlobalStyle />
        <Outlet context={{ isDark, toggleTheme }} />
        <ReactQueryDevtools initialIsOpen={true} />
      </ThemeProvider>
    </>
  );
};

export default App;
