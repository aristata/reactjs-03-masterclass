import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";

interface DropAreaProps {
  isDragging: boolean;
}

const Wrapper = styled.div`
  position: fixed;
  bottom: 0rem;
  left: calc(50vw - 7.5rem);
  width: 15rem;
  height: 3rem;
  border-radius: 100rem 100rem 0 0;
  transition: transform 0.3s;
`;

const TrashArea = styled.div<DropAreaProps>`
  width: 15rem;
  height: 5rem;
  border-radius: 100rem 100rem 0 0;
  display: flex;
  justify-content: center;
  background-color: #fd8f7c;
  opacity: ${(props) => (props.isDragging ? 1 : 0.3)};
`;

const Trash = () => {
  return (
    <Wrapper>
      <Droppable droppableId="trash" type="BOARD">
        {(provided, sanpshot) => (
          <div>
            <TrashArea
              isDragging={Boolean(sanpshot.isDraggingOver)}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {Boolean(sanpshot.isDraggingOver) ? (
                <>{provided.placeholder}</>
              ) : (
                <DeleteForeverRoundedIcon
                  sx={{ width: "30px", height: "30px", marginTop: "10px" }}
                />
              )}
            </TrashArea>
          </div>
        )}
      </Droppable>
    </Wrapper>
  );
};

export default Trash;
