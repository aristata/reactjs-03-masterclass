import { createRoot } from "react-dom/client";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";
import App from "./App";
import { theme } from "./styles/themes";
import GlobalStyle from "./styles/global-styles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const container = document.getElementById("root");
const root = createRoot(container!); // exclamation mark (!) is known as the non-null assertion operator in Typescript
root.render(
  <RecoilRoot>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <App />
      </ThemeProvider>
    </QueryClientProvider>
  </RecoilRoot>
);
