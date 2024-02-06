import { FC, ReactNode } from 'react';

interface UserLayoutProps {
  children: ReactNode;
}

const UserLayout: FC<UserLayoutProps> = ({ children }) => {
  return <div className='flex bg-primary-background p-5 rounded-md'>{children}</div>;
};

export default UserLayout;
