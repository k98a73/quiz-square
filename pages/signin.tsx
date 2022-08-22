import React, { useState } from "react";
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
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { SubmitHandler, useForm } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";

import Header from "../components/Header";
import { auth } from "../lib/firebase";
import { inputTheme } from "../constants/inputTheme";
import useSignInUserRedirect from "../hooks/useSignInUserRedirect";

// registerに登録するname属性の型を定義
type Inputs = {
  email: string;
  password: string;
};

export default function SignIn() {
  const router = useRouter();
  const [show, setShow] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Inputs>();

  const user = useSignInUserRedirect();

  const handleClick = () => setShow(!show);

  const onSubmit: SubmitHandler<Inputs> = ({ email, password }) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => router.push("/quizzesIndex"))
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <ChakraProvider theme={inputTheme}>
      {!user ? (
        <>
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
                      required: "メールアドレスは必須です",
                      pattern: {
                        value: /^[\w\-._]+@[\w\-._]+\.[A-Za-z]+/,
                        message: "メールアドレスの形式が正しくありません",
                      },
                    })}
                  />
                  <FormLabel>
                    メール
                    <Text as="span" color="red" pl="2px">
                      *
                    </Text>
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
                    <Text as="span" color="red" pl="2px">
                      *
                    </Text>
                  </FormLabel>
                  <InputGroup size="md">
                    <Input
                      pr="4.5rem"
                      placeholder=" "
                      type={show ? "text" : "password"}
                      id="password"
                      {...register("password", {
                        required: "パスワードは必須です",
                        pattern: {
                          value: /^[a-zA-Z0-9]+$/,
                          message: "半角英数字で入力してください",
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
                  <Button
                    type="submit"
                    colorScheme="blackAlpha"
                    variant="solid"
                  >
                    ログイン
                  </Button>
                </Center>
              </form>
            </VStack>
          </Container>
        </>
      ) : (
        <Center mt="30%">
          <Spinner size="xl" />
        </Center>
      )}
    </ChakraProvider>
  );
}
