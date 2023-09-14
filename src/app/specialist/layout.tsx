import { FC, ReactNode } from 'react';

interface SpecialistLayoutProps {
  children: ReactNode;
}

const SpecialistLayout: FC<SpecialistLayoutProps> = ({ children }) => {
  return <div className='flex bg-slate-200 p-10 m-y-10 rounded-md'>{children}</div>;
};

export default SpecialistLayout;
