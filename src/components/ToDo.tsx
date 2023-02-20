import { useSetRecoilState } from "recoil";
import { ToDoData, toDoState } from "../atoms/todos";

const ToDo = ({ text, category, id }: ToDoData) => {
  const setToDos = useSetRecoilState(toDoState);
  const changeCategory = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name }
    } = event;
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const newToDo = {
        id,
        category: name as "TO_DO" | "DOING" | "DONE",
        text
      };
      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1)
      ];
    });
  };
  return (
    <li>
      <span>{text}</span>
      {category !== "DOING" && (
        <button name="DOING" onClick={changeCategory}>
          Doing
        </button>
      )}
      {category !== "TO_DO" && (
        <button name="TO_DO" onClick={changeCategory}>
          To Do
        </button>
      )}
      {category !== "DONE" && (
        <button name="DONE" onClick={changeCategory}>
          Done
        </button>
      )}
    </li>
  );
};

export default ToDo;
