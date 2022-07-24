import React, { useEffect, useState } from "react";
import Head from "next/head";
import {
  Box,
  Button,
  Center,
  ChakraProvider,
  Container,
  HStack,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Text,
  Tooltip,
  useBreakpointValue,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import { useForm } from "react-hook-form";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";

import Header from "../../../components/Header";
import { quizItemState } from "../../../constans/atom";
import { auth, db } from "../../../lib/firebase";
import { ArrowBackIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import { modalTheme } from "../../../constans/modalTheme";

export default function QuizIndex() {
  const [quizItem, setQuizItem] = useRecoilState(quizItemState);
  const { register, getValues } = useForm();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isClient, setIsClient] = useState(false);
  const { width, height } = useWindowSize();
  const [user, setUser] = useState<any>("");
  const router = useRouter();
  const modalSize = useBreakpointValue({ base: "xs", md: "xl" });

  const deleteQuiz = (e: any) => {
    e.preventDefault();
    const result = window.confirm("クイズを本当に削除しても良いですか？");
    if (result) {
      setQuizItem({
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
      });
      db.collection("quizzes").doc(quizItem.id).delete();
      router.push("/quizzesIndex");
    }
  };

  useEffect(() => {
    if (!quizItem.id) router.push("/quizzesIndex");
    const unSubWindow = () => {
      //  window オブジェクトが存在する場合に、isClientをtrueにする
      if (typeof window !== "undefined") setIsClient(true);
    };
    const unSubAuth = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return unSubWindow(), unSubAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ChakraProvider theme={modalTheme}>
      {/* window オブジェクトが存在する場合にのみ以下を表示することにより、サーバーでの表示と不一致防止 */}
      {isClient && (
        <>
          <Head>
            <title>Quiz Square</title>
          </Head>
          <Header />
          <Container py="3" maxW="800px">
            <VStack>
              <Text fontSize="lg" lineHeight="2" color="gray.600">
                {`作成者：${quizItem.userName}`}
              </Text>
              <Text fontSize="lg" lineHeight="2" color="gray.600">
                {`ジャンル：${quizItem.genre}`}
              </Text>
              <Text
                px={{ base: "5%", md: "20%" }}
                fontSize="lg"
                lineHeight="2"
                color="gray.600"
                overflowWrap="break-word"
              >
                {`問題：${quizItem.content}`}
              </Text>
              <RadioGroup defaultValue="1">
                <VStack mb="4" spacing={5}>
                  <Radio
                    size="lg"
                    colorScheme="red"
                    value="1"
                    {...register("answer")}
                  >
                    {`A：${quizItem.optionA}`}
                  </Radio>
                  <Radio
                    size="lg"
                    colorScheme="green"
                    value="2"
                    {...register("answer")}
                  >
                    {`B：${quizItem.optionB}`}
                  </Radio>
                  <Radio
                    size="lg"
                    colorScheme="yellow"
                    value="3"
                    {...register("answer")}
                  >
                    {`C：${quizItem.optionC}`}
                  </Radio>
                  <Radio
                    size="lg"
                    colorScheme="blue"
                    value="4"
                    {...register("answer")}
                  >
                    {`D：${quizItem.optionD}`}
                  </Radio>
                </VStack>
                <Center>
                  <Button
                    onClick={onOpen}
                    colorScheme="blackAlpha"
                    variant="solid"
                  >
                    解答
                  </Button>
                  <Modal isOpen={isOpen} onClose={onClose} size={modalSize}>
                    <ModalOverlay />
                    <ModalContent>
                      <ModalHeader textAlign="center">
                        {getValues("answer") === quizItem.answer ? (
                          <Text color="blue.400">○正解！</Text>
                        ) : (
                          <Text color="red.500">Ｘ不正解</Text>
                        )}
                      </ModalHeader>
                      <ModalCloseButton />
                      <ModalBody>
                        {getValues("answer") === quizItem.answer && (
                          <>
                            <Center>
                              <Text
                                px={{ base: "5%", md: "20%" }}
                                color="blue.400"
                                overflowWrap="break-word"
                              >{`解説：${quizItem.description}`}</Text>
                            </Center>
                            <Confetti
                              width={width}
                              height={height}
                              recycle={false}
                            />
                          </>
                        )}
                      </ModalBody>
                      <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                          閉じる
                        </Button>
                      </ModalFooter>
                    </ModalContent>
                  </Modal>
                </Center>
              </RadioGroup>
              <HStack>
                {user?.uid === quizItem.uid && (
                  <>
                    <Tooltip
                      label="編集"
                      fontSize="md"
                      bg="gray.500"
                      color="white"
                      placement="bottom-end"
                      hasArrow
                    >
                      <IconButton
                        as="a"
                        aria-label="edit"
                        shadow="lg"
                        bg="white"
                        color="gray.400"
                        rounded="full"
                        icon={<EditIcon />}
                        onClick={() => router.push(`/quiz/${quizItem.id}/edit`)}
                      ></IconButton>
                    </Tooltip>
                    <Tooltip
                      label="削除"
                      fontSize="md"
                      bg="gray.500"
                      color="white"
                      placement="bottom"
                      hasArrow
                    >
                      <IconButton
                        aria-label="delete"
                        as="a"
                        shadow="lg"
                        bg="white"
                        color="gray.400"
                        rounded="full"
                        icon={<DeleteIcon />}
                        onClick={deleteQuiz}
                      />
                    </Tooltip>
                  </>
                )}
                <Tooltip
                  label="戻る"
                  fontSize="md"
                  bg="gray.500"
                  color="white"
                  placement="bottom-start"
                  hasArrow
                >
                  <IconButton
                    as="a"
                    aria-label="back"
                    shadow="lg"
                    bg="white"
                    color="gray.400"
                    rounded="full"
                    icon={<ArrowBackIcon />}
                    onClick={() => router.push("/quizzesIndex")}
                  ></IconButton>
                </Tooltip>
              </HStack>
            </VStack>
          </Container>
        </>
      )}
    </ChakraProvider>
  );
}
