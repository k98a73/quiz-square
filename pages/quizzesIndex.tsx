import { useEffect, useState } from "react";
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
import { AiFillStar } from "react-icons/ai";

import Header from "../components/Header";
import { auth, db } from "../lib/firebase";
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
  favorites: string[];
}

const QuizzesIndex = () => {
  const [quizzes, setQuizzes] = useState<QuizItem[]>([]);
  const [filteredQuizzes, setFilteredQuizzes] = useState<QuizItem[]>([]);
  const [genreFilter, setGenreFilter] = useState("全て");
  const [quizItem, setQuizItem] = useRecoilState(quizItemState);
  // const [favoritesColor, setFavoritesColor] = useState<boolean>(false);
  const [user, setUser] = useState<any>(false);
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
            favorites: doc.data().favorites,
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

  useEffect(() => {
    const unSub = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unSub();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const uid = user?.uid;

  const addFavorites = (id: string, favorites: string[]) => {
    if (favorites.length === 0) {
      favorites.push(uid);
      db.collection("quizzes").doc(id).set(
        {
          favorites,
        },
        { merge: true }
      );
    } else {
      let favoriteExistence = false;
      let favoritesIndex = 0;
      favorites.forEach((favorite, index) => {
        if (favorite === uid) {
          favoriteExistence = true;
          favoritesIndex = index;
        }
      });
      if (favoriteExistence) {
        favorites.splice(favoritesIndex, 1);
      } else {
        favorites.push(uid);
      }
      db.collection("quizzes").doc(id).set(
        {
          favorites,
        },
        { merge: true }
      );
    }
  };

  const favoritesColor = (favorites: string[]) => {
    let favoriteExistence = false;
    favorites.forEach((favorite) => {
      if (favorite === uid) {
        favoriteExistence = true;
      }
    });
    return favoriteExistence;
  };

  return (
    <>
      <Header />
      <Box
        backgroundImage="url('https://cdn.pixabay.com/photo/2017/03/25/20/51/quiz-2174368_960_720.png')"
        backgroundRepeat="repeat-y"
        backgroundSize="contain"
        backgroundPosition=" 50% 0%"
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
            <Wrap align="start" justify="center">
              {filteredQuizzes.map((quiz) => {
                return (
                  <WrapItem key={quiz.id}>
                    <VStack
                      pb="4px"
                      spacing="4px"
                      borderWidth="1px"
                      borderRadius="lg"
                      boxShadow="md"
                      color="white"
                      fontWeight="bold"
                      bgGradient="linear(to-r, cyan.500, blue.500)"
                      _hover={{
                        opacity: 0.8,
                        bgGradient: "linear(to-r, red.500, yellow.500)",
                      }}
                    >
                      <Box
                        m="2px 8px 0 8px"
                        w="xs"
                        _hover={{
                          cursor: "pointer",
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
                        <Text fontSize="lg" py="1">
                          {`作成者：${quiz.userName}`}
                        </Text>
                        <Text fontSize="lg" py="1">
                          {`ジャンル：${quiz.genre}`}
                        </Text>
                        <Text fontSize="lg" py="1" noOfLines={3}>
                          {`問題：${quiz.content}`}
                        </Text>
                      </Box>
                      {user && (
                        <Tooltip
                          label="お気に入り"
                          fontSize="md"
                          bg="gray.500"
                          color="white"
                          placement="bottom"
                          hasArrow
                        >
                          <IconButton
                            aria-label="favorites"
                            bg="rgba(0,0,0,0)"
                            rounded="full"
                            size="sm"
                            _hover={{
                              cursor: "pointer",
                              backgroundColor: "#f4f4f4",
                              color: "#c0ccce",
                            }}
                            icon={
                              <AiFillStar
                                color={
                                  favoritesColor(quiz.favorites)
                                    ? "yellow"
                                    : "white"
                                }
                                size="23"
                              />
                            }
                            onClick={() =>
                              addFavorites(quiz.id, quiz.favorites)
                            }
                          />
                        </Tooltip>
                      )}
                    </VStack>
                  </WrapItem>
                );
              })}
            </Wrap>
          </VStack>
        </Container>
      </Box>
    </>
  );
};

export default QuizzesIndex;
