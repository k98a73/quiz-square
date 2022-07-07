import React from "react";
import {
  ButtonGroup,
  Flex,
  Heading,
  IconButton,
  Spacer,
} from "@chakra-ui/react";
import { FaSignInAlt } from "react-icons/fa";
import { HiOutlineUserAdd } from "react-icons/hi";
import NextLink from "next/link";

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
          <IconButton
            aria-label="logout"
            bg="cyan.600"
            color="gray.50"
            rounded="full"
            size="lg"
            icon={<HiOutlineUserAdd />}
          />
          <IconButton
            aria-label="logout"
            bg="cyan.600"
            color="gray.50"
            rounded="full"
            size="lg"
            icon={<FaSignInAlt />}
          />
        </ButtonGroup>
      </Flex>
    </>
  );
};

export default Header;
