import React from 'react';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../pages/api/auth/[...nextauth]';
import { getSpecialtistDashboardInfo } from '@/lib/firebase';
import SpecialistDashboard from '@/components/SpecialistDashboard';
import VideosTutorials from '@/components/VideoTutorials';
import LatestPublications from '@/components/LatestPublications';
import Welcome from '@/components/Welcome';
import WhatIs from '@/components/WhatIs';

const SpecialistPage = async () => {
    const session: any = await getServerSession(authOptions);

    const dashboardData = await getSpecialtistDashboardInfo(session?.user.uid!);

    
    return (
        <div className="max-w-[1400px] mx-auto">
            <Welcome name={session?.user.name}/>
            <SpecialistDashboard
                lastEvaluations={dashboardData.lastEvaluations}
                lastResults={dashboardData.lastResults}
                userCount={dashboardData.userCount}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <VideosTutorials thumbnail='' ns='specialist' />
                <LatestPublications />
            </div>
            <WhatIs/>
        </div>
    )
}

export default SpecialistPage;