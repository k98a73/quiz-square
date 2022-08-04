import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { auth } from "../lib/firebase";

const useSignInUserRedirect = () => {
  const router = useRouter();
  const [user, setUser] = useState<any>("");

  useEffect(() => {
    const unSub = auth.onAuthStateChanged((user) => {
      setUser(user);
      user && router.push("/quizzesIndex");
    });
    return () => unSub();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return user;
};

export default useSignInUserRedirect;
