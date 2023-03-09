import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

interface DraggableCardProps {
  todo: string;
  index: number;
}

const CardArea = styled.div`
  background-color: ${(props) => props.theme.cardBackgroundColor};
  padding: 10px 10px;
  margin-bottom: 5px;
  border-radius: 5px;
`;

const Card = ({ todo, index }: DraggableCardProps) => {
  return (
    <Draggable draggableId={todo} index={index}>
      {(magic) => (
        <CardArea
          ref={magic.innerRef}
          {...magic.draggableProps}
          {...magic.dragHandleProps}
        >
          {todo}
        </CardArea>
      )}
    </Draggable>
  );
};

export default React.memo(Card);
