import { useRecoilState, useRecoilValue } from "recoil";
import { toDoCategoryState, toDoSelector } from "../atoms/todos";
import CreateToDo from "../components/CreateToDo";
import ToDo from "../components/ToDo";

const ToDoList = () => {
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(toDoCategoryState);
  const onChangeHandler = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value);
  };
  return (
    <div>
      <h1>할 일 목록</h1>
      <hr />
      <select value={category} onChange={onChangeHandler}>
        <option value={"TO_DO"}>해야할 일</option>
        <option value={"DOING"}>하는중인 일</option>
        <option value={"DONE"}>다한 일</option>
      </select>
      <CreateToDo />
      {toDos.length > 0 ? (
        <ul>
          {toDos.map((toDo) => (
            <ToDo key={toDo.id} {...toDo} />
          ))}
        </ul>
      ) : (
        <>
          <p>없습니다</p>
        </>
      )}
    </div>
  );
};

export default ToDoList;
