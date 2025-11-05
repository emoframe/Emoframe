"use client"; 
import { FC, ReactNode, useState } from 'react';
import PathnameAware from '@/components/PathnameAware';
import Breadcrumbs from '@/components/Breadcrumbs';
import Sidebar from '@/components/sidebar/Sidebar';
import { TutorialContext } from '@/components/context/TutorialContext';

interface SpecialistLayoutProps {
    children: ReactNode;
}

const SpecialistLayout: FC<SpecialistLayoutProps> = ({ children }) => {

    const [showTutorial, setTutorial] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);

    const defaultLayout = (
        <div className='flex flex-1 min-h-screen'>
            <Sidebar/>
            <div className="flex-1 ">
                {children}
            </div>
        </div>
    );

    const specialLayout = (
        <>{children}</>
    );

    return (
        <TutorialContext.Provider value={{showTutorial, setTutorial, currentStep, setCurrentStep}}>
            <PathnameAware
                defaultContent={defaultLayout}
                specialContent={specialLayout}
                ignorePaths="/specialist/services/templates/builder"

            />
        </TutorialContext.Provider>
    );
};

export default SpecialistLayout;
