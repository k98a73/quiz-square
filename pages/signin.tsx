import React, { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import {
  Button,
  Center,
  ChakraProvider,
  Container,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import Header from "../components/Header";
import { auth } from "../lib/firebase";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { inputTheme } from "../constants/inputTheme";

export default function SignIn() {
  const router = useRouter();
  const [show, setShow] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const handleClick = () => setShow(!show);

  const onSubmit = async ({ email, password }: any) => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
      router.push("/quizzesIndex");
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <ChakraProvider theme={inputTheme}>
      <Head>
        <title>Quiz Square</title>
      </Head>
      <Header />
      <Container py="3" maxW="800px">
        <VStack>
          <form style={{ width: "95%" }} onSubmit={handleSubmit(onSubmit)}>
            <FormControl
              mt="5"
              variant="floating"
              id="email"
              isInvalid={errors.email ? true : false}
            >
              <Input
                id="email"
                placeholder=" "
                {...register("email", {
                  required: "文字を入力してください",
                  pattern: {
                    value: /^[\w\-._]+@[\w\-._]+\.[A-Za-z]+/,
                    message: "入力形式がメールアドレスではありません。",
                  },
                })}
              />
              <FormLabel>
                メール
                <span style={{ color: "red", paddingLeft: "2px" }}>*</span>
              </FormLabel>
              <FormErrorMessage>
                {errors.email && errors.email.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl
              id="password"
              mt="5"
              isInvalid={errors.password ? true : false}
            >
              <FormLabel>
                パスワード
                <span style={{ color: "red", paddingLeft: "2px" }}>*</span>
              </FormLabel>
              <InputGroup size="md">
                <Input
                  pr="4.5rem"
                  placeholder=" "
                  type={show ? "text" : "password"}
                  id="password"
                  {...register("password", {
                    required: "文字を入力してください",
                    pattern: {
                      value: /^[a-zA-Z0-9]+$/,
                      message: "半角英数字で入力してください。",
                    },
                    minLength: {
                      value: 8,
                      message: "8文字以上で入力してください",
                    },
                  })}
                />
                <InputRightElement width="4.5rem">
                  <IconButton
                    h="1.75rem"
                    size="lg"
                    onClick={handleClick}
                    aria-label="passwordView"
                    _focus={{ boxShadow: "none" }}
                    icon={show ? <ViewOffIcon /> : <ViewIcon />}
                  ></IconButton>
                </InputRightElement>
              </InputGroup>
              <FormHelperText>
                {!errors.password && "半角英数8文字以上"}
              </FormHelperText>
              <FormErrorMessage>
                {errors.password && errors.password.message}
              </FormErrorMessage>
            </FormControl>

            <Center>
              <Button type="submit" colorScheme="blackAlpha" variant="solid">
                ログイン
              </Button>
            </Center>
          </form>
        </VStack>
      </Container>
    </ChakraProvider>
  );
}
