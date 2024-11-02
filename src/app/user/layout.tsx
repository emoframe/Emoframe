import Breadcrumbs from '@/components/Breadcrumbs';
import { FC, ReactNode } from 'react';

interface UserLayoutProps {
    children: ReactNode;
}

const UserLayout: FC<UserLayoutProps> = ({ children }) => {
    return <div className='flex flex-col bg-primary-background md:p-10 m-5 rounded-md p-4'>
        <div className='mb-4'>
            <Breadcrumbs homeHref="user" />
        </div>
        {children}
    </div>;
};

export default UserLayout;
