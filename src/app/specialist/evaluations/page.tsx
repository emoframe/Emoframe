import React from 'react'
import { OptionCard } from '@/components/OptionCard';

const Evaluations = async () => {
    return (
        <>
            <h1 className="text-2xl font-bold mb-6">Avaliações</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <OptionCard content={{title: 'Ver Avaliações', description: '', href: '/specialist/evaluations/list'}} />
                <OptionCard content={{title: 'Criar Nova Avaliação', description: '', href: '/specialist/evaluations/form'}} />
            </div>
        </>
    )
};

export default Evaluations;