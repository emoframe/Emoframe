import { FC, ReactNode } from 'react';

interface SpecialistLayoutProps {
  children: ReactNode;
}

const SpecialistLayout: FC<SpecialistLayoutProps> = ({ children }) => {
  return <div className='flex bg-primary-background p-5 m-5 rounded-md'>{children}</div>;
};

export default SpecialistLayout;
