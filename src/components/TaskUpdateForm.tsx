import IconButton from "@mui/material/IconButton";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { boardState } from "../atoms/boardAtom";
import PostAddRounded from "@mui/icons-material/PostAddRounded";

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

interface TaskUpdateFormProps {
  toDoId: number;
  toDoText: string;
  boardId: number;
  changeMode: (isUpdating: boolean) => void;
}

const TaskUpdateForm = ({
  toDoId,
  toDoText,
  boardId,
  changeMode
}: TaskUpdateFormProps) => {
  const setBoards = useSetRecoilState(boardState);
  const { register, handleSubmit } = useForm<ToDoForm>({
    defaultValues: {
      toDo: toDoText
    }
  });

  const updateToDo = (formData: ToDoForm) => {
    const updatedToDo = {
      id: toDoId,
      text: formData.toDo
    };
    changeMode(false);
    setBoards((prev) => {
      const prevBoards = [...prev];
      const boardIndex = prevBoards.findIndex((board) => board.id === boardId);
      const currentBoard = { ...prevBoards[boardIndex] }; // 객체 복제
      const toDoIndex = currentBoard.toDos.findIndex(
        (toDo) => toDo.id === toDoId
      );
      const updatedToDos = [...currentBoard.toDos]; // 배열 복제
      updatedToDos.splice(toDoIndex, 1, updatedToDo);
      const updatedBoard = { ...currentBoard, toDos: updatedToDos };
      prevBoards.splice(boardIndex, 1, updatedBoard);

      return prevBoards;
    });
  };
  return (
    <Form onSubmit={handleSubmit(updateToDo)}>
      <input
        type={"text"}
        autoFocus={true}
        {...register("toDo", { required: true })}
      />
      <IconButton type="submit">
        <PostAddRounded />
      </IconButton>
    </Form>
  );
};

export default TaskUpdateForm;
