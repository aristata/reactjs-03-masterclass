import { GlobalStyle } from "./styles/global-styles";
import ToDoList from "./pages/ToDoList";
import React from "react";
import TimeConvertor from "./pages/TimeConvertor";

const App = () => {
  return (
    <>
      <GlobalStyle />
      <ToDoList />
      <br />
      <TimeConvertor />
    </>
  );
};

export default App;
