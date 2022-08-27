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
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

import Header from "../components/Header";
import { auth, db } from "../lib/firebase";
import WrapQuizzes from "../components/WrapQuizzes";
import { QuizItem } from "../types/QuizItem";

const QuizzesIndex = () => {
  const [quizzes, setQuizzes] = useState<QuizItem[]>([]);
  const [filteredQuizzes, setFilteredQuizzes] = useState<QuizItem[]>([]);
  const [genreFilter, setGenreFilter] = useState("全て");
  // const [favoritesColor, setFavoritesColor] = useState<boolean>(false);
  const [user, setUser] = useState<any>(false);
  const router = useRouter();

  useEffect(() => {
    const quizzesCollectionRef = collection(db, "quizzes");
    const q = query(quizzesCollectionRef, orderBy("createdAt", "desc"));
    const unSub = onSnapshot(q, (querySnapshot) => {
      setQuizzes(
        querySnapshot.docs.map((doc) => ({
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
          likes: doc.data().likes,
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
    const unSub = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unSub();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const uid = user?.uid;

  const favoritesQuizzes = quizzes.filter((quiz) => {
    let favoriteExistence = false;
    if (quiz.favorites) {
      quiz.favorites.forEach((favorite) => {
        if (favorite === uid) {
          favoriteExistence = true;
        }
      });
    }
    if (favoriteExistence) return quiz;
  });

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
            {user && (
              <VStack w="100%">
                <Box bg="white">
                  <Text
                    fontSize={{ base: "2xl", md: "4xl" }}
                    fontWeight="extrabold"
                    bgGradient="linear(to-r, cyan.500, blue.500)"
                    bgClip="text"
                  >
                    お気に入り一覧
                  </Text>
                </Box>
                <WrapQuizzes quizzes={favoritesQuizzes} />
              </VStack>
            )}
            <Flex mt="5" w="85%" alignItems="center">
              <HStack>
                <Box bg="white">
                  <Text
                    w="90px"
                    fontSize="xl"
                    fontWeight="bold"
                    color="gray.600"
                  >
                    ジャンル:
                  </Text>
                </Box>
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
            <WrapQuizzes quizzes={filteredQuizzes} />
          </VStack>
        </Container>
      </Box>
    </>
  );
};

export default QuizzesIndex;
