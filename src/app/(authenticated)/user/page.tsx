import React from "react";
import { getUserDashboardInfo, search } from "@/lib/firebase";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../../pages/api/auth/[...nextauth]";
import UserDashboard from "@/components/UserDashboard";
import FrequentQuestions from '@/components/FrequentQuestions';
import VideosTutorials from "@/components/VideoTutorials";
import Welcome from "@/components/Welcome";
import WhatIs from "@/components/WhatIs";



const User = async () => {
    const session: any = await getServerSession(authOptions);

    const dashboardData = await getUserDashboardInfo(session?.user.uid!);
    return (
        <div className="max-w-[1400px] mx-auto">
            <Welcome name={session?.user.name}/>
            <UserDashboard
                pendingEvaluations={dashboardData.pendingEvaluations}
                availableResults={dashboardData.availableResults}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <VideosTutorials thumbnail="" ns="user" />
                <FrequentQuestions />
            </div>
            <WhatIs/>
        </div>
    )
}

export default User;
