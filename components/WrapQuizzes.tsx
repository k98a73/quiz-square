import React from "react";
import {
  Box,
  HStack,
  IconButton,
  Spacer,
  Text,
  Tooltip,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { AiFillStar } from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { useRecoilState } from "recoil";
import { useRouter } from "next/router";
import { doc, setDoc } from "firebase/firestore";

import { quizItemState } from "../constants/atom";
import { db } from "../lib/firebase";
import { QuizItem } from "../types/QuizItem";
import useGetUser from "../hooks/useGetUser";

const WrapQuizzes: React.FC<{ quizzes: QuizItem[] }> = ({ quizzes }) => {
  const [quizItem, setQuizItem] = useRecoilState(quizItemState);
  const user = useGetUser();
  const uid = user?.uid;
  const router = useRouter();

  const favoritesColor = (favorites: string[]) => {
    let favoriteExistence = false;
    if (favorites) {
      favorites.forEach((favorite) => {
        if (favorite === uid) {
          favoriteExistence = true;
        }
      });
    }
    return favoriteExistence;
  };

  const likesColor = (likes: string[]) => {
    let likeExistence = false;
    if (likes) {
      likes.forEach((like) => {
        if (like === uid) {
          likeExistence = true;
        }
      });
    }
    return likeExistence;
  };

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

  const addFavorites = (id: string, favorites: string[]) => {
    if (favorites.length === 0) {
      favorites.push(uid);
      setDoc(
        doc(db, "quizzes", id),
        {
          favorites,
        },
        { merge: true }
      );
    } else {
      let favoriteExistence = false;
      let favoritesIndex = 0;
      if (favorites) {
        favorites.forEach((favorite, index) => {
          if (favorite === uid) {
            favoriteExistence = true;
            favoritesIndex = index;
          }
        });
      }
      if (favoriteExistence) {
        favorites.splice(favoritesIndex, 1);
      } else {
        favorites.push(uid);
      }
      setDoc(
        doc(db, "quizzes", id),
        {
          favorites,
        },
        { merge: true }
      );
    }
  };

  const addLikes = (id: string, likes: string[]) => {
    if (likes.length === 0) {
      likes.push(uid);
      setDoc(
        doc(db, "quizzes", id),
        {
          likes,
        },
        { merge: true }
      );
    } else {
      let likeExistence = false;
      let likesIndex = 0;
      if (likes) {
        likes.forEach((like, index) => {
          if (like === uid) {
            likeExistence = true;
            likesIndex = index;
          }
        });
      }
      if (likeExistence) {
        likes.splice(likesIndex, 1);
      } else {
        likes.push(uid);
      }
      setDoc(
        doc(db, "quizzes", id),
        {
          likes,
        },
        { merge: true }
      );
    }
  };

  return (
    <Wrap align="start" justify="center">
      {quizzes.map((quiz) => {
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
              <HStack w="80%">
                <HStack>
                  <Tooltip
                    label="いいね"
                    fontSize="md"
                    bg="gray.500"
                    color="white"
                    placement="bottom"
                    hasArrow
                  >
                    <IconButton
                      aria-label="likes"
                      bg="rgba(0,0,0,0)"
                      rounded="full"
                      size="sm"
                      isDisabled={!user}
                      _hover={{ cursor: "pointer" }}
                      icon={
                        <FaHeart
                          color={likesColor(quiz.likes) ? "pink" : "white"}
                          size="23"
                        />
                      }
                      onClick={() => addLikes(quiz.id, quiz.likes)}
                    />
                  </Tooltip>
                  <Text fontSize="lg">{quiz.likes.length}</Text>
                </HStack>
                <Spacer></Spacer>
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
                    isDisabled={!user}
                    _hover={{ cursor: "pointer" }}
                    icon={
                      <AiFillStar
                        color={
                          favoritesColor(quiz.favorites) ? "yellow" : "white"
                        }
                        size="23"
                      />
                    }
                    onClick={() => addFavorites(quiz.id, quiz.favorites)}
                  />
                </Tooltip>
              </HStack>
            </VStack>
          </WrapItem>
        );
      })}
    </Wrap>
  );
};

export default WrapQuizzes;
