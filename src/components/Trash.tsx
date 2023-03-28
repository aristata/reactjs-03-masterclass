import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";

interface DropAreaProps {
  isDragging: boolean;
}

const Wrapper = styled.div`
  position: fixed;
  bottom: 0rem;
  left: calc(50vw - 15rem);
  width: 30rem;
  height: 5rem;
  border-radius: 100rem 100rem 0 0;
  transition: transform 0.3s;
`;

const TrashArea = styled.div<DropAreaProps>`
  width: 30rem;
  height: 5rem;
  border-radius: 100rem 100rem 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fd8f7c;
  opacity: ${(props) => (props.isDragging ? 1 : 0.3)};
`;

const Trash = () => {
  return (
    <Wrapper>
      <Droppable droppableId="trash">
        {(provided, sanpshot) => (
          <div>
            <TrashArea
              isDragging={Boolean(sanpshot.isDraggingOver)}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <DeleteForeverRoundedIcon
                sx={{ width: "50px", height: "50px" }}
              />
            </TrashArea>
          </div>
        )}
      </Droppable>
    </Wrapper>
  );
};

export default Trash;
