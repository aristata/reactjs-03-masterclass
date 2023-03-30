import { Droppable } from "react-beautiful-dnd";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { boardState } from "../atoms/boardAtom";
import Board from "./Board";

const Wrapper = styled.div`
  width: 100vw;
  height: 80vh;
  margin: 0 auto;
  padding: 50px;
  /* border: 1px solid ${(props) => props.theme.textColor}; */
`;

interface DropAreaProps {
  isDraggingOver: boolean;
  isDraggingFromThis: boolean;
}

const BoardDropArea = styled.div<DropAreaProps>`
  display: flex;
  flex-direction: row;
  gap: 20px;
  height: 100%;
`;

const BoardFrame = () => {
  const boards = useRecoilValue(boardState);

  return (
    <Wrapper>
      <Droppable droppableId="boards" direction="horizontal" type="BOARDS">
        {(provided, snapshot) => (
          <BoardDropArea
            isDraggingOver={snapshot.isDraggingOver}
            isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {boards.map((board, index) => (
              <Board key={board.id} index={index} board={board} />
            ))}
            {provided.placeholder}
          </BoardDropArea>
        )}
      </Droppable>
    </Wrapper>
  );
};

export default BoardFrame;
