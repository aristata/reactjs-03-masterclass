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
    font-family: "Dongle", "Source Sans Pro", sans-serif;
    background-color: ${(props) => props.theme.bgColor};
    color: ${(props) => props.theme.textColor};
  }
  a {
    text-decoration: none;
  }
`;
