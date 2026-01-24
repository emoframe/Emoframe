import React from 'react'
import { OptionCard, Content } from '@/components/OptionCard';
import CardsTitle from '@/components/CardsTitle';

import toolbox from '@/../public/images/toolbox.svg'
import hospital from '@/../public/images/hospital.svg'


const Evaluations = async () => {
    return (
        <div className="flex justify-center w-full px-4 py-6 print:!p-0">
            <div className="flex flex-col justify-center items-center p-4 print:w-full">
                <div className='flex flex-col w-full print:items-center px-sidebar'>
                    <CardsTitle ns="specialist_evaluations" />
                    <div className="w-full flex flex-col items-center gap-6">
                        <OptionCard  className='w-full' content={{ title: 'specialist_evaluations:optionViewTitle', description: '', href: '/specialist/evaluations/list', image: toolbox }} />
                        <OptionCard className='w-full' content={{ title: 'specialist_evaluations:optionRegisterTitle', description: '', href: '/specialist/evaluations/form', image: toolbox  }} />
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Evaluations;