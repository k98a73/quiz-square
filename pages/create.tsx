import React from "react";
import { collection, doc } from "firebase/firestore";

import QuizInputForm from "../components/QuizInputForm";
import { db } from "../lib/firebase";

export default function Create() {
  // 自動採番のドキュメントIDを事前に取得
  const quizID = doc(collection(db, "quizzes")).id;
  return (
    <QuizInputForm
      quizID={quizID}
      genreDefaultValue={"国語"}
      contentDefaultValue=""
      optionADefaultValue=""
      optionBDefaultValue=""
      optionCDefaultValue=""
      optionDDefaultValue=""
      answerDefaultValue={"1"}
      descriptionDefaultValue=""
      likes={[]}
      buttonSentence={"問題の作成"}
    />
  );
}
