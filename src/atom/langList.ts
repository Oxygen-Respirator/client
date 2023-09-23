import { atom } from "recoil";

export const langListAtom = atom<{ id: number; name: string }[]>({
  key: "langList",
  default: [],
});
