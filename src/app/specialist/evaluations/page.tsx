import React from 'react'
import { OptionCard } from '@/components/OptionCard';
import CardsTitle from '@/components/CardsTitle';

const Evaluations = async () => {
    return (
        <>
            <CardsTitle ns="specialist_evaluations"/>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <OptionCard content={{title: 'specialist_evaluations:optionViewTitle', description: '', href: '/specialist/evaluations/list'}} />
                <OptionCard content={{title: 'specialist_evaluations:optionRegisterTitle', description: '', href: '/specialist/evaluations/form'}} />
            </div>
        </>
    )
};

export default Evaluations;