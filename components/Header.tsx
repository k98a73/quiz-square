import React from "react";
import {
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

const Header = () => {
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
          <IconButton
            aria-label="signOut"
            bg="cyan.600"
            color="gray.50"
            rounded="full"
            size="lg"
            icon={<FaSignOutAlt />}
            onClick={useSignOut()}
          />
        </ButtonGroup>
      </Flex>
    </>
  );
};

export default Header;
