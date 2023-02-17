import { GlobalStyle } from "./styles/global-styles";
import ToDoList from "./pages/ToDoList";
import React from "react";

const App = () => {
  return (
    <>
      <GlobalStyle />
      <ToDoList />
    </>
  );
};

export default App;
