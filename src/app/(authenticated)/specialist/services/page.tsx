import CardsTitle from '@/components/CardsTitle';
import { OptionCard, Content } from '@/components/OptionCard';
import React from 'react'

const contents: Content[] = [
    { title: "specialist_services:optionInstrumentsTitle", description: "specialist_services:optionInstrumentsDescription", href: "/specialist/services/instruments" },
    { title: "specialist_services:optionTemplatesTitle", description: "specialist_services:optionTemplatesDescription", href: "/specialist/services/templates" },
    {
        title: "specialist_services:optionPageTitle",
        description: "specialist_services:optionPageDescription",
        href: "/specialist/services/page",
    },
]

const ServiceCards = () => {
    return (
        <>
            {contents.map((content, index) => (
                <OptionCard key={index} content={content} />
            ))}
        </>
    );
}

const ServicesPage = () => {
    return (
        <div className="flex justify-center w-full px-4 py-6 print:!p-0">
            <div className="flex flex-col justify-center items-center bg-primary-background p-4 rounded-md shadow print:w-full">
                <div className='flex flex-col w-full print:items-center'>
                    <CardsTitle ns='specialist_services' />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <ServiceCards />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ServicesPage