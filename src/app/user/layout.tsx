import { FC, ReactNode } from 'react';

interface UserLayoutProps {
  children: ReactNode;
}

const UserLayout: FC<UserLayoutProps> = ({ children }) => {
  return <div className='flex flex-col bg-primary-background p-5 mx-[100px] rounded-md'>{children}</div>;
};

export default UserLayout;
