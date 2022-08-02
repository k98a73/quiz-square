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
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import Header from "../../../components/Header";
import { inputTheme } from "../../../constants/inputTheme";
import useIsMounted from "../../../hooks/useIsMounted";
import firebase, { auth, db, storage } from "../../../lib/firebase";

interface QuizItem {
  id: string;
  uid: string;
}

// registerに登録するname属性の型を定義
type Inputs = {
  userName: string;
  image: any;
};

export default function MyPageEdit() {
  const [user, setUser] = useState<any>("");
  const [oldImageName, setOldImageName] = useState<any>("");
  const [oldUserName, setOldUserName] = useState<any>("");
  const [selectedImage, setSelectedImage] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDefaultUserName, setIsDefaultUserName] = useState<boolean>(false);
  const [quizzes, setQuizzes] = useState<QuizItem[]>([]);
  // マウントを監視するカスタムフック
  const isMountedRef = useIsMounted();
  const router = useRouter();
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<Inputs>({});

  useEffect(() => {
    const unSub = auth.onAuthStateChanged((user) => {
      setUser(user);
      !user && router.push("/signin");
    });
    return () => unSub();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const unSub = db.collection("quizzes").onSnapshot((snapshot) => {
      if (isMountedRef.current)
        setQuizzes(
          snapshot.docs.map((doc) => ({
            id: doc.data().id,
            uid: doc.data().uid,
          }))
        );
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
          if (isMountedRef.current) {
            setOldUserName(doc.data()?.userName);
            setOldImageName(doc.data()?.imageName);
            if (!isDefaultUserName) setValue("userName", oldUserName);
            setIsDefaultUserName(true);
          }
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

  const onSubmit: SubmitHandler<Inputs> = async ({ userName, image }) => {
    setIsLoading(true);
    const uid = user?.uid;
    userNameChange(uid, userName);
    if (image[0]) {
      const imageName = new Date().toISOString() + image[0].name;
      const imageUrl = await uploadTaskPromise(image[0], imageName, uid);
      db.collection("users").doc(uid).set(
        {
          userName,
          imageUrl,
          imageName,
        },
        { merge: true }
      );
      await storage.ref(`/images/${uid}/${oldImageName}`).delete();
    } else {
      db.collection("users").doc(uid).set({ userName }, { merge: true });
    }
    if (isMountedRef.current) setIsLoading(false);
    router.push("/quizzesIndex");
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

  const userNameChange = (uid: string, userName: string) => {
    quizzes.map((quiz) => {
      if (quiz.uid === uid) {
        const userRef = db.collection("quizzes").doc(quiz.id);
        userRef.update({
          userName,
        });
      }
    });
  };

  return (
    <ChakraProvider theme={inputTheme}>
      {user && !isLoading ? (
        <>
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
                <FormLabel>画像を選択</FormLabel>
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
                    {...register("image")}
                    onChange={handleChange}
                  />
                  <Avatar ml="3" size="md" src={selectedImage} />
                </Box>
                <FormErrorMessage>
                  {errors.image && errors.image.message}
                </FormErrorMessage>
              </FormControl>
              <Center mt="3">
                <Button type="submit" colorScheme="blackAlpha" variant="solid">
                  ユーザー情報更新
                </Button>
                <Button
                  ml="3"
                  type="submit"
                  colorScheme="blackAlpha"
                  variant="solid"
                  onClick={() => router.push("/quizzesIndex")}
                >
                  キャンセル
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
