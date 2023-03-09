import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

interface DraggableCardProps {
  todo: string;
  index: number;
}

interface CardAreaProps {
  isDragging: boolean;
}

const CardArea = styled.div<CardAreaProps>`
  background-color: ${(props) =>
    props.isDragging ? "#e4f2ff" : props.theme.cardBackgroundColor};
  padding: 10px;
  margin-bottom: 5px;
  border-radius: 5px;
  box-shadow: ${(props) =>
    props.isDragging ? "0px 4px 8px rgba(0, 0, 0, 0.05)" : "none"};
`;

const Card = ({ todo, index }: DraggableCardProps) => {
  return (
    <Draggable draggableId={todo} index={index}>
      {(magic, snapshot) => (
        <CardArea
          isDragging={snapshot.isDragging}
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
