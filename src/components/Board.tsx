import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { ToDoObject } from "../atoms/toDo";
import Card from "./Card";
import InsertForm from "./InsertForm";

const BoardArea = styled.div`
  background-color: ${(props) => props.theme.boardBackgroundColor};
  min-height: 300px;
  max-height: 100%;
  width: 300px;
  overflow: auto;
`;

const TitleArea = styled.div`
  background-color: ${(props) => props.theme.titleAreaColor};
  border-radius: 0 0 25px 0;
  position: sticky;
  top: 0;
  transition: background-color 0.3s, color 0.3s, box-shadow 0.3s, opacity 0.3s;
`;

const Title = styled.h2`
  color: ${(props) => props.theme.titleColor};
  font-size: 18px;
  font-weight: 700;
  padding: 10px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
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

const ToDos = styled.ul`
	display: flex;
	flex-direction: column;
	padding: 4.5rem 0.4rem 4rem 1rem;
	width: 100%;
	max-height: calc(100vh - 11rem);
	overflow-x: hidden;
	overflow-y: scroll;

	&::-webkit-scrollbar {
		width: 0.6rem;
	}

	&::-webkit-scrollbar-thumb {
		background-color: ${(props) => props.theme.scrollBarColor};
		border-radius: 0.3rem;
		background-clip: padding-box;
		border: 0.2rem solid transparent;
		transition: background-color 0.3s;
	}
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
