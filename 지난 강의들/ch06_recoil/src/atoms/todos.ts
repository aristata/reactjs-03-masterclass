import { atom, selector } from "recoil";

export enum Categories {
  "TO_DO" = "TO_DO",
  "DOING" = "DOING",
  "DONE" = "DONE"
}

export interface ToDoData {
  id: number;
  category: Categories;
  text: string;
}

export const toDoState = atom<ToDoData[]>({
  key: "toDo",
  default: []
});

export const toDoCategoryState = atom<Categories>({
  key: "toDoCategory",
  default: Categories.TO_DO
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(toDoCategoryState);
    return toDos.filter((toDo) => toDo.category === category);
  }
});
