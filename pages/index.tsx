import { Box, Container, Stack, VStack } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import Header from "../components/Header";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Quiz Square</title>
      </Head>
      <Header />
      <Container py="3" maxW="800px">
        <VStack>
          <Stack direction={["column", "row"]} spacing="3">
            <Box w="full" h="100px" bgColor="teal.400" p="2">
              I am Box.
            </Box>
            <Box w="full" h="100px" bgColor="teal.400" p="2">
              I am Box.
            </Box>
            <Box w="full" h="100px" bgColor="teal.400" p="2">
              I am Box.
            </Box>
          </Stack>
        </VStack>
      </Container>
    </>
  );
};

export default Home;
