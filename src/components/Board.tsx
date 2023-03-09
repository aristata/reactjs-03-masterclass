import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import Card from "./Card";

const BoardArea = styled.div`
  background-color: ${(props) => props.theme.boardBackgroundColor};
  min-height: 300px;
  width: 250px;
  padding: 20px 10px;
  padding-top: 10px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
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
      ? "#E5D1FA"
      : props.isDraggingFromThis
      ? "#FFE5F1"
      : "#C0DEFF"};
  flex-grow: 1;
  transition: background-color 0.3s ease-in-out;
`;

interface BoardProps {
  toDos: string[];
  boardId: string;
}

const Board = ({ toDos, boardId }: BoardProps) => {
  return (
    <BoardArea>
      <Title>{boardId}</Title>
      <Droppable droppableId={boardId}>
        {(provided, info) => (
          <DropArea
            isDraggingOver={info.isDraggingOver}
            isDraggingFromThis={Boolean(info.draggingFromThisWith)}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {toDos.map((todo, index) => (
              <Card key={todo} todo={todo} index={index} />
            ))}
            {provided.placeholder}
          </DropArea>
        )}
      </Droppable>
    </BoardArea>
  );
};

export default Board;
