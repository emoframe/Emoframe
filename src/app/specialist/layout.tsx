import { FC, ReactNode } from 'react';

interface SpecialistLayoutProps {
  children: ReactNode;
}

const SpecialistLayout: FC<SpecialistLayoutProps> = ({ children }) => {
  return <div className='flex flex-col bg-primary-background p-5 mx-[100px] rounded-md'>{children}</div>;
};

export default SpecialistLayout;
