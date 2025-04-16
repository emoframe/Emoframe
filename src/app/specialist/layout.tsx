import { FC, ReactNode } from 'react';
import PathnameAware from '@/components/PathnameAware';
import Breadcrumbs from '@/components/Breadcrumbs';

interface SpecialistLayoutProps {
    children: ReactNode;
}

const SpecialistLayout: FC<SpecialistLayoutProps> = ({ children }) => {

    const defaultLayout = (
        <div className="flex justify-center w-full bg-primary-background px-4 py-6">
          <div className="flex flex-col w-full max-w-6xl bg-white md:p-10 p-4 rounded-md shadow">
            <div className="mb-4">
              <Breadcrumbs homeHref="specialist" />
            </div>
            {children}
          </div>
        </div>
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
