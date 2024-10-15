import { OptionCard, Content } from '@/components/OptionCard';
import React from 'react'

const contents: Content[] = [
    { title: "Instrumentos de autorrelato", description: "São métodos de avaliação em que os próprios usuários fornecem informações sobre suas experiências, emoções ou opiniões. Eles são úteis para captar percepções subjetivas durante o uso de um produto ou sistema.", href: "/specialist/services/instruments" },
    { title: "Templates flexíveis", description: "Modelos personalizáveis para criar avaliações de forma simples e rápida. Com opções de diferencial semântico e escala Likert, você pode montar formulários ou escalas usando um sistema intuitivo de arrastar e soltar.", href: "/specialist/services/templates" },
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
            <h1 className="text-2xl font-bold mb-6">Serviços Disponíveis</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ServiceCards />
            </div>
        </>
    )
}

export default ServicesPage