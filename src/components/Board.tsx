import { Droppable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { ToDoObject, toDoState } from "../atoms/toDo";
import Card from "./Card";
import InsertForm from "./InsertForm";

const BoardArea = styled.div`
  background-color: ${(props) => props.theme.boardBackgroundColor};
  min-height: 300px;
  width: 300px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const TitleArea = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: ${(props) => props.theme.titleAreaColor};
  border-radius: 5px;
`;

const Title = styled.h2`
  color: ${(props) => props.theme.titleColor};
  font-size: 18px;
  font-weight: 700;
  padding: 10px;
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

interface BoardProps {
  toDos: ToDoObject[];
  boardId: string;
}

const Board = ({ toDos, boardId }: BoardProps) => {
  return (
    <BoardArea>
      <TitleArea>
        <Title>{boardId}</Title>
        <InsertForm boardId={boardId} />
      </TitleArea>
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
