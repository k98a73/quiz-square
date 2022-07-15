import React from "react";
import { useRecoilValue } from "recoil";

import QuizInputForm from "../../components/QuizInputForm";
import { quizItemState } from "../../constans/atom";

export default function QuizEdit() {
  const quizItem = useRecoilValue(quizItemState);

  return (
    <>
      <QuizInputForm
        quizID={quizItem.id}
        genreDefaultValue={quizItem.genre}
        contentDefaultValue={quizItem.content}
        optionADefaultValue={quizItem.optionA}
        optionBDefaultValue={quizItem.optionB}
        optionCDefaultValue={quizItem.optionC}
        optionDDefaultValue={quizItem.optionD}
        answerDefaultValue={quizItem.answer}
        descriptionDefaultValue={quizItem.description}
        buttonSentence={"問題の更新"}
      />
      ;
    </>
  );
}
