import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { ToDoData, toDoState } from "../atoms/todos";

interface Form {
  toDo: string;
}

const CreateToDo = () => {
  const setToDos = useSetRecoilState(toDoState);
  const { register, handleSubmit, setValue } = useForm<Form>();
  const handleValid = ({ toDo }: Form) => {
    setToDos((oldToDos) => {
      const newToDo: ToDoData = {
        id: Date.now(),
        category: "TO_DO",
        text: toDo
      };
      return [newToDo, ...oldToDos];
    });
    setValue("toDo", "");
  };

  return (
    <form onSubmit={handleSubmit(handleValid)}>
      <input
        {...register("toDo", { required: "Please write a To Do" })}
        placeholder={"Write a to do"}
      />
      <button>Add</button>
    </form>
  );
};

export default CreateToDo;
