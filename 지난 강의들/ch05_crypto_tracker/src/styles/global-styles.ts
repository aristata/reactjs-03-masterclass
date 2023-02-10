import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import "./fonts.css";

export const GlobalStyle = createGlobalStyle`
  // reset css
  ${reset}

  // custom global styles
  * {
    box-sizing: border-box;
  }
  body {
    background-color: ${(props) => props.theme.bgColor};
    color: ${(props) => props.theme.textColor};
    font-family: "Dongle", "Source Sans Pro", sans-serif;
    font-weight: 300;
    line-height: 1.2;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
`;
