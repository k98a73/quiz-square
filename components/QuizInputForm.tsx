import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import {
  Container,
  FormErrorMessage,
  FormLabel,
  FormControl,
  Select,
  Textarea,
  VStack,
  Text,
  Stack,
  Input,
  Center,
  RadioGroup,
  Radio,
  ChakraProvider,
  FormHelperText,
  Box,
  Button,
  Spinner,
  HStack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";

import Header from "./Header";
import { auth, date, db } from "../lib/firebase";
import { inputTheme } from "../constants/inputTheme";
import useIsMounted from "../hooks/useIsMounted";
import filterOptions from "../constants/filterOptions";
import { quizItemState } from "../constants/atom";

interface PROPS {
  quizID: string;
  genreDefaultValue: string;
  contentDefaultValue: string;
  optionADefaultValue: string;
  optionBDefaultValue: string;
  optionCDefaultValue: string;
  optionDDefaultValue: string;
  answerDefaultValue: string;
  descriptionDefaultValue: string;
  buttonSentence: string;
}

const QuizInputForm: React.FC<PROPS> = ({
  quizID,
  genreDefaultValue,
  contentDefaultValue,
  optionADefaultValue,
  optionBDefaultValue,
  optionCDefaultValue,
  optionDDefaultValue,
  answerDefaultValue,
  descriptionDefaultValue,
  buttonSentence,
}) => {
  const router = useRouter();
  const [user, setUser] = useState<any>("");
  const [userName, setUserName] = useState<string>("");
  // マウントを監視するカスタムフック
  const isMountedRef = useIsMounted();
  const [quizItem, setQuizItem] = useRecoilState(quizItemState);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = ({
    genre,
    content,
    optionA,
    optionB,
    optionC,
    optionD,
    answer,
    description,
  }: any) => {
    setQuizItem({
      id: quizID,
      uid: user?.uid,
      userName,
      genre,
      content,
      optionA,
      optionB,
      optionC,
      optionD,
      answer,
      description,
    });
    db.collection("quizzes").doc(quizID).set({
      id: quizID,
      uid: user?.uid,
      userName,
      genre,
      content,
      optionA,
      optionB,
      optionC,
      optionD,
      answer,
      description,
      createdAt: date.FieldValue.serverTimestamp(),
    });
    router.push("/quizzesIndex");
  };

  useEffect(() => {
    const unSub = auth.onAuthStateChanged((user) => {
      setUser(user);
      !user && router.push("/signin");
    });
    return () => unSub();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const docRef = db.collection("users").doc(user?.uid);
  if (user) {
    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          // マウント時のみユーザーネームを更新
          if (isMountedRef.current) setUserName(doc.data()?.userName);
        } else {
          alert("No such document!");
        }
      })
      .catch((error) => {
        alert(error);
      });
  }

  return (
    <>
      {user ? (
        <ChakraProvider theme={inputTheme}>
          <Head>
            <title>Quiz Square</title>
          </Head>
          <Header />
          <Container py="3" maxW="800px">
            <VStack>
              <form style={{ width: "95%" }} onSubmit={handleSubmit(onSubmit)}>
                <Stack direction="row" align="center">
                  <Text fontSize="lg" color="gray.600">
                    ジャンル
                    <span style={{ color: "red", padding: "0 3px" }}>*</span>:
                  </Text>
                  <Select
                    size="md"
                    w="100px"
                    color="gray.500"
                    fontWeight="bold"
                    textAlign="center"
                    variant="filled"
                    defaultValue={genreDefaultValue}
                    {...register("genre")}
                  >
                    {filterOptions.map(({ value, label }) => (
                      <option key={label} value={value}>
                        {value}
                      </option>
                    ))}
                  </Select>
                </Stack>

                <FormControl mt="2" isInvalid={errors.content ? true : false}>
                  <FormLabel fontSize="lg" color="gray.600" htmlFor="content">
                    問題文
                    <span style={{ color: "red", paddingLeft: "2px" }}>*</span>
                  </FormLabel>
                  <Textarea
                    id="content"
                    defaultValue={contentDefaultValue}
                    {...register("content", {
                      required: "文字を入力してください",
                      maxLength: {
                        value: 100,
                        message: "100文字以内で入力してください",
                      },
                    })}
                  />
                  <FormHelperText>
                    {!errors.content && "100文字以内"}
                  </FormHelperText>
                  <FormErrorMessage>
                    {errors.content && errors.content.message}
                  </FormErrorMessage>
                </FormControl>

                <Box mt="2" p={2}>
                  <FormControl
                    variant="floating"
                    id="optionA"
                    isInvalid={errors.optionA ? true : false}
                  >
                    <Input
                      id="optionA"
                      placeholder=" "
                      defaultValue={optionADefaultValue}
                      {...register("optionA", {
                        required: "文字を入力してください",
                        maxLength: {
                          value: 10,
                          message: "10文字以内で入力してください",
                        },
                      })}
                    />
                    <FormLabel>
                      選択肢Ａ
                      <span style={{ color: "red", paddingLeft: "2px" }}>
                        *
                      </span>
                    </FormLabel>
                    <FormHelperText>
                      {!errors.optionA && "10文字以内"}
                    </FormHelperText>
                    <FormErrorMessage>
                      {errors.optionA && errors.optionA.message}
                    </FormErrorMessage>
                  </FormControl>
                </Box>

                <Box mt="2" p={2}>
                  <FormControl
                    variant="floating"
                    id="optionB"
                    isInvalid={errors.optionB ? true : false}
                  >
                    <Input
                      id="optionB"
                      placeholder=" "
                      defaultValue={optionBDefaultValue}
                      {...register("optionB", {
                        required: "文字を入力してください",
                        maxLength: {
                          value: 10,
                          message: "10文字以内で入力してください",
                        },
                      })}
                    />
                    <FormLabel>
                      選択肢Ｂ
                      <span style={{ color: "red", paddingLeft: "2px" }}>
                        *
                      </span>
                    </FormLabel>
                    <FormHelperText>
                      {!errors.optionB && "10文字以内"}
                    </FormHelperText>
                    <FormErrorMessage>
                      {errors.optionB && errors.optionB.message}
                    </FormErrorMessage>
                  </FormControl>
                </Box>

                <Box mt="2" p={2}>
                  <FormControl
                    variant="floating"
                    id="optionC"
                    isInvalid={errors.optionC ? true : false}
                  >
                    <Input
                      id="optionC"
                      placeholder=" "
                      defaultValue={optionCDefaultValue}
                      {...register("optionC", {
                        required: "文字を入力してください",
                        maxLength: {
                          value: 10,
                          message: "10文字以内で入力してください",
                        },
                      })}
                    />
                    <FormLabel>
                      選択肢Ｃ
                      <span style={{ color: "red", paddingLeft: "2px" }}>
                        *
                      </span>
                    </FormLabel>
                    <FormHelperText>
                      {!errors.optionC && "10文字以内"}
                    </FormHelperText>
                    <FormErrorMessage>
                      {errors.optionC && errors.optionC.message}
                    </FormErrorMessage>
                  </FormControl>
                </Box>

                <Box mt="2" p={2}>
                  <FormControl
                    variant="floating"
                    id="optionD"
                    isInvalid={errors.optionD ? true : false}
                  >
                    <Input
                      id="optionD"
                      placeholder=" "
                      defaultValue={optionDDefaultValue}
                      {...register("optionD", {
                        required: "文字を入力してください",
                        maxLength: {
                          value: 10,
                          message: "10文字以内で入力してください",
                        },
                      })}
                    />
                    <FormLabel>
                      選択肢Ｄ
                      <span style={{ color: "red", paddingLeft: "2px" }}>
                        *
                      </span>
                    </FormLabel>
                    <FormHelperText>
                      {!errors.optionD && "10文字以内"}
                    </FormHelperText>
                    <FormErrorMessage>
                      {errors.optionD && errors.optionD.message}
                    </FormErrorMessage>
                  </FormControl>
                </Box>

                <Box mt="3">
                  <Text fontSize="lg" color="gray.600">
                    正解
                    <span style={{ color: "red", paddingLeft: "2px" }}>*</span>
                  </Text>
                  <RadioGroup defaultValue={answerDefaultValue}>
                    <Stack spacing={5} direction="row">
                      <Radio
                        size="lg"
                        colorScheme="red"
                        value="1"
                        {...register("answer")}
                      >
                        A
                      </Radio>
                      <Radio
                        size="lg"
                        colorScheme="green"
                        value="2"
                        {...register("answer")}
                      >
                        B
                      </Radio>
                      <Radio
                        size="lg"
                        colorScheme="yellow"
                        value="3"
                        {...register("answer")}
                      >
                        C
                      </Radio>
                      <Radio
                        size="lg"
                        colorScheme="blue"
                        value="4"
                        {...register("answer")}
                      >
                        D
                      </Radio>
                    </Stack>
                  </RadioGroup>
                </Box>

                <FormControl
                  mt="2"
                  isInvalid={errors.description ? true : false}
                >
                  <FormLabel
                    fontSize="lg"
                    color="gray.600"
                    htmlFor="description"
                  >
                    解説
                    <span style={{ color: "red", paddingLeft: "2px" }}>*</span>
                  </FormLabel>
                  <Textarea
                    id="description"
                    defaultValue={descriptionDefaultValue}
                    {...register("description", {
                      required: "文字を入力してください",
                      maxLength: {
                        value: 100,
                        message: "100文字以内で入力してください",
                      },
                    })}
                  />
                  <FormHelperText>
                    {!errors.description && "100文字以内"}
                  </FormHelperText>
                  <FormErrorMessage>
                    {errors.description && errors.description.message}
                  </FormErrorMessage>
                </FormControl>

                <Center>
                  <Button
                    type="submit"
                    colorScheme="blackAlpha"
                    variant="solid"
                  >
                    {buttonSentence}
                  </Button>
                  <Button
                    ml="3"
                    type="submit"
                    colorScheme="blackAlpha"
                    variant="solid"
                    onClick={() => router.push("/quizzesIndex")}
                  >
                    キャンセル
                  </Button>
                </Center>
              </form>
            </VStack>
          </Container>
        </ChakraProvider>
      ) : (
        <Center mt="30%">
          <Spinner size="xl" />
        </Center>
      )}
    </>
  );
};

export default QuizInputForm;
