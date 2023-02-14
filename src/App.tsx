import { GlobalStyle } from "./styles/global-styles";
import ToDoList from "./components/ToDoList";

const App = () => {
  return (
    <>
      <GlobalStyle />
      <ToDoList />
    </>
  );
};

export default App;
