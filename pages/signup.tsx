import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
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
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

import Header from "../components/Header";
import { db } from "../lib/firebase";
import { storage } from "../lib/firebase";
import { inputTheme } from "../constants/inputTheme";
import useSignInUserRedirect from "../hooks/useSignInUserRedirect";

// registerに登録するname属性の型を定義
type Inputs = {
  email: string;
  password: string;
  userName: string;
  image: any;
};

export default function SignUp() {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const user = useSignInUserRedirect();

  const handleClick = () => setShow(!show);

  const avatarImage = watch("image");
  useEffect(() => {
    if (avatarImage && avatarImage[0]) {
      const blobUrl = window.URL.createObjectURL(avatarImage[0]);
      setSelectedImage(blobUrl);
    } else {
      setSelectedImage("");
    }
  }, [avatarImage]);

  const onSubmit: SubmitHandler<Inputs> = async ({
    email,
    password,
    userName,
    image,
  }) => {
    setIsLoading(true);
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (user) => {
        const uid = user.user?.uid;
        const imageName = new Date().toISOString() + image[0].name;
        const imageUrl = await uploadTaskPromise(image[0], imageName, uid);
        setDoc(doc(db, "users", user.user?.uid), {
          uid,
          userName,
          imageUrl,
          imageName,
        });
        setIsLoading(false);
        router.push("/quizzesIndex");
      })
      .catch((error: any) => {
        alert(error.message);
      });
  };

  async function uploadTaskPromise(
    image: any,
    imageName: string,
    uid: string | undefined
  ) {
    return new Promise(function (resolve, reject) {
      const imageRef = ref(storage, `/images/${uid}/${imageName}`);
      const uploadTask = uploadBytesResumable(imageRef, image);
      uploadTask.on(
        "state_changed",
        (error) => {
          alert(error);
          reject();
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((fireBaseUrl) => {
            resolve(fireBaseUrl);
          });
        }
      );
    });
  }

  return (
    <ChakraProvider theme={inputTheme}>
      {!isLoading && !user ? (
        <>
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
                      required: "ユーザーネームは必須です",
                      maxLength: {
                        value: 10,
                        message: "10文字以内で入力してください",
                      },
                    })}
                  />
                  <FormLabel>
                    ユーザーネーム
                    <Text as="span" color="red" pl="2px">
                      *
                    </Text>
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
                    <Text as="span" color="red" pl="2px">
                      *
                    </Text>
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
                    ユーザー登録
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
