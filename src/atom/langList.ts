import { atom } from "recoil";

export const langListAtom = atom<{ [key: string]: string }[]>({
  key: "langList",
  default: [],
});
