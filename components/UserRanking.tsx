import { HStack, Icon, Text } from "@chakra-ui/react";
import React from "react";
import { FaCrown } from "react-icons/fa";

const UserRanking = () => {
  return (
    <>
      <HStack bg="white" spacing="5px">
        <Icon as={FaCrown} w={{ base: "24px", md: "36px" }} h={8} color='cyan.600' />
        <Text
          fontSize={{ base: "2xl", md: "4xl" }}
          fontWeight="extrabold"
          bgGradient="linear(to-r, cyan.500, blue.500)"
          bgClip="text"
        >
          ユーザーランキング
        </Text>
      </HStack>
    </>
  );
};

export default UserRanking;
