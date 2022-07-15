import {
  Avatar,
  Box,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import Head from "next/head";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

import Header from "../../../components/Header";

export default function MyPageEdit() {
  const [selectedImage, setSelectedImage] = useState("");
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = () => {};

  const handleChange = (event: any) => {
    if (event.target.files[0]) {
      const blobUrl = window.URL.createObjectURL(event.target.files[0]);
      setSelectedImage(blobUrl);
    } else {
      setSelectedImage("");
    }
  };

  return (
    <>
      <Head>
        <title>Quiz Square</title>
      </Head>
      <Header />
      <Container py="3" maxW="800px">
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
        </form>
      </Container>
    </>
  );
}
