import { Button, Center, Container } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import NextLink from "next/link";

import Header from "../components/Header";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Quiz Square</title>
      </Head>
      <Header />
      <Container py="3" maxW="800px">
        <Center mt="5">
          <NextLink href="/create" passHref>
            <Button as="a" colorScheme="blackAlpha" variant="solid">
              問題の作成
            </Button>
          </NextLink>
        </Center>
      </Container>
    </>
  );
};

export default Home;
