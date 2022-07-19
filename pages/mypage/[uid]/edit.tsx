import {
  Avatar,
  Box,
  Button,
  Center,
  ChakraProvider,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Spinner,
} from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import Header from "../../../components/Header";
import { inputTheme } from "../../../constans/inputTheme";
import firebase, { auth, db, storage } from "../../../lib/firebase";

export default function MyPageEdit() {
  const [user, setUser] = useState<any>("");
  const [userName, setUserName] = useState<any>("");
  const [selectedImage, setSelectedImage] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm({});

  useEffect(() => {
    const unSub = auth.onAuthStateChanged((user) => {
      setUser(user);
      !user && router.push("/signin");
    });
    return () => unSub();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const docRef = db.collection("users").doc(user?.uid);
  if (user) {
    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          setUserName(doc.data()?.userName);
          setValue("userName", userName);
        } else {
          alert("No such document!");
        }
      })
      .catch((error) => {
        alert(error);
      });
  }

  const handleChange = (event: any) => {
    if (event.target.files[0]) {
      const blobUrl = window.URL.createObjectURL(event.target.files[0]);
      setSelectedImage(blobUrl);
    } else {
      setSelectedImage("");
    }
  };

  const onSubmit = async ({ userName, image }: any) => {
    setIsLoading(true);
    const uid = user?.uid;
    const imageName = new Date().toISOString() + image[0].name;
    const imageUrl = await uploadTaskPromise(image[0], imageName, uid);
    db.collection("users").doc(uid).set(
      {
        userName,
        imageUrl,
      },
      { merge: true }
    );
    setIsLoading(false);
    router.push("/");
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
      {user && !isLoading ? (
        <>
          <Head>
            <title>Quiz Square</title>
          </Head>
          <Header />
          <Container mt="3" py="3" maxW="800px">
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
                      width: "128px",
                    }}
                    {...register("image", {
                      required: "画像を選択してください",
                    })}
                    onChange={handleChange}
                  />
                  <Avatar
                    ml="3"
                    size="md"
                    src={selectedImage}
                  />
                </Box>
                <FormErrorMessage>
                  {errors.image && errors.image.message}
                </FormErrorMessage>
              </FormControl>
              <Center>
                <Button type="submit" colorScheme="blackAlpha" variant="solid">
                  ユーザー情報更新
                </Button>
              </Center>
            </form>
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