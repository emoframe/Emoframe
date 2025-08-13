import { FC, ReactNode } from 'react';
import PathnameAware from '@/components/PathnameAware';
import Breadcrumbs from '@/components/Breadcrumbs';

interface SpecialistLayoutProps {
    children: ReactNode;
}

const SpecialistLayout: FC<SpecialistLayoutProps> = ({ children }) => {

    const defaultLayout = (
        <div className="flex justify-center w-full px-4 py-6 print:!p-0">
          <div className="flex flex-col justify-center items-center bg-primary-background p-4 rounded-md shadow print:w-full">
            <div className='flex flex-col w-full print:items-center'>
                <div className="mb-4">
                <Breadcrumbs homeHref="specialist" />
                </div>
                {children}
            </div>
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
