import CardsTitle from '@/components/CardsTitle';
import { OptionCard, Content } from '@/components/OptionCard';
import React from 'react'
import flexible from '@/../public/images/flexible.svg'
import toolbox from '@/../public/images/toolbox.svg'
import hospital from '@/../public/images/hospital.svg'
const contents: Content[] = [
    { title: "specialist_services:optionInstrumentsTitle", description: "specialist_services:optionInstrumentsDescription", href: "/specialist/services/instruments", image: toolbox},
    { title: "specialist_services:optionTemplatesTitle", description: "specialist_services:optionTemplatesDescription", href: "/specialist/services/templates", image: flexible},
    {
        title: "specialist_services:optionPageTitle",
        description: "specialist_services:optionPageDescription",
        href: "/specialist/services/page",
        image: hospital,
    },
]

const ServiceCards = () => {
    return (
        <>
            {contents.map((content, index) => (
                <OptionCard className='w-1/2' key={index} content={content} />
            ))}
        </>
    );
}

const ServicesPage = () => {
    return (
        <div className="flex justify-center w-full px-4 py-6 print:!p-0">
            <div className="flex flex-col justify-center items-center p-4 print:w-full">
                <div className='flex flex-col w-full print:items-center px-sidebar'>
                    <CardsTitle ns='specialist_services' />
                    <div className="flex flex-col items-center gap-6">
                        <ServiceCards />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ServicesPage