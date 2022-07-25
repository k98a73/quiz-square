import { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import {
  Box,
  Container,
  Flex,
  HStack,
  IconButton,
  Select,
  Spacer,
  Text,
  Tooltip,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useRecoilState } from "recoil";

import Header from "../components/Header";
import { db } from "../lib/firebase";
import { quizItemState } from "../constants/atom";

interface QuizItem {
  id: string;
  uid: string;
  userName: string;
  genre: string;
  content: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  answer: string;
  description: string;
}

const QuizzesIndex = () => {
  const [quizzes, setQuizzes] = useState<QuizItem[]>([]);
  const [filteredQuizzes, setFilteredQuizzes] = useState<QuizItem[]>([]);
  const [genreFilter, setGenreFilter] = useState("全て");
  const [quizItem, setQuizItem] = useRecoilState(quizItemState);
  const router = useRouter();

  const handleSelectQuiz = (
    id: string,
    uid: string,
    userName: string,
    genre: string,
    content: string,
    optionA: string,
    optionB: string,
    optionC: string,
    optionD: string,
    answer: string,
    description: string
  ) => {
    setQuizItem({
      id,
      uid,
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
    router.push(`/quiz/${quizItem.id}`);
  };

  useEffect(() => {
    const unSub = db
      .collection("quizzes")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        setQuizzes(
          snapshot.docs.map((doc) => ({
            id: doc.data().id,
            uid: doc.data().uid,
            userName: doc.data().userName,
            genre: doc.data().genre,
            content: doc.data().content,
            optionA: doc.data().optionA,
            optionB: doc.data().optionB,
            optionC: doc.data().optionC,
            optionD: doc.data().optionD,
            answer: doc.data().answer,
            description: doc.data().description,
          }))
        );
      });
    return () => unSub();
  }, []);

  useEffect(() => {
    const filteringQuizzesGenre = () => {
      switch (genreFilter) {
        case "国語":
          setFilteredQuizzes(quizzes.filter((quiz) => quiz.genre === "国語"));
          break;
        case "算数":
          setFilteredQuizzes(quizzes.filter((quiz) => quiz.genre === "算数"));
          break;
        case "理科":
          setFilteredQuizzes(quizzes.filter((quiz) => quiz.genre === "理科"));
          break;
        case "社会":
          setFilteredQuizzes(quizzes.filter((quiz) => quiz.genre === "社会"));
          break;
        case "英語":
          setFilteredQuizzes(quizzes.filter((quiz) => quiz.genre === "英語"));
          break;
        case "その他":
          setFilteredQuizzes(quizzes.filter((quiz) => quiz.genre === "その他"));
          break;
        default:
          setFilteredQuizzes(quizzes);
      }
    };
    return filteringQuizzesGenre();
  }, [genreFilter, quizzes]);

  return (
    <>
      <Head>
        <title>Quiz Square</title>
      </Head>
      <Header />
      <div
        style={{
          backgroundImage: `url("https://cdn.pixabay.com/photo/2017/03/25/20/51/quiz-2174368_960_720.png")`,
          backgroundRepeat: "repeat-y",
          backgroundSize: "contain",
          backgroundPosition: " 50% 0%",
        }}
      >
        <Container
          minH="calc(100vh - 70px)"
          py="3"
          maxW={{ base: "800px", xl: "1100px" }}
        >
          <VStack>
            <Flex mt="5" w="85%" alignItems="center">
              <HStack>
                <Text w="120px" fontSize="lg" color="gray.600">
                  ジャンル:
                </Text>
                <Select
                  size="md"
                  color="gray.500"
                  mb="2"
                  fontWeight="bold"
                  textAlign="center"
                  variant="filled"
                  value={genreFilter}
                  onChange={(e) => setGenreFilter(e.target.value)}
                >
                  <option value="全て">全て</option>
                  <option value="国語">国語</option>
                  <option value="算数">算数</option>
                  <option value="理科">理科</option>
                  <option value="社会">社会</option>
                  <option value="英語">英語</option>
                  <option value="その他">その他</option>
                </Select>
              </HStack>
              <Spacer />
              <Tooltip
                label="問題作成"
                fontSize="md"
                bg="gray.500"
                color="white"
                placement="right"
                hasArrow
              >
                <IconButton
                  aria-label="add"
                  shadow="lg"
                  bg="white"
                  color="gray.400"
                  rounded="full"
                  icon={<AddIcon />}
                  onClick={() => router.push("/create")}
                />
              </Tooltip>
            </Flex>
            <Wrap align="center" justify="center">
              {filteredQuizzes.map((quiz) => {
                return (
                  <WrapItem key={quiz.id}>
                    <Box
                      m="2"
                      p="2"
                      w="xs"
                      bg="white"
                      borderWidth="1px"
                      borderRadius="lg"
                      boxShadow="md"
                      _hover={{
                        cursor: "pointer",
                        opacity: 0.8,
                        bgColor: "gray.100",
                      }}
                      onClick={() =>
                        handleSelectQuiz(
                          quiz.id,
                          quiz.uid,
                          quiz.userName,
                          quiz.genre,
                          quiz.content,
                          quiz.optionA,
                          quiz.optionB,
                          quiz.optionC,
                          quiz.optionD,
                          quiz.answer,
                          quiz.description
                        )
                      }
                    >
                      <Text fontSize="lg" color="gray.800" py="1">
                        {`作成者：${quiz.userName}`}
                      </Text>
                      <Text fontSize="lg" color="gray.800" py="1">
                        {`ジャンル：${quiz.genre}`}
                      </Text>
                      <Text fontSize="lg" color="gray.800" py="1" noOfLines={3}>
                        {`問題：${quiz.content}`}
                      </Text>
                    </Box>
                  </WrapItem>
                );
              })}
            </Wrap>
          </VStack>
        </Container>
      </div>
    </>
  );
};

export default QuizzesIndex;
