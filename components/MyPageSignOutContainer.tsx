import React, { useState } from "react";
import {
  Avatar,
  Center,
  IconButton,
  Spinner,
  Tooltip,
  useBreakpointValue,
} from "@chakra-ui/react";
import { FaSignOutAlt } from "react-icons/fa";

import useSignOut from "../hooks/useSignOut";
import { db } from "../lib/firebase";
import useIsMounted from "../hooks/useIsMounted";

const MyPageSignOutContainer = ({
  uid,
  router,
  iconButtonSize,
  iconSize,
}: any) => {
  const [avatarUrl, setAvatarUrl] = useState<any>("");
  // マウントを監視するカスタムフック
  const isMountedRef = useIsMounted();
  const avatarSize = useBreakpointValue({ base: "sm", md: "md" });

  const docRef = db.collection("users").doc(uid);
  docRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        // マウント時のみアバター画像を更新
        if (isMountedRef.current) setAvatarUrl(doc.data()?.imageUrl);
      } else {
        if (isMountedRef.current) alert("No such document!");
      }
    })
    .catch((error) => {
      alert(error);
    });

  return (
    <>
      {avatarUrl ? (
        <Tooltip
          label="ユーザー詳細"
          fontSize="md"
          bg="gray.500"
          color="white"
          placement="bottom"
          hasArrow
        >
          <Avatar
            size={avatarSize}
            src={avatarUrl}
            _hover={{
              cursor: "pointer",
              backgroundColor: "white",
              transform: "scale(1.1, 1.1)",
            }}
            onClick={() => router.push(`/mypage/${uid}`)}
          />
        </Tooltip>
      ) : (
        <Center>
          <Spinner size="lg" />
        </Center>
      )}
      <Tooltip
        label="ログアウト"
        fontSize="md"
        bg="gray.500"
        color="white"
        placement="bottom-end"
        hasArrow
      >
        <IconButton
          aria-label="signOut"
          bg="cyan.600"
          color="gray.50"
          rounded="full"
          size={iconButtonSize}
          _hover={{
            cursor: "pointer",
            backgroundColor: "#f4f4f4",
            color: "#c0ccce",
          }}
          icon={<FaSignOutAlt size={iconSize} />}
          onClick={useSignOut()}
        />
      </Tooltip>
    </>
  );
};

export default MyPageSignOutContainer;
