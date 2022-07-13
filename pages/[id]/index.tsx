import React, { useEffect, useState } from "react";
import Head from "next/head";
import {
  Button,
  Center,
  Container,
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
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import { useForm } from "react-hook-form";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";

import Header from "../../components/Header";
import { quizItemState } from "../../constans/atom";

const Index = () => {
  const quizItem = useRecoilValue(quizItemState);
  const { register, getValues } = useForm();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isClient, setIsClient] = useState(false);
  const { width, height } = useWindowSize();

  useEffect(() => {
    const unSub = () => {
      //  window オブジェクトが存在する場合に、isClientをtrueにする
      if (typeof window !== "undefined") setIsClient(true);
    };
    return unSub();
  }, []);

  return (
    <>
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
                {`ジャンル：${quizItem.genre}`}
              </Text>
              <Text fontSize="lg" lineHeight="2" color="gray.600">
                {`問題文：${quizItem.content}`}
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
                    回答
                  </Button>
                  <Modal isOpen={isOpen} onClose={onClose}>
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
                            <Text color="blue.400">{`解説：${quizItem.description}`}</Text>
                            <Confetti
                              width={width}
                              height={height}
                              recycle={true}
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
            </VStack>
          </Container>
        </>
      )}
    </>
  );
};

export default Index;
