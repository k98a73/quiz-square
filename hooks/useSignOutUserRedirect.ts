import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { auth } from "../lib/firebase";

const useSignOutUserRedirect = () => {
  const router = useRouter();
  const [user, setUser] = useState<any>("");

  useEffect(() => {
    const unSub = auth.onAuthStateChanged((user) => {
      setUser(user);
      !user && router.push("/signin");
    });
    return () => unSub();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return user;
};

export default useSignOutUserRedirect;
