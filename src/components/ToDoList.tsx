import { useForm } from "react-hook-form";
import { atom, useRecoilState } from "recoil";

interface ToDo {
  id: number;
  category: "TO_DO" | "DOING" | "DONE";
  text: string;
}

const toDoState = atom<ToDo[]>({
  key: "toDo",
  default: []
});

interface Form {
  toDo: string;
}

const ToDoList = () => {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const { register, handleSubmit, setValue } = useForm<Form>();
  const handleValid = ({ toDo }: Form) => {
    setToDos((oldToDos) => {
      const newToDo: ToDo = {
        id: Date.now(),
        category: "TO_DO",
        text: toDo
      };
      return [newToDo, ...oldToDos];
    });
    setValue("toDo", "");
  };
  return (
    <div>
      <form onSubmit={handleSubmit(handleValid)}>
        <input
          {...register("toDo", { required: "Please write a To Do" })}
          placeholder={"Write a to do"}
        />
        <button>Add</button>
      </form>
      <ul>
        {toDos.map((toDo) => (
          <li key={toDo.id}>{toDo.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default ToDoList;
