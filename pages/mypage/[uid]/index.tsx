import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import {
  Avatar,
  Center,
  Container,
  HStack,
  IconButton,
  Spinner,
  Text,
  Tooltip,
  VStack,
} from "@chakra-ui/react";

import Header from "../../../components/Header";
import { auth, db } from "../../../lib/firebase";
import { EditIcon } from "@chakra-ui/icons";

export default function MyPage() {
  const [user, setUser] = useState<any>("");
  const router = useRouter();
  const [avatarUrl, setAvatarUrl] = useState<any>("");
  const [userName, setUserName] = useState<any>("");

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
          setAvatarUrl(doc.data()?.imageUrl);
          setUserName(doc.data()?.userName);
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
        <>
          <Head>
            <title>Quiz Square</title>
          </Head>
          <Header />
          <Container py="3" maxW="800px">
            <VStack>
              <Text
                fontSize="lg"
                color="gray.600"
              >{`Email：${user.email}`}</Text>
              <Text
                fontSize="lg"
                color="gray.600"
              >{`ユーザーネーム：${userName}`}</Text>
              <HStack>
                <Text fontSize="lg" color="gray.600">
                  アバター画像：
                </Text>
                <Avatar ml="3" size="md" src={avatarUrl} />
              </HStack>
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
                  onClick={() => router.push(`/mypage/${user?.uid}/edit`)}
                ></IconButton>
              </Tooltip>
            </VStack>
          </Container>
        </>
      ) : (
        <Center mt="30%">
          <Spinner size="xl" />
        </Center>
      )}
    </>
  );
}
