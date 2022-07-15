import React from "react";

import QuizInputForm from "../components/QuizInputForm";

export default function Create() {
  return (
    <QuizInputForm
      genreDefaultValue={"国語"}
      contentDefaultValue=""
      optionADefaultValue=""
      optionBDefaultValue=""
      optionCDefaultValue=""
      optionDDefaultValue=""
      answerDefaultValue={"1"}
      descriptionDefaultValue=""
    />
  );
}
