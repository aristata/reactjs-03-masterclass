import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import PostAddRoundedIcon from "@mui/icons-material/PostAddRounded";
import { IconButton } from "@mui/material";
import { boardState } from "../atoms/boardAtom";

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
  boardName: string;
  boardId: number;
}

const TaskInputForm = ({ boardName, boardId }: InsertFormProps) => {
  // *********************************************************************************************** recoil
  const setBoards = useSetRecoilState(boardState);

  // *********************************************************************************************** react hook form
  const { register, setValue, handleSubmit } = useForm<ToDoForm>();
  const onValid = ({ toDo }: ToDoForm) => {
    const newToDos = {
      id: Date.now(),
      text: toDo
    };
    setBoards((prev) => {
      const prevBoards = [...prev];
      // console.log("prevBoards1", prevBoards);

      const boardIndex = prevBoards.findIndex((board) => board.id === boardId);
      // console.log("boardIndex", boardIndex);

      const currentBoard = { ...prevBoards[boardIndex] }; // 객체 복제
      // console.log("currentBoard1", currentBoard);

      currentBoard.toDos = [newToDos, ...currentBoard.toDos];
      // console.log("currentBoard2", currentBoard);

      prevBoards.splice(boardIndex, 1, currentBoard);
      // console.log("prevBoards2", prevBoards);

      return prevBoards;
    });

    setValue("toDo", "");
  };
  return (
    <Form onSubmit={handleSubmit(onValid)}>
      <input
        type={"text"}
        placeholder={`Add task on ${boardName}`}
        {...register("toDo", { required: true })}
      />
      <IconButton type="submit">
        <PostAddRoundedIcon />
      </IconButton>
    </Form>
  );
};

export default TaskInputForm;
