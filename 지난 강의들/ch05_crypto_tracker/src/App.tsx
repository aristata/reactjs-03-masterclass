import { Outlet, useNavigate } from "react-router-dom";
import { GlobalStyle } from "./styles/global-styles";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./styles/themes";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "./atoms/DarkModeAtom";

const App = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/coins");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* recoil 을 사용하게 되면
   * 아래와 같이 props 또는 outlet context로
   * 데이터나 함수를 전달할 필요가 없다
   */
  // const [isDark, setIsDark] = useState(false);
  // const toggleTheme = () => setIsDark((prev) => !prev);

  /* 대신 recoil 의 useRecoilValue 훅을 사용하여 손쉽게 상태를 전달할 수 있다 */
  const isDark = useRecoilValue(isDarkAtom);
  return (
    <>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <GlobalStyle />
        {/* 
          아래와 같이 context 로 전달할 필요가 없어졌다 
          <Outlet context={{ isDark, toggleTheme }} />
        */}
        <Outlet />
        <ReactQueryDevtools initialIsOpen={true} />
      </ThemeProvider>
    </>
  );
};

export default App;
