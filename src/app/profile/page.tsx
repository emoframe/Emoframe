import React from 'react'
import ProfileCard from './profile-card';
import { getById } from '@/lib/firebase';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../pages/api/auth/[...nextauth]';

const Profile = async () => {
    const session: any = await getServerSession(authOptions);
    const data = await getById(session?.user?.uid!, "user");

    return (
        <ProfileCard data={data}/>
    )
}

export default Profile;