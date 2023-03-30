import Stack from "@mui/material/Stack";
import { useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { BoardInterface, boardState } from "../atoms/boardAtom";
import Card from "./Card";
import TaskInputForm from "./TaskInputForm";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { useSetRecoilState } from "recoil";

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
  padding: 10px;
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

const CardDropArea = styled.div<DropAreaProps>`
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
  index: number;
}

const Board = ({ board, index }: BoardProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const setBoards = useSetRecoilState(boardState);

  const onScroll = (event: React.UIEvent<HTMLDivElement>) => {
    if (event.currentTarget.scrollTop > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  const deleteBoard = () => {
    setBoards((prev) => {
      const boardsCopy = [...prev];
      const currentBoardIndex = boardsCopy.findIndex((b) => b.id === board.id);
      boardsCopy.splice(currentBoardIndex, 1);
      return boardsCopy;
    });
  };
  return (
    <Draggable draggableId={"board-" + board.id} key={board.id} index={index}>
      {(provided) => (
        <BoardArea
          onScroll={onScroll}
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <TitleArea isOpaque={isScrolled}>
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Title>{board.boardName}</Title>
              <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
                spacing={1}
              >
                <IconButton onClick={deleteBoard}>
                  <DeleteIcon />
                </IconButton>
                <div {...provided.dragHandleProps}>
                  <DragIndicatorIcon />
                </div>
              </Stack>
            </Stack>
            <TaskInputForm boardName={board.boardName} boardId={board.id} />
          </TitleArea>
          <Droppable droppableId={"board-" + board.id}>
            {(provided, snapshot) => (
              <CardDropArea
                isDraggingOver={snapshot.isDraggingOver}
                isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
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
              </CardDropArea>
            )}
          </Droppable>
        </BoardArea>
      )}
    </Draggable>
  );
};

export default Board;
