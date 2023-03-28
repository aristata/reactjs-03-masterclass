import { GlobalStyle } from "./styles/global-styles";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult
} from "react-beautiful-dnd";
import styled from "styled-components";
import { useRecoilState, useSetRecoilState } from "recoil";
import Board from "./components/Board";
import Trash from "./components/Trash";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { boardState } from "./atoms/boardAtom";
import { modalState } from "./atoms/modal";
import AddBoardModal from "./components/AddBoardModal";

const Wrapper = styled.div`
  width: 100vw;
  height: 80vh;
  margin: 0 auto;
  padding: 50px;
  /* border: 1px solid ${(props) => props.theme.textColor}; */
`;

const Boards = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  height: 100%;
`;

const App = () => {
  const [boards, setBoards] = useRecoilState(boardState);
  const setModalState = useSetRecoilState(modalState);
  const onDragEnd = ({ destination, source }: DropResult) => {
    if (!destination) return;

    // 보드를 옮길 때
    if (source.droppableId === "boards") {
      // 보드를 같은 곳으로 옮기면 취소
      if (source.index === destination.index) return;

      // 보드 순서 변경
      if (source.index !== destination.index) {
        setBoards((prev) => {
          const allBoards = [...prev];
          const prevBoard = allBoards[source.index];

          allBoards.splice(source.index, 1);
          allBoards.splice(destination.index, 0, prevBoard);

          return allBoards;
        });
      }
    } else if (source.droppableId !== "boards") {
      // 드래그로 삭제하기
      if (destination.droppableId === "trash") {
        setBoards((prev) => {
          const allBoards = [...prev];
          const boardIndex = allBoards.findIndex(
            (board) => board.id.toString() === source.droppableId.split("-")[1]
          );
          const currentBoard = allBoards[boardIndex];
          const currentToDos = [...currentBoard.toDos];

          currentToDos.splice(source.index, 1);
          currentBoard.toDos = currentToDos;
          allBoards.splice(boardIndex, 1, currentBoard);

          return allBoards;
        });
        return;
      }
      // 같은 보드내의 이동
      if (destination.droppableId === source.droppableId) {
        setBoards((prev) => {
          const toDosCopy = [...prev];
          const boardIndex = toDosCopy.findIndex(
            (board) => board.id + "" === source.droppableId.split("-")[1]
          );
          const boardCopy = { ...toDosCopy[boardIndex] };
          const listCopy = [...boardCopy.toDos];
          const prevToDo = boardCopy.toDos[source.index];

          listCopy.splice(source.index, 1);
          listCopy.splice(destination.index, 0, prevToDo);

          boardCopy.toDos = listCopy;
          toDosCopy.splice(boardIndex, 1, boardCopy);

          return toDosCopy;
        });
        return;
      }
      // 다른 보드로의 이동
      if (destination.droppableId !== source.droppableId) {
        setBoards((prev) => {
          const toDosCopy = [...prev];

          const sourceBoardIndex = toDosCopy.findIndex(
            (board) => board.id + "" === source.droppableId.split("-")[1]
          );
          const destinationBoardIndex = toDosCopy.findIndex(
            (board) => board.id + "" === destination.droppableId.split("-")[1]
          );

          const sourceBoardCopy = { ...toDosCopy[sourceBoardIndex] };
          const destinationBoardCopy = { ...toDosCopy[destinationBoardIndex] };

          const sourceListCopy = [...sourceBoardCopy.toDos];
          const destinationListCopy = [...destinationBoardCopy.toDos];

          const prevToDo = sourceBoardCopy.toDos[source.index];

          sourceListCopy.splice(source.index, 1);
          destinationListCopy.splice(destination.index, 0, prevToDo);

          sourceBoardCopy.toDos = sourceListCopy;
          destinationBoardCopy.toDos = destinationListCopy;

          toDosCopy.splice(sourceBoardIndex, 1, sourceBoardCopy);
          toDosCopy.splice(destinationBoardIndex, 1, destinationBoardCopy);

          return toDosCopy;
        });
        return;
      }
    }
  };

  const addBoard = () => {
    setModalState({
      isOpen: true
    });
  };
  return (
    <>
      <GlobalStyle />
      <DragDropContext onDragEnd={onDragEnd}>
        <Wrapper>
          <Droppable droppableId="boards" direction="horizontal">
            {(provided) => (
              <Boards ref={provided.innerRef} {...provided.droppableProps}>
                {boards.map((board, index) => (
                  <Draggable
                    draggableId={"board-dg-" + board.id}
                    key={board.id}
                    index={index}
                  >
                    {(provided) => (
                      <Board board={board} parentProvided={provided} />
                    )}
                  </Draggable>
                ))}
              </Boards>
            )}
          </Droppable>
        </Wrapper>
        <Fab
          color="primary"
          aria-label="add"
          sx={{ position: "fixed", bottom: 16, right: 16 }}
          onClick={addBoard}
        >
          <AddIcon />
        </Fab>
        <Trash />
      </DragDropContext>
      <AddBoardModal />
    </>
  );
};

export default App;
