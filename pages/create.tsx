import React from "react";
import Head from "next/head";
import {
  Container,
  FormErrorMessage,
  FormLabel,
  FormControl,
  Button,
  Select,
  Textarea,
  VStack,
  Text,
  Stack,
  Input,
  Center,
  RadioGroup,
  Radio,
  extendTheme,
  ChakraProvider,
  FormHelperText,
  Box,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import Header from "../components/Header";
import FilterOptions from "../constans/FilterOptions";

const activeLabelStyles = {
  transform: "scale(0.85) translateY(-24px)",
};

export const theme = extendTheme({
  components: {
    Form: {
      variants: {
        floating: {
          container: {
            _focusWithin: {
              label: {
                ...activeLabelStyles,
              },
            },
            "input:not(:placeholder-shown) + label, .chakra-select__wrapper + label":
              {
                ...activeLabelStyles,
              },
            label: {
              top: 0,
              left: 0,
              zIndex: 2,
              position: "absolute",
              backgroundColor: "white",
              pointerEvents: "none",
              mx: 3,
              px: 1,
              my: 2,
              transformOrigin: "left top",
            },
          },
        },
      },
    },
  },
});

export default function Create() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <ChakraProvider theme={theme}>
      <Head>
        <title>Quiz Square</title>
      </Head>
      <Header />
      <Container py="3" maxW="800px">
        <VStack>
          <form style={{ width: "95%" }} onSubmit={handleSubmit(onSubmit)}>
            <Stack direction="row" align="center">
              <Text fontSize="lg" color="gray.600">
                ジャンル
                <span style={{ color: "red", padding: "0 3px" }}>*</span>:
              </Text>
              <Select
                size="md"
                w="100px"
                color="gray.500"
                fontWeight="bold"
                textAlign="center"
                variant="filled"
                {...register("genre")}
              >
                {FilterOptions.map(({ value, label }) => (
                  <option key={label} value={value}>
                    {value}
                  </option>
                ))}
              </Select>
            </Stack>

            <FormControl mt="2" isInvalid={errors.content ? true : false}>
              <FormLabel fontSize="lg" color="gray.600" htmlFor="content">
                問題文
                <span style={{ color: "red", paddingLeft: "2px" }}>*</span>
              </FormLabel>
              <Textarea
                id="content"
                {...register("content", {
                  required: "文字を入力してください",
                  maxLength: {
                    value: 40,
                    message: "40文字以内で入力してください",
                  },
                })}
              />
              <FormHelperText>
                {!errors.content && "40文字以内"}
              </FormHelperText>
              <FormErrorMessage>
                {errors.content && errors.content.message}
              </FormErrorMessage>
            </FormControl>

            <Box mt="2" p={2}>
              <FormControl
                variant="floating"
                id="optionA"
                isInvalid={errors.optionA ? true : false}
              >
                <Input
                  id="optinA"
                  placeholder=" "
                  {...register("optionA", {
                    required: "文字を入力してください",
                    maxLength: {
                      value: 10,
                      message: "10文字以内で入力してください",
                    },
                  })}
                />
                <FormLabel>
                  選択肢Ａ
                  <span style={{ color: "red", paddingLeft: "2px" }}>*</span>
                </FormLabel>
                <FormHelperText>
                  {!errors.optionA && "10文字以内"}
                </FormHelperText>
                <FormErrorMessage>
                  {errors.optionA && errors.optionA.message}
                </FormErrorMessage>
              </FormControl>
            </Box>

            <Box mt="2" p={2}>
              <FormControl
                variant="floating"
                id="optionB"
                isInvalid={errors.optionB ? true : false}
              >
                <Input
                  id="optionB"
                  placeholder=" "
                  {...register("optionB", {
                    required: "文字を入力してください",
                    maxLength: {
                      value: 10,
                      message: "10文字以内で入力してください",
                    },
                  })}
                />
                <FormLabel>
                  選択肢Ｂ
                  <span style={{ color: "red", paddingLeft: "2px" }}>*</span>
                </FormLabel>
                <FormHelperText>
                  {!errors.optionB && "10文字以内"}
                </FormHelperText>
                <FormErrorMessage>
                  {errors.optionB && errors.optionB.message}
                </FormErrorMessage>
              </FormControl>
            </Box>

            <Box mt="2" p={2}>
              <FormControl
                variant="floating"
                id="optionC"
                isInvalid={errors.optionC ? true : false}
              >
                <Input
                  id="optionC"
                  placeholder=" "
                  {...register("optionC", {
                    required: "文字を入力してください",
                    maxLength: {
                      value: 10,
                      message: "10文字以内で入力してください",
                    },
                  })}
                />
                <FormLabel>
                  選択肢Ｃ
                  <span style={{ color: "red", paddingLeft: "2px" }}>*</span>
                </FormLabel>
                <FormHelperText>
                  {!errors.optionC && "10文字以内"}
                </FormHelperText>
                <FormErrorMessage>
                  {errors.optionC && errors.optionC.message}
                </FormErrorMessage>
              </FormControl>
            </Box>

            <Box mt="2" p={2}>
              <FormControl
                variant="floating"
                id="optionD"
                isInvalid={errors.optionD ? true : false}
              >
                <Input
                  id="optionD"
                  placeholder=" "
                  {...register("optionD", {
                    required: "文字を入力してください",
                    maxLength: {
                      value: 10,
                      message: "10文字以内で入力してください",
                    },
                  })}
                />
                <FormLabel>
                  選択肢Ｄ
                  <span style={{ color: "red", paddingLeft: "2px" }}>*</span>
                </FormLabel>
                <FormHelperText>
                  {!errors.optionD && "10文字以内"}
                </FormHelperText>
                <FormErrorMessage>
                  {errors.optionD && errors.optionD.message}
                </FormErrorMessage>
              </FormControl>
            </Box>

            <Box mt="3">
              <Text fontSize="lg" color="gray.600">
                正解
                <span style={{ color: "red", paddingLeft: "2px" }}>*</span>
              </Text>
              <RadioGroup defaultValue="1">
                <Stack spacing={5} direction="row">
                  <Radio size="lg" colorScheme="red" value="1" {...register("answer")}>
                    A
                  </Radio>
                  <Radio size="lg" colorScheme="green" value="2" {...register("answer")}>
                    B
                  </Radio>
                  <Radio size="lg" colorScheme="yellow" value="3" {...register("answer")}>
                    C
                  </Radio>
                  <Radio size="lg" colorScheme="blue" value="4" {...register("answer")}>
                    D
                  </Radio>
                </Stack>
              </RadioGroup>
            </Box>

            <FormControl mt="2" isInvalid={errors.description ? true : false}>
              <FormLabel fontSize="lg" color="gray.600" htmlFor="description">
                解説
                <span style={{ color: "red", paddingLeft: "2px" }}>*</span>
              </FormLabel>
              <Textarea
                id="description"
                {...register("description", {
                  required: "文字を入力してください",
                  maxLength: {
                    value: 40,
                    message: "40文字以内で入力してください",
                  },
                })}
              />
              <FormHelperText>
                {!errors.description && "40文字以内"}
              </FormHelperText>
              <FormErrorMessage>
                {errors.description && errors.description.message}
              </FormErrorMessage>
            </FormControl>

            <Center>
              <Button
                mt={4}
                colorScheme="teal"
                isLoading={isSubmitting}
                type="submit"
              >
                送信
              </Button>
            </Center>
          </form>
        </VStack>
      </Container>
    </ChakraProvider>
  );
}
