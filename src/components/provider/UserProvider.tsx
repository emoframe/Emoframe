'use client';

import React, { useState, useCallback, ReactNode } from 'react';
import UserContext from '@/components/context/UserContext';
import { User } from "@/types/users";
import { Answer, Evaluation } from '@/types/forms';

// Definindo o componente Provider
export const UserProvider = ({ children }: { children: ReactNode }) => {
  // Estado para user
  const [user, setUser] = useState<User | null>(null);
  // Estado para evaluation
  const [evaluation, setEvaluation] = useState<Evaluation | null>(null);
  // Estado para answer
  const [answer, setAnswer] = useState<Answer | null>(null);

  // Adicionar e remover user
  const addUser = useCallback((newUser: User) => {
    setUser(newUser);
  }, []);
  const removeUser = useCallback(() => {
    setUser(null);
  }, []);

  // Adicionar e remover evaluation
  const addEvaluation = useCallback((newEvaluation: Evaluation) => {
    setEvaluation(newEvaluation);
  }, []);
  const removeEvaluation = useCallback(() => {
    setEvaluation(null);
  }, []);

  // Adicionar e remover answer
  const addAnswer = useCallback((newAnswer: Answer) => {
    setAnswer(newAnswer);
  }, []);
  const removeAnswer = useCallback(() => {
    setAnswer(null);
  }, []);

  // O valor que será passado para os consumidores do contexto
  const value = {
    user,
    addUser,
    removeUser,
    evaluation,
    addEvaluation,
    removeEvaluation,
    answer,
    addAnswer,
    removeAnswer,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;