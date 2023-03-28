import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

interface DraggableCardProps {
  index: number;
  toDoId: number;
  toDoText: string;
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

const Card = ({ toDoId, toDoText, index }: DraggableCardProps) => {
  return (
    <Draggable draggableId={toDoId.toString()} index={index}>
      {(magic, snapshot) => (
        <CardArea
          id={toDoId.toString()}
          isDragging={snapshot.isDragging}
          ref={magic.innerRef}
          {...magic.draggableProps}
          {...magic.dragHandleProps}
        >
          {toDoText}
        </CardArea>
      )}
    </Draggable>
  );
};

export default React.memo(Card);
