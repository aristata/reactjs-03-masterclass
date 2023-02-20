import { useSetRecoilState } from "recoil";
import { ToDoData, toDoState } from "../atoms/todos";

const ToDo = ({ text, category, id }: ToDoData) => {
  const setToDo = useSetRecoilState(toDoState);
  const changeCategory = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name }
    } = event;
    console.log(`${name} 버튼 클릭됨`);
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
