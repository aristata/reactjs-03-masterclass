import { atom } from "recoil";

export interface ToDoData {
  id: number;
  category: "TO_DO" | "DOING" | "DONE";
  text: string;
}

export const toDoState = atom<ToDoData[]>({
  key: "toDo",
  default: []
});
