import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const GlobalStyle = createGlobalStyle`
  // reset css
  ${reset}

  // custom global styles
  @font-face {
    font-family: 'Pretendard-Regular';
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
  }


  body {
    background: linear-gradient(135deg, rgb(170, 189, 142), rgb(220, 227, 209))
  }

  * {
    font-family: 'Pretendard-Regular';
    font-size: 10pt;
    box-sizing: border-box;    
  }
`;
