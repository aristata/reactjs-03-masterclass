import { GlobalStyle } from "./styles/global-styles";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { toDoState } from "./atoms/toDo";
import Board from "./components/Board";
import Trash from "./components/Trash";

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
  const [toDos, setToDos] = useRecoilState(toDoState);
  const onDragEnd = (info: DropResult) => {
    const { destination, source } = info;
    if (!destination) return;
    // 드래그로 삭제하기
    if (destination.droppableId === "trash") {
      setToDos((allBoards) => {
        // 기존 소스 보드 복사하기
        const sourceBoardCopy = [...allBoards[source.droppableId]];

        // 소스 보드에서 1개 삭제하기
        sourceBoardCopy.splice(source.index, 1);

        // 나머지 보드 + 한개 삭제된 소스보드 카피
        const newBoards = {
          ...allBoards,
          [source.droppableId]: sourceBoardCopy
        };

        // 로컬 스토리지 저장
        // localStorage.setItem("ToDoList", JSON.stringify(newBoards));
        return newBoards;
      });
      return;
    }
    if (destination.droppableId === source.droppableId) {
      // 같은 보드내의 이동
      setToDos((allBoards) => {
        // 1. 소스보드의 배열을 복사한다
        const boardCopy = [...allBoards[source.droppableId]];
        const taskObject = boardCopy[source.index];
        // 2. 복사한 배열의 순서를 바꾼다
        boardCopy.splice(source.index, 1);
        boardCopy.splice(destination.index, 0, taskObject);
        // 3. 바꾼 배열과 나머지 보드들을 합쳐서 내보낸다
        const newBoards = {
          ...allBoards, // 나머지 보드들은 그대로 복사한다
          [source.droppableId]: boardCopy // 소스 보드에는 바뀐 배열을 복사한다
        };

        // 4. 로컬스토리지에 저장한다
        // localStorage.setItem("ToDoList", JSON.stringify(newBoards));

        return newBoards;
      });
      return;
    }
    if (destination.droppableId !== source.droppableId) {
      // 다른 보드로의 이동
      setToDos((allBoards) => {
        const sourceBoardCopy = [...allBoards[source.droppableId]];
        const taskObject = sourceBoardCopy[source.index];
        const destinationBoardCopy = [...allBoards[destination.droppableId]];
        sourceBoardCopy.splice(source.index, 1);
        destinationBoardCopy.splice(destination.index, 0, taskObject);
        const newBoards = {
          ...allBoards,
          [source.droppableId]: sourceBoardCopy,
          [destination.droppableId]: destinationBoardCopy
        };
        // localStorage.setItem("ToDoList", JSON.stringify(newBoards));
        return newBoards;
      });
      return;
    }
  };
  return (
    <>
      <GlobalStyle />
      <DragDropContext onDragEnd={onDragEnd}>
        <Wrapper>
          <Boards>
            {Object.keys(toDos).map((boardId) => (
              <Board key={boardId} boardId={boardId} toDos={toDos[boardId]} />
            ))}
          </Boards>
        </Wrapper>
        <Trash />
      </DragDropContext>
    </>
  );
};

export default App;
