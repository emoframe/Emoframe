'use client';

// Importando dependências necessárias e o contexto
import React, { useState, useCallback, ReactNode } from 'react';
import { User } from "@/types/users"; // Ajuste o caminho se necessário
import UserContext from '@/components/context/UserContext';

// Definindo o componente Provider
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const addUser = useCallback((newUser: User) => {
    setUser(newUser);
  }, []);

  const removeUser = useCallback(() => {
    setUser(null);
  }, []);

  // O valor que será passado para os consumidores do contexto
  const value = {
    user,
    addUser,
    removeUser
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
