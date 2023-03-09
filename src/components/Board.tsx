import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DraggableCard from "./DraggableCard";

const BoardArea = styled.div`
  background-color: ${(props) => props.theme.boardBackgroundColor};
  min-height: 300px;
  width: 250px;
  padding: 20px 10px;
  padding-top: 10px;
  border-radius: 5px;
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 700;
  margin-bottom: 10px;
  font-size: 18px;
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
        {(pro) => (
          <div ref={pro.innerRef} {...pro.droppableProps}>
            {toDos.map((todo, index) => (
              <DraggableCard key={todo} todo={todo} index={index} />
            ))}
            {pro.placeholder}
          </div>
        )}
      </Droppable>
    </BoardArea>
  );
};

export default Board;
