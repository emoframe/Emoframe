import React from 'react';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../pages/api/auth/[...nextauth]';
import { getSpecialtistDashboardInfo } from '@/lib/firebase';
import SpecialistDashboard from '@/components/SpecialistDashboard';
import VideosTutorials from '@/components/VideoTutorials';
import LatestPublications from '@/components/LatestPublications';

const SpecialistPage = async () => {
    const session: any = await getServerSession(authOptions);

    const dashboardData = await getSpecialtistDashboardInfo(session?.user.uid!);
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Boas vindas, {session?.user.name}</h1>
            <SpecialistDashboard
                lastEvaluations={dashboardData.lastEvaluations}
                lastResults={dashboardData.lastResults}
                userCount={dashboardData.userCount}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <VideosTutorials thumbnail='' title='Saiba como criar uma nova avaliação' />
                <LatestPublications />
            </div>
            <div className="bg-background p-6 rounded-lg shadow-lg mt-6">
                <h2 className="text-lg font-bold mb-4">O que é o EMOFRAME?</h2>
                <p className="text-sm">
                    O EmoFrame é uma plataforma digital integrada que auxilia na avaliação de produtos, combinando ferramentas de diferentes áreas para selecionar o método de avaliação ideal, especialmente no campo da Interação Humano-Computador.
                </p>
            </div>
        </div>
    )
}

export default SpecialistPage;