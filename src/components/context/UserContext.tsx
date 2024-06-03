"use client";

import { User } from "@/types/users";
import { createContext } from "react";

type UserContextType = {
  user: User | null;
  addUser: (user: User) => void;
  removeUser: () => void;
};

const UserContext = createContext<UserContextType | null>(null);

export default UserContext;