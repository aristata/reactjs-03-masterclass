import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
  // reset css
  ${reset}

  // custom global styles
  @font-face {
    font-family: 'Pretendard-Regular';
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
  }

  * {
    font-family: 'Pretendard-Regular';
    font-size: 12pt;
    box-sizing: border-box;    
  }

  body {
    background-color: black;
    color:${(props) => props.theme.white.darker};
    line-height: 1.4
    ;
  }

  a {
    text-decoration:none;
    color:inherit;
  }
`;

export default GlobalStyle;
