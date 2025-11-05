import React from 'react'
import ProfileCard from './profile-card';
import { getById } from '@/lib/firebase';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../../pages/api/auth/[...nextauth]';

const Profile = async () => {
    const session: any = await getServerSession(authOptions);
    const data = await getById(session?.user?.uid!, "user");

    return (
        <div className='flex flex-1 min-h-screen items-center justify-center'>
            <ProfileCard data={data} className="m-5"/>
        </div>
    )
}

export default Profile;