import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import EditRounded from "@mui/icons-material/EditRounded";
import TaskUpdateForm from "./TaskUpdateForm";

interface DraggableCardProps {
  index: number;
  toDoId: number;
  toDoText: string;
  boardId: number;
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

const Card = ({ toDoId, toDoText, index, boardId }: DraggableCardProps) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const changeMode = (isUpdating: boolean) => {
    setIsUpdating(isUpdating);
  };

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
          {isUpdating ? (
            <TaskUpdateForm
              toDoId={toDoId}
              toDoText={toDoText}
              boardId={boardId}
              changeMode={changeMode}
            />
          ) : (
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <span>{toDoText}</span>
              <IconButton onClick={() => changeMode(true)}>
                <EditRounded />
              </IconButton>
            </Stack>
          )}
        </Task>
      )}
    </Draggable>
  );
};

export default React.memo(Card);
