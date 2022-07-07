import { useEffect, useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import NextLink from "next/link";
import {
  Avatar,
  Box,
  Container,
  Flex,
  HStack,
  IconButton,
  Select,
  Spacer,
  Text,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

import Header from "../components/Header";
import { db } from "../lib/firebase";

interface QuizItem {
  id: string;
  genre: string;
  content: string;
}

const Home: NextPage = () => {
  const [quizzes, setQuizzes] = useState<QuizItem[]>([]);
  const [filteredQuizzes, setFilteredQuizzes] = useState<QuizItem[]>([]);
  const [genreFilter, setGenreFilter] = useState("全て");

  useEffect(() => {
    const unSub = db.collection("quizzes").onSnapshot((snapshot) => {
      setQuizzes(
        snapshot.docs.map((doc) => ({
          id: doc.data().id,
          genre: doc.data().genre,
          content: doc.data().content,
        }))
      );
    });
    return () => unSub(); /* アンマウントしたら、firebaseの監視を停止 */
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
    filteringQuizzesGenre();
  }, [genreFilter, quizzes]);

  return (
    <>
      <Head>
        <title>Quiz Square</title>
      </Head>
      <Header />
      <Container py="3" maxW="800px">
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
            <NextLink href="/create" passHref>
              <IconButton
                aria-label="add"
                shadow="lg"
                bg="white"
                color="gray.400"
                rounded="full"
                icon={<AddIcon />}
                as="a"
              />
            </NextLink>
          </Flex>
          <Wrap align="center" justify="center">
            {filteredQuizzes.map((quiz) => {
              return (
                <WrapItem key={quiz.id}>
                  <Box
                    m="2"
                    p="2"
                    w="xs"
                    borderWidth="1px"
                    borderRadius="lg"
                    boxShadow="md"
                  >
                    <HStack>
                      <Text fontSize="lg" color="gray.800" py="1">
                        作成者：
                      </Text>
                      <Avatar
                        size="md"
                        src="https://bit.ly/sage-adebayo"
                      />
                    </HStack>
                    <Text fontSize="lg" color="gray.800" py="1">
                      ジャンル：{quiz.genre}
                      <br />
                      問題文：{quiz.content}
                    </Text>
                  </Box>
                </WrapItem>
              );
            })}
          </Wrap>
        </VStack>
      </Container>
    </>
  );
};

export default Home;
