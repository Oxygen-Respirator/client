import { atom } from "recoil";

export const userInfoAtom = atom({
  key: "userInfo",
  default: {
    maxAnswerCount: 0,
    remainAnswerCount: 0,
    userId: "",
    userNickname: "",
  },
});
