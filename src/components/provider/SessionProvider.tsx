'use client';
import { SessionProvider as Provider } from 'next-auth/react';
import DesignerProvider from './DesignerProvider';
import UserProvider from './UserProvider';

type Props = {
  children: React.ReactNode;
}

export default function SessionProvider({children}: Props) {
  return (
    <Provider>
      <DesignerProvider>
        <UserProvider>
          {children}
        </UserProvider>
      </DesignerProvider>
    </Provider>
  )
}