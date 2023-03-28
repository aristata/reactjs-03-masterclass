import { useState } from "react";
import { DraggableProvided, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { BoardInterface } from "../atoms/boardAtom";
import Card from "./Card";
import InsertForm from "./InsertForm";

const BoardArea = styled.div`
  background-color: ${(props) => props.theme.boardBackgroundColor};
  min-height: 300px;
  max-height: 100%;
  width: 300px;
  overflow: auto;
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

const TitleArea = styled.div<{ isOpaque: boolean }>`
  background-color: ${(props) => props.theme.titleAreaColor};
  border-radius: 0 0 25px 0;
  position: sticky;
  top: 0;
  transition: background-color 0.3s, color 0.3s, box-shadow 0.3s, opacity 0.3s;
  opacity: ${(props) => (props.isOpaque ? "0.75" : "1")};
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

interface BoardProps {
  board: BoardInterface;
  parentProvided: DraggableProvided;
}

const Board = ({ board, parentProvided }: BoardProps) => {
  const [isScrolled, setIsScrolled] = useState(false);

  const onScroll = (event: React.UIEvent<HTMLDivElement>) => {
    if (event.currentTarget.scrollTop > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };
  return (
    <BoardArea onScroll={onScroll}>
      <TitleArea isOpaque={isScrolled}>
        <Title>{board.boardName}</Title>
        <InsertForm boardId={board.id.toString()} />
      </TitleArea>
      <Droppable droppableId={"board-" + board.id}>
        {(provided, info) => (
          <DropArea
            isDraggingOver={info.isDraggingOver}
            isDraggingFromThis={Boolean(info.draggingFromThisWith)}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {board.toDos.map((todo, index) => (
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
