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
    likes: [],
    answerList: [],
  },
  effects_UNSTABLE: [persistAtom],
});
