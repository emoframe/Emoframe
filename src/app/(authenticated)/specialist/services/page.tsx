import CardsTitle from '@/components/CardsTitle';
import { OptionCard, Content } from '@/components/OptionCard';
import React from 'react'
import flexible from '@/../public/images/flexible.svg'
import toolbox from '@/../public/images/toolbox.svg'
import pen from '@/../public/images/pen-tool.svg'
import compass from '@/../public/images/compass.svg'
import file from '@/../public/images/file-text.svg'

const contents: Content[] = [
    { title: "specialist_services:optionInstrumentsTitle", description: "specialist_services:optionInstrumentsDescription", href: "/specialist/services/instruments", image: toolbox},
    { title: "specialist_services:optionTemplatesTitle", description: "specialist_services:optionTemplatesDescription", href: "/specialist/services/templates", image: flexible},
    {
        title: "specialist_services:optionRecomendationTitle",
        description: "specialist_services:optionRecomendationDescription",
        href: "/specialist/services/page",
        image: compass,
    },
    {
        title: "specialist_services:optionUxTitle",
        description: "specialist_services:optionUxDescription",
        href: "/specialist/services/page",
        image: pen,
    },
    {
        title: "Diretrizes",
        description: "Diretrizes dos instrumentos",
        href: "/specialist/services/guidelines",
        image: file,
    },
    
]

const ServiceCards = () => {
    return (
        <div className="w-full max-w-4xl flex flex-col gap-6">
            {contents.map((content, index) => (
                <OptionCard className='w-full' key={index} content={content} />
            ))}
        </div>
    );
}

const ServicesPage = () => {
    return (
        <div className="flex justify-center w-full min-h-[calc(100vh-80px)] px-4 py-8 print:!p-0">
            
            <div className="flex flex-col w-full max-w-screen-xl items-center p-4 print:w-full">
                
                        <div className='flex flex-col w-full print:items-center px-sidebar gap-8'>
                    <CardsTitle ns='specialist_services' />
                    <div className="flex flex-col items-center w-full">
                        <ServiceCards />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ServicesPage
