import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

interface DraggableCardProps {
  todo: string;
  index: number;
}

const Card = styled.div`
  background-color: ${(props) => props.theme.cardBackgroundColor};
  padding: 10px 10px;
  margin-bottom: 5px;
  border-radius: 5px;
`;

const DraggableCard = ({ todo, index }: DraggableCardProps) => {
  console.log(todo, "has been rendered");
  return (
    <Draggable draggableId={todo} index={index}>
      {(magic) => (
        <Card
          ref={magic.innerRef}
          {...magic.draggableProps}
          {...magic.dragHandleProps}
        >
          {todo}
        </Card>
      )}
    </Draggable>
  );
};

export default React.memo(DraggableCard);
