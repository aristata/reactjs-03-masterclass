import { ToDoData } from "../atoms/todos";

const ToDo = ({ text }: ToDoData) => {
  return (
    <li>
      <span>{text}</span>
      <button>Doing</button>
      <button>To Do</button>
      <button>Done</button>
    </li>
  );
};

export default ToDo;
