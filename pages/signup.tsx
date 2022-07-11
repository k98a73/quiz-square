import React, { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import {
  Avatar,
  Box,
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

import Header from "../components/Header";
import { db, auth } from "../lib/firebase";
import firebase, { storage } from "../lib/firebase";
import { theme } from "../constans/theme";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

export default function SignUp() {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const handleClick = () => setShow(!show);

  const handleChange = (event: any) => {
    if (event.target.files[0]) {
      const blobUrl = window.URL.createObjectURL(event.target.files[0]);
      setSelectedImage(blobUrl);
    } else {
      setSelectedImage("");
    }
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = async ({ email, password, userName, image }: any) => {
    try {
      await auth
        .createUserWithEmailAndPassword(email, password)
        .then(async (user) => {
          const uid = user.user?.uid;
          const imageName = new Date().toISOString() + image[0].name;
          const imageUrl = await uploadTaskPromise(image[0], imageName, uid);
          db.collection("users").doc(user.user?.uid).set({
            uid,
            userName,
            imageUrl,
          });
          router.push("/");
        });
    } catch (error: any) {
      alert(error.message);
    }
  };

  async function uploadTaskPromise(image: any, imageName: any, uid: any) {
    return new Promise(function (resolve, reject) {
      const uploadTask = storage.ref(`/images/${uid}/${imageName}`).put(image);
      uploadTask.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        null,
        (error) => {
          alert(error.message);
          reject();
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((fireBaseUrl) => {
            resolve(fireBaseUrl);
          });
        }
      );
    });
  }

  return (
    <ChakraProvider theme={theme}>
      <Head>
        <title>Quiz Square</title>
      </Head>
      <Header />
      <Container py="3" maxW="800px">
        <VStack mt="2">
          <form style={{ width: "95%" }} onSubmit={handleSubmit(onSubmit)}>
            <FormControl
              variant="floating"
              id="userName"
              isInvalid={errors.userName ? true : false}
            >
              <Input
                id="userName"
                placeholder=" "
                {...register("userName", {
                  required: "文字を入力してください",
                  maxLength: {
                    value: 10,
                    message: "10文字以内で入力してください",
                  },
                })}
              />
              <FormLabel>
                ユーザーネーム
                <span style={{ color: "red", paddingLeft: "2px" }}>*</span>
              </FormLabel>
              <FormErrorMessage>
                {errors.userName && errors.userName.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl
              id="image"
              mt="5"
              isInvalid={errors.image ? true : false}
            >
              <FormLabel>
                画像を選択
                <span style={{ color: "red", paddingLeft: "2px" }}>*</span>
              </FormLabel>
              <Box>
                <input
                  id="image"
                  type="file"
                  accept="image/*"
                  style={{
                    margin: "9px 0",
                    padding: "0px",
                    color: "white",
                    width: "128px",
                  }}
                  {...register("image", {
                    required: "画像を選択してください",
                  })}
                  onChange={handleChange}
                />
                <Avatar ml="3" size="md" src={selectedImage} />
              </Box>
              <FormErrorMessage>
                {errors.image && errors.image.message}
              </FormErrorMessage>
            </FormControl>

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
                ユーザー登録
              </Button>
            </Center>
          </form>
        </VStack>
      </Container>
    </ChakraProvider>
  );
}
