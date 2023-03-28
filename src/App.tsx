import { GlobalStyle } from "./styles/global-styles";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { toDoState } from "./atoms/toDo";
import Board from "./components/Board";

const Wrapper = styled.div`
  max-width: 680px;
  width: 100vw;
  height: 100vh;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  /* border: 1px solid ${(props) => props.theme.textColor}; */
`;

const Boards = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
`;

const App = () => {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const onDragEnd = (info: DropResult) => {
    const { destination, source } = info;
    if (!destination) return;
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
        localStorage.setItem("ToDoList", JSON.stringify(newBoards));

        return newBoards;
      });
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
        localStorage.setItem("ToDoList", JSON.stringify(newBoards));
        return newBoards;
      });
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
      </DragDropContext>
    </>
  );
};

export default App;
