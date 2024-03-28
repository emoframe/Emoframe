import { FC, ReactNode } from 'react';
import { headers } from 'next/headers'

interface SpecialistLayoutProps {
  children: ReactNode;
}

const SpecialistLayout: FC<SpecialistLayoutProps> = ({ children }) => {
  const headersList = headers();
  const pathname = headersList.get('x-pathname');

  if (pathname && pathname.startsWith('/specialist/services/templates/builder')) {
    return <>{children}</>;
  }

  return <div className='flex flex-col bg-primary-background p-5 mx-[100px] rounded-md'>{children}</div>;
};

export default SpecialistLayout;
