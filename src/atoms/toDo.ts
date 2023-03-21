import { atom } from "recoil";

export interface ToDoObject {
  id: number;
  text: string;
}

interface ToDoState {
  [key: string]: ToDoObject[];
}

export const toDoState = atom<ToDoState>({
  key: "toDo",
  default: {
    "To Do": [],
    Doing: [],
    Done: []
  }
});
