import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

interface DraggableCardProps {
  index: number;
  toDoId: number;
  toDoText: string;
}

interface TaskProps {
  isDragging: boolean;
}

const Task = styled.div<TaskProps>`
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
    <Draggable draggableId={"task-" + toDoId} index={index}>
      {(provided, snapshot) => (
        <Task
          id={"task-" + toDoId}
          isDragging={snapshot.isDragging}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {toDoText}
        </Task>
      )}
    </Draggable>
  );
};

export default React.memo(Card);
