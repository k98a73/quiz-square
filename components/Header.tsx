import React, { useEffect, useState } from "react";
import {
  ButtonGroup,
  Flex,
  Heading,
  IconButton,
  Spacer,
  Tooltip,
} from "@chakra-ui/react";
import { FaSignInAlt } from "react-icons/fa";
import { HiOutlineUserAdd } from "react-icons/hi";
import { useRouter } from "next/router";

import { auth } from "../lib/firebase";
import MyPageSignOutContainer from "./MyPageSignOutContainer";

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
            <MyPageSignOutContainer uid={user?.uid} router={router} />
          ) : (
            <>
              <Tooltip
                label="新規登録"
                fontSize="md"
                bg="gray.500"
                color="white"
                placement="bottom"
                hasArrow
              >
                <IconButton
                  aria-label="signUp"
                  bg="cyan.600"
                  color="gray.50"
                  rounded="full"
                  size="lg"
                  _hover={{
                    cursor: "pointer",
                    backgroundColor: "#f4f4f4",
                    color: "#c0ccce",
                  }}
                  icon={<HiOutlineUserAdd />}
                  onClick={() => router.push("/signup")}
                />
              </Tooltip>
              <Tooltip
                label="ログイン"
                fontSize="md"
                bg="gray.500"
                color="white"
                placement="bottom-end"
                hasArrow
              >
                <IconButton
                  aria-label="signIn"
                  bg="cyan.600"
                  color="gray.50"
                  rounded="full"
                  size="lg"
                  _hover={{
                    cursor: "pointer",
                    backgroundColor: "#f4f4f4",
                    color: "#c0ccce",
                  }}
                  icon={<FaSignInAlt />}
                  onClick={() => router.push("/signin")}
                />
              </Tooltip>
            </>
          )}
        </ButtonGroup>
      </Flex>
    </>
  );
};

export default Header;
