"use client";

import { useContext } from "react";
import UserContext from "@/components/context/UserContext";

const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser deve estar dentro de um UserContext");
  }

  return context;
}

export default useUser;