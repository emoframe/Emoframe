import { FC, ReactNode } from 'react';
import PathnameAware from '@/components/PathnameAware';

interface SpecialistLayoutProps {
  children: ReactNode;
}

const SpecialistLayout: FC<SpecialistLayoutProps> = ({ children }) => {

  const defaultLayout = (
    <div className='flex flex-col bg-primary-background p-5 mx-[100px] my-[50px] rounded-md'>{children}</div>
  );

  const specialLayout = (
    <>{children}</>
  );

  return (
    <PathnameAware
      defaultContent={defaultLayout}
      specialContent={specialLayout}
      ignorePaths="/specialist/services/templates/builder"
    />
  );
};

export default SpecialistLayout;
