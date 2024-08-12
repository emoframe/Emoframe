import React from 'react';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../pages/api/auth/[...nextauth]';
import { getSpecialtistDashboardInfo } from '@/lib/firebase';
import SpecialistDashboard from '@/components/SpecialistDashboard';

const SpecialistPage = async () => {
  const session: any = await getServerSession(authOptions);

  const dashboardData = await getSpecialtistDashboardInfo(session?.user.uid!);
  return (
    <SpecialistDashboard 
      lastEvaluations={dashboardData.lastEvaluations}
      lastResults={dashboardData.lastResults}
      userCount={dashboardData.userCount}
    />
  )
}

export default SpecialistPage;