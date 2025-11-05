import { FC, ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className='flex flex-1 items-center justify-center'>
      <div className='flex flex-col bg-primary-background p-10 m-5 rounded-md'>{children}</div>
    </div>
  );
};

export default AuthLayout;
