import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { toDoCategoryState, ToDoData, toDoState } from "../atoms/todos";

const FormArea = styled.form`
  display: flex;
  flex-direction: row;
  align-items: center;
  input {
    height: 58px;
    width: 100%;
    margin: 0;
    padding: 0;
    padding-left: 4px;
    border: none;
    ::placeholder {
      padding-left: 16px;
    }
  }
  button {
    height: 60px;
    width: 100px;
    margin: 0;
    padding: 0;
    border: none;
    border-left: 1px solid #40513b;
    border-bottom: 1px solid #40513b;
  }
`;

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
      // 로컬스토리지에 저장
      localStorage.setItem("ToDoList", JSON.stringify([newToDo, ...oldToDos]));

      return [newToDo, ...oldToDos];
    });
    setValue("toDo", "");
  };

  return (
    <FormArea onSubmit={handleSubmit(handleValid)}>
      <input
        {...register("toDo", { required: "Please write a To Do" })}
        placeholder={"새로 입력하기"}
      />
      <button>추가</button>
    </FormArea>
  );
};

export default CreateToDo;
