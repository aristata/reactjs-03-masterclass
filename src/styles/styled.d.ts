import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    backgroundColor: string;
    boardBackgroundColor: string;
    cardBackgroundColor: string;
    textColor: string;
    accentColor: string;
    titleAreaColor: string;
    titleColor: string;
  }
}
