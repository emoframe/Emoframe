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
      <h1 className="text-2xl font-bold mb-6">Boas vindas, {session?.user.name}!</h1>
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
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tempus justo justo, non semper eros finibus non. In id nisi sed turpis facilisis commodo ut nec lacus. In lobortis justo massa, at tempus dolor hendrerit ac. Ut commodo condimentum commodo. Morbi quis pharetra enim. Aenean nec vehicula risus. Nulla sollicitudin, metus et convallis ornare, ligula libero porttitor diam, vel ultrices ipsum mauris eget massa.
        </p>
      </div>
    </div>
  )
}

export default SpecialistPage;