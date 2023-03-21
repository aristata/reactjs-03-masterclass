import { Droppable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { ToDoObject } from "../atoms/toDo";
import Card from "./Card";

const BoardArea = styled.div`
  background-color: ${(props) => props.theme.boardBackgroundColor};
  min-height: 300px;
  width: 250px;
  padding-top: 10px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 700;
  margin-bottom: 10px;
  font-size: 18px;
`;

interface DropAreaProps {
  isDraggingOver: boolean;
  isDraggingFromThis: boolean;
}

const DropArea = styled.div<DropAreaProps>`
  background-color: ${(props) =>
    props.isDraggingOver
      ? "#dfe6e9"
      : props.isDraggingFromThis
      ? "#b2bec3"
      : "transparent"};
  flex-grow: 1;
  transition: background-color 0.3s ease-in-out;
  padding: 20px;
`;

const Form = styled.form`
  width: 100%;
  input {
    width: 100%;
  }
`;

interface ToDoForm {
  toDo: string;
}

interface BoardProps {
  toDos: ToDoObject[];
  boardId: string;
}

const Board = ({ toDos, boardId }: BoardProps) => {
  const { register, setValue, handleSubmit } = useForm<ToDoForm>();
  const onValid = ({ toDo }: ToDoForm) => {
    setValue("toDo", "");
  };
  return (
    <BoardArea>
      <Title>{boardId}</Title>
      <Form onSubmit={handleSubmit(onValid)}>
        <input
          type={"text"}
          placeholder={`Add task on ${boardId}`}
          {...register("toDo", { required: true })}
        />
      </Form>
      <Droppable droppableId={boardId}>
        {(provided, info) => (
          <DropArea
            isDraggingOver={info.isDraggingOver}
            isDraggingFromThis={Boolean(info.draggingFromThisWith)}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {toDos.map((todo, index) => (
              <Card
                key={todo.id}
                index={index}
                toDoId={todo.id}
                toDoText={todo.text}
              />
            ))}
            {provided.placeholder}
          </DropArea>
        )}
      </Droppable>
    </BoardArea>
  );
};

export default Board;
