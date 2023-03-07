import { atom, selector } from "recoil";

export const minuteState = atom({
  key: "minuteState",
  default: 0
});

export const hourSelector = selector<number>({
  key: "hourSelector",
  get: ({ get }) => {
    const minute = get(minuteState);
    return minute / 60;
  },
  set: ({ set }, newValue) => {
    const minute = Number(newValue) * 60;
    set(minuteState, minute);
  }
});
