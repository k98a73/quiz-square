import { ChevronRightIcon } from "@chakra-ui/icons";
import {
  AspectRatio,
  Box,
  Container,
  Divider,
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
import { useState } from "react";
import { MdCheckCircle } from "react-icons/md";

import Header from "../components/Header";
import useIsMounted from "../hooks/useIsMounted";
import { auth } from "../lib/firebase";

const Home: NextPage = () => {
  const [user, setUser] = useState<any>("");
  // マウントを監視するカスタムフック
  const isMountedRef = useIsMounted();

  auth.onAuthStateChanged((user) => {
    if (isMountedRef.current) setUser(user);
  });

  return (
    <>
      <Header />
      <Container py="3" maxW="1000px">
        <VStack spacing={{ base: "15px", md: "25px" }}>
          <Text
            fontSize={{ base: "2xl", sm: "4xl", md: "5xl" }}
            fontWeight="extrabold"
            fontFamily="游ゴシック体"
            bgGradient="linear(to-l, #7928CA, #FF0080)"
            bgClip="text"
          >
            ようこそ Quiz Square へ
          </Text>

          <Stack
            w="100%"
            direction={{ base: "column", md: "row" }}
            spacing={{ base: "5px", md: "10px" }}
            align="center"
            justify="center"
          >
            <Box w={{ base: "235px", md: "260px" }}>
              <Text
                fontSize={{ base: "xl", md: "2xl" }}
                fontWeight="bold"
                color="gray.600"
              >
                ユーザーの登録方法
              </Text>
              <List
                mt="2"
                spacing={{ base: "5px", md: "10px" }}
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
            <AspectRatio
              w={{ base: "95%", sm: "80%", md: "calc(100% - 260px)" }}
              ratio={16 / 9}
            >
              <iframe
                src="https://www.loom.com/embed/efa1b03e5bce4569ba97285638bfc4af"
                frameBorder="0"
                allowFullScreen
                style={{
                  width: "100%",
                  height: "100%",
                }}
              />
            </AspectRatio>
          </Stack>

          <Stack
            w="100%"
            direction={{ base: "column", md: "row-reverse" }}
            spacing={{ base: "5px", md: "10px" }}
            align="center"
            justify="center"
          >
            <Box w={{ base: "235px", md: "260px" }}>
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
            <AspectRatio
              w={{ base: "95%", sm: "80%", md: "calc(100% - 260px)" }}
              ratio={16 / 9}
            >
              <iframe
                src="https://www.loom.com/embed/03dbab9e7ed9417094358a471ec6c573"
                frameBorder="0"
                allowFullScreen
                style={{
                  width: "100%",
                  height: "100%",
                }}
              />
            </AspectRatio>
          </Stack>

          <Stack
            w="100%"
            direction={{ base: "column", md: "row" }}
            spacing={{ base: "5px", md: "10px" }}
            align="center"
            justify="center"
          >
            <Box w={{ base: "245px", md: "275px" }}>
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
            <AspectRatio
              w={{ base: "95%", sm: "80%", md: "calc(100% - 275px)" }}
              ratio={16 / 9}
            >
              <iframe
                src="https://www.loom.com/embed/197e3103a50c493f8f591df39bb2f048"
                frameBorder="0"
                allowFullScreen
                style={{
                  width: "100%",
                  height: "100%",
                }}
              />
            </AspectRatio>
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
              <Link color="blue.400" href="/quizzesIndex">
                問題一覧
              </Link>
            </Text>
            {user ? (
              <Text
                fontSize={{ base: "xl", md: "2xl" }}
                fontWeight="bold"
                color="gray.600"
              >
                <ChevronRightIcon />
                <Link color="blue.400" href="/create">
                  問題作成
                </Link>
              </Text>
            ) : (
              <>
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
              </>
            )}
          </Stack>
        </VStack>
      </Container>
    </>
  );
};

export default Home;
