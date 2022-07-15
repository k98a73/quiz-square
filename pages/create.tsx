import React from "react";

import QuizInputForm from "../components/QuizInputForm";
import { db } from "../lib/firebase";

export default function Create() {
  // 自動採番のドキュメントIDを事前に取得
  const quizID = db.collection("quizzes").doc().id;
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
      buttonSentence={"問題の作成"}
    />
  );
}
