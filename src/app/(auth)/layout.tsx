import { FC, ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return <div className='flex bg-primary-background p-10 m-y-10 rounded-md'>{children}</div>;
};

export default AuthLayout;
