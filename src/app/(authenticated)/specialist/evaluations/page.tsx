import React from 'react'
import { OptionCard, Content } from '@/components/OptionCard';
import CardsTitle from '@/components/CardsTitle';

import list from '@/../public/images/list.svg'
import file from '@/../public/images/file-up.svg'

const Evaluations = async () => {
    return (
        <div className="flex justify-center w-full min-h-[calc(100vh-80px)] px-4 py-8 print:!p-0">
            
            <div className="flex flex-col w-full max-w-screen-xl items-center p-4 print:w-full">
                
                <div className='flex flex-col w-full print:items-center px-sidebar gap-8'>
                    
                    <CardsTitle ns="specialist_evaluations" />
                    
                    <div className="flex flex-col items-center gap-6 w-full">
                        
                        <div className="w-full max-w-4xl flex flex-col gap-6">
                            <OptionCard  
                                className='w-full' 
                                content={{ 
                                    title: 'specialist_evaluations:optionViewTitle', 
                                    description: '', 
                                    href: '/specialist/evaluations/list', 
                                    image: list 
                                }} 
                            />
                            
                            <OptionCard 
                                className='w-full' 
                                content={{ 
                                    title: 'specialist_evaluations:optionRegisterTitle', 
                                    description: '', 
                                    href: '/specialist/evaluations/form', 
                                    image: file  
                                }} 
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Evaluations;