import { FC, ReactNode } from 'react';
import PathnameAware from '@/components/PathnameAware';
import Breadcrumbs from '@/components/Breadcrumbs';

interface SpecialistLayoutProps {
    children: ReactNode;
}

const SpecialistLayout: FC<SpecialistLayoutProps> = ({ children }) => {

    const defaultLayout = (
        <div className='flex flex-col bg-primary-background md:p-10 m-5 rounded-md p-4 print:!m-0 print:!p-0 print:items-center print:w-full'>
            <div className='mb-4'>
                <Breadcrumbs homeHref="specialist" />
            </div>
            {children}
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
