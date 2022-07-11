import React, { useEffect, useState } from "react";
import {
  Avatar,
  ButtonGroup,
  Flex,
  Heading,
  IconButton,
  Spacer,
} from "@chakra-ui/react";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { HiOutlineUserAdd } from "react-icons/hi";
import NextLink from "next/link";
import useSignOut from "../hooks/useSignOut";
import { auth, db } from "../lib/firebase";

const SignOutContainer = ({uid}: any) => {
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
      <Avatar ml="3" size="md" src={avatarUrl} />
      <IconButton
        aria-label="signOut"
        bg="cyan.600"
        color="gray.50"
        rounded="full"
        size="lg"
        icon={<FaSignOutAlt />}
        onClick={useSignOut()}
      />
    </>
  );
};

const Header = () => {
  const [user, setUser] = useState<any>("");

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);

  return (
    <>
      <Flex
        alignItems="center"
        minWidth="max-content"
        bgColor="cyan.600"
        color="gray.50"
      >
        <NextLink href="/" passHref>
          <Heading ml="2" p="2" as="a">
            Quiz Square
          </Heading>
        </NextLink>
        <Spacer />
        <ButtonGroup mr="5" gap="2">
          {user ? (
            <SignOutContainer uid={user?.uid} />
          ) : (
            <>
              <NextLink href="/signup" passHref>
                <IconButton
                  aria-label="signUp"
                  bg="cyan.600"
                  color="gray.50"
                  rounded="full"
                  size="lg"
                  as="a"
                  icon={<HiOutlineUserAdd />}
                />
              </NextLink>
              <NextLink href="/signin" passHref>
                <IconButton
                  aria-label="signIn"
                  bg="cyan.600"
                  color="gray.50"
                  rounded="full"
                  size="lg"
                  as="a"
                  icon={<FaSignInAlt />}
                />
              </NextLink>
            </>
          )}
        </ButtonGroup>
      </Flex>
    </>
  );
};

export default Header;
