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
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import Header from "../../../components/Header";
import { inputTheme } from "../../../constants/inputTheme";
import useIsMounted from "../../../hooks/useIsMounted";
import useSignOutUserRedirect from "../../../hooks/useSignOutUserRedirect";
import { db, storage } from "../../../lib/firebase";

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
  const [oldImageName, setOldImageName] = useState<any>("");
  const [oldUserName, setOldUserName] = useState<any>("");
  const [selectedImage, setSelectedImage] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDefaultUserName, setIsDefaultUserName] = useState<boolean>(false);
  const [quizzes, setQuizzes] = useState<QuizItem[]>([]);
  // マウントを監視するカスタムフック
  const isMountedRef = useIsMounted();
  const router = useRouter();
  const user = useSignOutUserRedirect();
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<Inputs>({});

  const uid = user.uid;

  useEffect(() => {
    const quizzesCollectionRef = collection(db, "quizzes");
    const q = query(quizzesCollectionRef);
    const unSub = onSnapshot(q, (querySnapshot) => {
      if (isMountedRef.current)
        setQuizzes(
          querySnapshot.docs.map((doc) => ({
            id: doc.data().id,
            uid: doc.data().uid,
          }))
        );
    });
    return () => unSub();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (user) {
    const docRef = doc(db, "users", uid);
    getDoc(docRef)
      .then((documentSnapshot) => {
        if (documentSnapshot.exists()) {
          if (isMountedRef.current) {
            setOldUserName(documentSnapshot.data()?.userName);
            setOldImageName(documentSnapshot.data()?.imageName);
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
    userNameChange(uid, userName);
    if (image[0]) {
      const imageName = new Date().toISOString() + image[0].name;
      const imageUrl = await uploadTaskPromise(image[0], imageName, uid);
      setDoc(
        doc(db, "users", uid),
        {
          userName,
          imageUrl,
          imageName,
        },
        { merge: true }
      );
      const oldImageNameRef = ref(storage, `/images/${uid}/${oldImageName}`);
      await deleteObject(oldImageNameRef);
    } else {
      await setDoc(doc(db, "users", uid), { userName }, { merge: true });
    }
    router.push("/quizzesIndex");
  };

  async function uploadTaskPromise(image: any, imageName: any, uid: any) {
    return new Promise(function (resolve, reject) {
      const imageRef = ref(storage, `/images/${uid}/${imageName}`);
      const uploadTask = uploadBytesResumable(imageRef, image);
      uploadTask.on(
        "state_changed",
        null,
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

  const userNameChange = (uid: string, userName: string) => {
    quizzes.map((quiz) => {
      if (quiz.uid === uid) {
        const userRef = doc(db, "quizzes", quiz.id);
        updateDoc(userRef, {
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
