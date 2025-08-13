import React from 'react'
import { OptionCard } from '@/components/OptionCard';
import CardsTitle from '@/components/CardsTitle';

const Page = async () => {
    return (
        <>
            <CardsTitle ns="specialist_services_page"/>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <OptionCard content={{title: 'specialist_services_page:optionResultsTitle', description: '', href: '/specialist/services/page/results'}} />
                <OptionCard content={{title: 'specialist_services_page:optionRegisterTitle', description: '', href: '/specialist/services/page/form'}} />
            </div>
        </>
    )
};

export default Page;