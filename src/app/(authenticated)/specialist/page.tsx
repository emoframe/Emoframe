import React from 'react';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../../pages/api/auth/[...nextauth]'; 
import { getSpecialtistDashboardInfo } from '@/lib/firebase';
import SpecialistDashboard from '@/components/SpecialistDashboard';

const SpecialistPage = async () => {
    const session = await getServerSession(authOptions);

    if (!session?.user?.uid) return null;

    const dashboardData = await getSpecialtistDashboardInfo(session.user.uid);

    
    
    return (
        <SpecialistDashboard 
            sessionUser={{
                name: session.user.name,
                email: session.user.email
            }}
            dashboardData={{
                userCount: dashboardData?.userCount || 0,
            }}
        />
    )
}

export default SpecialistPage;