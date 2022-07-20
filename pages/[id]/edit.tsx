import { Center, Spinner } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useRecoilValue } from "recoil";

import QuizInputForm from "../../components/QuizInputForm";
import { quizItemState } from "../../constans/atom";
import useIsMounted from "../../hooks/useIsMounted";
import { auth } from "../../lib/firebase";

export default function QuizEdit() {
  const quizItem = useRecoilValue(quizItemState);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  // マウントを監視するカスタムフック
  const isMountedRef = useIsMounted();

  auth.onAuthStateChanged((user) => {
    if (isMountedRef.current && user?.uid !== quizItem.uid) {
      router.push("/quizzesIndex");
    } else {
      setLoading(false);
    }
  });

  return (
    <>
      {loading ? (
        <Center mt="30%">
          <Spinner size="xl" />
        </Center>
      ) : (
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
      )}
    </>
  );
}
