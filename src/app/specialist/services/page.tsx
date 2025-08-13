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
        <>
            <CardsTitle ns='specialist_services'/>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <ServiceCards />
            </div>
        </>
    )
}

export default ServicesPage