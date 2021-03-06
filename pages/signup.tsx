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
  Spinner,
  VStack,
} from "@chakra-ui/react";

import Header from "../components/Header";
import { db, auth } from "../lib/firebase";
import firebase, { storage } from "../lib/firebase";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { inputTheme } from "../constants/inputTheme";

export default function SignUp() {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
    setIsLoading(true);
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
            imageName,
          });
          setIsLoading(false);
          router.push("/quizzesIndex");
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
    <ChakraProvider theme={inputTheme}>
      <Head>
        <title>Quiz Square</title>
      </Head>
      {!isLoading ? (
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
                      required: "?????????????????????????????????",
                      maxLength: {
                        value: 10,
                        message: "10???????????????????????????????????????",
                      },
                    })}
                  />
                  <FormLabel>
                    ?????????????????????
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
                    ???????????????
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
                        required: "?????????????????????????????????",
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
                      required: "?????????????????????????????????",
                      pattern: {
                        value: /^[\w\-._]+@[\w\-._]+\.[A-Za-z]+/,
                        message: "????????????????????????????????????????????????????????????",
                      },
                    })}
                  />
                  <FormLabel>
                    ?????????
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
                    ???????????????
                    <span style={{ color: "red", paddingLeft: "2px" }}>*</span>
                  </FormLabel>
                  <InputGroup size="md">
                    <Input
                      pr="4.5rem"
                      placeholder=" "
                      type={show ? "text" : "password"}
                      id="password"
                      {...register("password", {
                        required: "?????????????????????????????????",
                        pattern: {
                          value: /^[a-zA-Z0-9]+$/,
                          message: "?????????????????????????????????????????????",
                        },
                        minLength: {
                          value: 8,
                          message: "8???????????????????????????????????????",
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
                    {!errors.password && "????????????8????????????"}
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
                    ??????????????????
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
