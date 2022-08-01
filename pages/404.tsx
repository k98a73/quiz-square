import React from "react";

import Header from "../components/Header";
import { Link, Text, VStack } from "@chakra-ui/react";

export default function Custom404() {
  return (
    <>
      <Header />
      <VStack mt="5">
        <Text
          fontWeight="bold"
          fontFamily="游ゴシック体"
          color="gray.600"
          fontSize={{ base: "3xl", sm: "4xl", md: "5xl" }}
        >
          ページは存在しません。
        </Text>
        <Text
          fontSize={{ base: "xl", md: "2xl" }}
          fontWeight="bold"
          color="gray.600"
        >
          <Link color="blue.400" href="/quizzesIndex">
            問題一覧に戻る
          </Link>
        </Text>
      </VStack>
    </>
  );
}
