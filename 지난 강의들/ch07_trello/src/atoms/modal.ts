import { atom } from "recoil";

interface ModalData {
  isOpen: boolean;
}

export const modalState = atom<ModalData>({
  key: "modalState",
  default: {
    isOpen: false
  }
});
