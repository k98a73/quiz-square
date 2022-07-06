import React from "react";
import { Flex, Heading, IconButton, Spacer } from "@chakra-ui/react";
import { FaSignOutAlt } from "react-icons/fa";
import NextLink from "next/link";

const Header = () => {
  return (
    <>
      <Flex
        textAlign="center"
        w="full"
        p="2"
        bgColor="cyan.600"
        color="gray.50"
      >
        <NextLink href="/" passHref>
          <Heading as="a">Quiz Square</Heading>
        </NextLink>
        <Spacer />
        <IconButton
          aria-label="logout"
          bg="cyan.600"
          color="gray.50"
          rounded="full"
          icon={<FaSignOutAlt />}
        />
      </Flex>
    </>
  );
};

export default Header;
