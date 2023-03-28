import { atom } from "recoil";
import localStorageEffect from "./localStorageEffect";

export interface ToDoInterface {
  id: number;
  text: string;
}

export interface BoardInterface {
  id: number;
  boardName: string;
  toDos: ToDoInterface[];
}

export const boardState = atom<BoardInterface[]>({
  key: "boardState",
  default: [
    {
      id: 1,
      boardName: "My Board",
      toDos: [
        {
          id: 1,
          text: "Learn React"
        }
      ]
    }
  ],
  effects: [localStorageEffect("toDosLocalStorage")]
});
