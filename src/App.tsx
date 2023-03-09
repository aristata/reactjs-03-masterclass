import { GlobalStyle } from "./styles/global-styles";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { toDoState } from "./atoms/toDo";
import DraggableCard from "./components/DraggableCard";

const Wrapper = styled.div`
  max-width: 480px;
  width: 100%;
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
  grid-template-columns: repeat(1, 1fr);
`;

const Board = styled.div`
  background-color: ${(props) => props.theme.boardBackgroundColor};
  min-height: 200px;
  padding: 20px 10px;
  padding-top: 30px;
  border-radius: 5px;
`;

const App = () => {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const onDragEnd = ({ draggableId, destination, source }: DropResult) => {
    if (!destination) return;
    setToDos((oldToDos) => {
      const toDosCopy = [...oldToDos];
      toDosCopy.splice(source.index, 1);
      toDosCopy.splice(destination.index, 0, draggableId);
      return toDosCopy;
    });
  };
  return (
    <>
      <GlobalStyle />
      <DragDropContext onDragEnd={onDragEnd}>
        <Wrapper>
          <Boards>
            <Droppable droppableId="droppable-one">
              {(pro) => (
                <Board ref={pro.innerRef} {...pro.droppableProps}>
                  {toDos.map((todo, index) => (
                    <DraggableCard key={todo} todo={todo} index={index} />
                  ))}
                  {pro.placeholder}
                </Board>
              )}
            </Droppable>
          </Boards>
        </Wrapper>
      </DragDropContext>
    </>
  );
};

export default App;
