import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "../atoms/toDo";
import PostAddRoundedIcon from "@mui/icons-material/PostAddRounded";
import { IconButton } from "@mui/material";

const Form = styled.form`
  padding: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  input {
    box-sizing: border-box;
    padding: 10px;
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
    setToDos((prev) => {
      const newBoards = {
        ...prev,
        [boardId]: [newToDos, ...prev[boardId]]
      };

      // 로컬스토리지에 저장
      // localStorage.setItem("ToDoList", JSON.stringify(newBoards));

      // 리코일에 저장
      return newBoards;
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
      <IconButton type="submit">
        <PostAddRoundedIcon />
      </IconButton>
    </Form>
  );
};

export default InsertForm;
