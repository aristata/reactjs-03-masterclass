import { GlobalStyle } from "./styles/global-styles";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const App = () => {
  const onDragEnd = () => {};
  return (
    <>
      <GlobalStyle />
      <DragDropContext onDragEnd={onDragEnd}>
        <div>
          <Droppable droppableId="droppable-one">
            {(pro) => (
              <ul ref={pro.innerRef} {...pro.droppableProps}>
                <Draggable draggableId="draggable-one" index={0}>
                  {(magic) => (
                    <li
                      ref={magic.innerRef}
                      {...magic.draggableProps}
                      {...magic.dragHandleProps}
                    >
                      One
                    </li>
                  )}
                </Draggable>
                <Draggable draggableId="draggable-two" index={1}>
                  {(apple) => (
                    <li ref={apple.innerRef} {...apple.draggableProps}>
                      <span {...apple.dragHandleProps}>⚓</span>Two
                    </li>
                  )}
                </Draggable>
              </ul>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    </>
  );
};

export default App;
