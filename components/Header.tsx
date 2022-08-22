import React from "react";
import {
  ButtonGroup,
  Flex,
  Heading,
  IconButton,
  Spacer,
  Tooltip,
  useBreakpointValue,
} from "@chakra-ui/react";
import { FaSignInAlt } from "react-icons/fa";
import { HiOutlineUserAdd } from "react-icons/hi";
import { useRouter } from "next/router";
import Head from "next/head";

import MyPageSignOutContainer from "./MyPageSignOutContainer";
import useGetUser from "../hooks/useGetUser";

const Header = () => {
  const user = useGetUser();
  const router = useRouter();
  const iconButtonSize = useBreakpointValue({ base: "md", md: "lg" });
  const iconSize = useBreakpointValue({ base: 18, md: 23 });

  return (
    <>
      <Head>
        <title>Quiz Square</title>
      </Head>
      <Flex
        h={{ base: "60px", md: "70px" }}
        alignItems="center"
        minWidth="max-content"
        bgColor="cyan.600"
        color="gray.50"
      >
        <Heading
          ml={{ base: "5px", md: "10px" }}
          p={{ base: "5px", md: "10px" }}
          _hover={{ cursor: "pointer" }}
          onClick={() => router.push("/quizzesIndex")}
        >
          Quiz Square
        </Heading>
        <Spacer />
        <ButtonGroup mr={{ base: "5px", md: "10px" }} alignItems="center">
          {user ? (
            <MyPageSignOutContainer
              user={user}
              router={router}
              iconButtonSize={iconButtonSize}
              iconSize={iconSize}
            />
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
                  size={iconButtonSize}
                  _hover={{
                    cursor: "pointer",
                    backgroundColor: "#f4f4f4",
                    color: "#c0ccce",
                  }}
                  icon={<HiOutlineUserAdd size={iconSize} />}
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
                  size={iconButtonSize}
                  _hover={{
                    cursor: "pointer",
                    backgroundColor: "#f4f4f4",
                    color: "#c0ccce",
                  }}
                  icon={<FaSignInAlt size={iconSize} />}
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
