"use client";

import { Answer, Evaluation } from "@/types/forms";
import { User } from "@/types/users";
import { createContext } from "react";

type UserContextType = {
  user: User | null;
  addUser: (user: User) => void;
  removeUser: () => void;

  evaluation: Evaluation | null;
  addEvaluation: (evaluation: Evaluation) => void;
  removeEvaluation: () => void;

  answer: Answer | null;
  addAnswer: (answer: Answer) => void;
  removeAnswer: () => void;

};

const UserContext = createContext<UserContextType | null>(null);

export default UserContext;