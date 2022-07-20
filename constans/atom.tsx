import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const quizItemState = atom<any>({
  key: "quizItem",
  default: {
    id: "",
    uid: "",
    userName: "",
    genre: "",
    content: "",
    optionA: "",
    optionB: "",
    optionC: "",
    optionD: "",
    answer: "",
    description: "",
  },
  effects_UNSTABLE: [persistAtom],
});
