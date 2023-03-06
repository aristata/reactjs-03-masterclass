import { atom, selector } from "recoil";

export interface ToDoData {
  id: number;
  category: "TO_DO" | "DOING" | "DONE";
  text: string;
}

export const toDoState = atom<ToDoData[]>({
  key: "toDo",
  default: []
});

export const toDoCategoryState = atom({
  key: "toDoCategory",
  default: "TO_DO"
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(toDoCategoryState);
    return toDos.filter((toDo) => toDo.category === category);
  }
});
