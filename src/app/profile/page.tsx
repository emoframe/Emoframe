import React from 'react';
import ProfileCardServer from './profile-card-server';
import { getById } from '@/lib/firebase';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../pages/api/auth/[...nextauth]';

const Profile = async () => {
    const session = await getServerSession(authOptions);
    const data = await getById(session?.user?.uid, "user");

    return (
        <ProfileCardServer data={data} className={undefined} />
    );
};

export default Profile;
