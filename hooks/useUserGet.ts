import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

import { auth } from "../lib/firebase";

const useUserGet = () => {
  const [user, setUser] = useState<any>("");
  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unSub();
  }, []);
  return user;
};

export default useUserGet;
