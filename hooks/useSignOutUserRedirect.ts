import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "../lib/firebase";

const useSignOutUserRedirect = () => {
  const router = useRouter();
  const [user, setUser] = useState<any>("");

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      setUser(user);
      !user && router.push("/signin");
    });
    return () => unSub();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return user;
};

export default useSignOutUserRedirect;
