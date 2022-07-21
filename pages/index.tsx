import { ChevronRightIcon } from "@chakra-ui/icons";
import {
  Box,
  Code,
  Container,
  Divider,
  HStack,
  Image,
  Kbd,
  Link,
  List,
  ListIcon,
  ListItem,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import { MdCheckCircle } from "react-icons/md";

import Header from "../components/Header";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Quiz Square</title>
      </Head>
      <Header />
      <Container py="3" maxW={{ base: "800px", xl: "1100px" }}>
        <VStack spacing="10">
          <Text
            fontSize={{ base: "2xl", sm: "4xl", md: "5xl" }}
            fontWeight="bold"
            fontFamily="游ゴシック体"
            color="cyan.600"
          >
            ようこそ Quiz Square へ
          </Text>
          <Stack
            direction={{ base: "column", md: "row" }}
            spacing="3"
            align="center"
            justify="center"
          >
            <Box mr="2">
              <Text
                fontSize={{ base: "xl", md: "2xl" }}
                fontWeight="bold"
                color="gray.600"
              >
                ユーザーの登録方法
              </Text>
              <List
                mt="2"
                spacing={3}
                fontSize={{ base: "lg", md: "xl" }}
                color="gray.600"
              >
                <ListItem>
                  <ListIcon as={MdCheckCircle} color="green.500" />
                  ユーザーネームの入力
                </ListItem>
                <ListItem>
                  <ListIcon as={MdCheckCircle} color="green.500" />
                  アバター用の画像を選択
                </ListItem>
                <ListItem>
                  <ListIcon as={MdCheckCircle} color="green.500" />
                  メールアドレスを入力
                </ListItem>
                <ListItem>
                  <ListIcon as={MdCheckCircle} color="green.500" />
                  パスワードを入力
                </ListItem>
              </List>
            </Box>
            <Image
              src="https://i.gyazo.com/e26f3e111bed286191532c2524dcba8b.gif"
              alt="gif"
              w={{ base: "80%", md: "60%" }}
              h="auto"
            />
          </Stack>
          <Stack
            direction={{ base: "column", md: "row-reverse" }}
            spacing="3"
            align="center"
            justify="center"
          >
            <Box mr="2">
              <Text
                fontSize={{ base: "xl", md: "2xl" }}
                fontWeight="bold"
                color="gray.600"
              >
                問題の作成方法
              </Text>
              <List
                mt="2"
                spacing={3}
                fontSize={{ base: "lg", md: "xl" }}
                color="gray.600"
              >
                <ListItem>
                  <ListIcon as={MdCheckCircle} color="green.500" />
                  ジャンルを選択
                </ListItem>
                <ListItem>
                  <ListIcon as={MdCheckCircle} color="green.500" />
                  問題文を入力
                </ListItem>
                <ListItem>
                  <ListIcon as={MdCheckCircle} color="green.500" />
                  選択肢A〜Dを入力
                </ListItem>
                <ListItem>
                  <ListIcon as={MdCheckCircle} color="green.500" />
                  正解を選択
                </ListItem>
                <ListItem>
                  <ListIcon as={MdCheckCircle} color="green.500" />
                  解説を入力
                </ListItem>
              </List>
            </Box>
            <Image
              src="https://i.gyazo.com/e26f3e111bed286191532c2524dcba8b.gif"
              alt="gif"
              w={{ base: "80%", md: "60%" }}
              h="auto"
            />
          </Stack>
          <Stack
            direction={{ base: "column", md: "row" }}
            spacing="3"
            align="center"
            justify="center"
          >
            <Box mr="2">
              <Text
                fontSize={{ base: "xl", md: "2xl" }}
                fontWeight="bold"
                color="gray.600"
              >
                問題の解答方法
              </Text>
              <List
                mt="2"
                spacing={3}
                fontSize={{ base: "lg", md: "xl" }}
                color="gray.600"
              >
                <ListItem>
                  <ListIcon as={MdCheckCircle} color="green.500" />
                  正解だと思う選択肢を選択
                </ListItem>
                <ListItem>
                  <ListIcon as={MdCheckCircle} color="green.500" />
                  <Kbd>解答</Kbd>ボタンをクリック
                </ListItem>
              </List>
            </Box>
            <Image
              src="https://i.gyazo.com/e26f3e111bed286191532c2524dcba8b.gif"
              alt="gif"
              w={{ base: "80%", md: "60%" }}
              h="auto"
            />
          </Stack>
          <Divider />
          <Stack
            direction={{ base: "column", md: "row" }}
            spacing="3"
            align="center"
            justify="center"
          >
            <Text
              fontSize={{ base: "xl", md: "2xl" }}
              fontWeight="bold"
              color="gray.600"
            >
              <ChevronRightIcon />
              <Link color="blue.400" href="/signup">
                ユーザー登録
              </Link>
            </Text>
            <Text
              fontSize={{ base: "xl", md: "2xl" }}
              fontWeight="bold"
              color="gray.600"
            >
              <ChevronRightIcon />
              <Link color="blue.400" href="/signin">
                ログイン
              </Link>
            </Text>
            <Text
              fontSize={{ base: "xl", md: "2xl" }}
              fontWeight="bold"
              color="gray.600"
            >
              <ChevronRightIcon />
              <Link color="blue.400" href="/quizzesIndex">
                問題一覧
              </Link>
            </Text>
          </Stack>
        </VStack>
      </Container>
    </>
  );
};

export default Home;
