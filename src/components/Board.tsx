import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DraggableCard from "./DraggableCard";

const BoardArea = styled.div`
  background-color: ${(props) => props.theme.boardBackgroundColor};
  min-height: 200px;
  padding: 20px 10px;
  padding-top: 30px;
  border-radius: 5px;
`;

interface BoardProps {
  toDos: string[];
  boardId: string;
}

const Board = ({ toDos, boardId }: BoardProps) => {
  return (
    <Droppable droppableId={boardId}>
      {(pro) => (
        <BoardArea ref={pro.innerRef} {...pro.droppableProps}>
          {toDos.map((todo, index) => (
            <DraggableCard key={todo} todo={todo} index={index} />
          ))}
          {pro.placeholder}
        </BoardArea>
      )}
    </Droppable>
  );
};

export default Board;
