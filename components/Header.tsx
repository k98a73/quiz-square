import React, { useEffect, useState } from "react";
import {
  Avatar,
  ButtonGroup,
  Center,
  Flex,
  Heading,
  IconButton,
  Spacer,
  Spinner,
  Tooltip,
} from "@chakra-ui/react";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { HiOutlineUserAdd } from "react-icons/hi";
import useSignOut from "../hooks/useSignOut";
import { auth, db } from "../lib/firebase";
import { useRouter } from "next/router";

const SignOutContainer = ({ uid, router }: any) => {
  const [avatarUrl, setAvatarUrl] = useState<any>("");
  const docRef = db.collection("users").doc(uid);
  docRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        setAvatarUrl(doc.data()?.imageUrl);
      } else {
        alert("No such document!");
      }
    })
    .catch((error) => {
      alert(error);
    });

  return (
    <>
      {avatarUrl ? (
        <Tooltip
          label="ユーザー詳細"
          fontSize="md"
          bg="gray.500"
          color="white"
          placement="bottom"
          hasArrow
        >
          <Avatar
            ml="3"
            size="md"
            src={avatarUrl}
            _hover={{
              cursor: "pointer",
              backgroundColor: "white",
              transform: "scale(1.1, 1.1)",
            }}
            onClick={() => router.push("/mypage")}
          />
        </Tooltip>
      ) : (
        <Center>
          <Spinner size="lg" />
        </Center>
      )}
      <Tooltip
        label="ログアウト"
        fontSize="md"
        bg="gray.500"
        color="white"
        placement="bottom-end"
        hasArrow
      >
        <IconButton
          aria-label="signOut"
          bg="cyan.600"
          color="gray.50"
          rounded="full"
          size="lg"
          icon={<FaSignOutAlt />}
          onClick={useSignOut()}
        />
      </Tooltip>
    </>
  );
};

const Header = () => {
  const [user, setUser] = useState<any>("");
  const router = useRouter();

  useEffect(() => {
    const unSub = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unSub();
  }, []);

  return (
    <>
      <Flex
        h="70px"
        alignItems="center"
        minWidth="max-content"
        bgColor="cyan.600"
        color="gray.50"
      >
        <Heading
          ml="2"
          p="2"
          _hover={{ cursor: "pointer", border: "2px solid white" }}
          onClick={() => router.push("/")}
        >
          Quiz Square
        </Heading>
        <Spacer />
        <ButtonGroup mr="5" gap="2">
          {user ? (
            <SignOutContainer uid={user?.uid} router={router} />
          ) : (
            <>
              <IconButton
                aria-label="signUp"
                bg="cyan.600"
                color="gray.50"
                rounded="full"
                size="lg"
                as="a"
                icon={<HiOutlineUserAdd />}
                onClick={() => router.push("/signup")}
              />
              <IconButton
                aria-label="signIn"
                bg="cyan.600"
                color="gray.50"
                rounded="full"
                size="lg"
                as="a"
                icon={<FaSignInAlt />}
                onClick={() => router.push("/signin")}
              />
            </>
          )}
        </ButtonGroup>
      </Flex>
    </>
  );
};

export default Header;
