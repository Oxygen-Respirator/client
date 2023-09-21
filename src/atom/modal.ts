import { atom } from "recoil";

export const signUpModalOpenAtom = atom<boolean>({
  key: "signUpModalOpenAtom",
  default: false,
});
