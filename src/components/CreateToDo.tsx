import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { toDoCategoryState, ToDoData, toDoState } from "../atoms/todos";

interface Form {
  toDo: string;
}

const CreateToDo = () => {
  const setToDos = useSetRecoilState(toDoState);
  const category = useRecoilValue(toDoCategoryState);
  const { register, handleSubmit, setValue } = useForm<Form>();
  const handleValid = ({ toDo }: Form) => {
    setToDos((oldToDos) => {
      const newToDo: ToDoData = {
        id: Date.now(),
        category: category,
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
        style={{
          height: "58px",
          width: "400px",
          margin: 0,
          padding: 0,
          paddingLeft: "4px",
          border: "1px solid #40513b",
          borderRight: "none"
        }}
      />
      <button style={{ height: "60px", width: "95px", margin: 0, padding: 0 }}>
        Add
      </button>
    </form>
  );
};

export default CreateToDo;
