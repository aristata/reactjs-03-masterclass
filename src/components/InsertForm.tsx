import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "../atoms/toDo";

const Form = styled.form`
  input {
    box-sizing: border-box;
    padding: 0.5em;
  }
  button {
    padding: 0.5em;
    margin-left: 5px;
  }
`;

interface ToDoForm {
  toDo: string;
}

interface InsertFormProps {
  boardId: string;
}

const InsertForm = ({ boardId }: InsertFormProps) => {
  // *********************************************************************************************** recoil
  const setToDos = useSetRecoilState(toDoState);

  // *********************************************************************************************** react hook form
  const { register, setValue, handleSubmit } = useForm<ToDoForm>();
  const onValid = ({ toDo }: ToDoForm) => {
    const newToDos = {
      id: Date.now(),
      text: toDo
    };
    setToDos((allBoards) => {
      return {
        ...allBoards,
        [boardId]: [newToDos, ...allBoards[boardId]]
      };
    });
    setValue("toDo", "");
  };
  return (
    <Form onSubmit={handleSubmit(onValid)}>
      <input
        type={"text"}
        placeholder={`Add task on ${boardId}`}
        {...register("toDo", { required: true })}
      />
      <button type={"submit"}>Add</button>
    </Form>
  );
};

export default InsertForm;
