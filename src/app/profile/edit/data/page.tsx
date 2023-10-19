import React from 'react'
import { getById } from '@/lib/firebase';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../../../pages/api/auth/[...nextauth]';

const Data = async () => {
    const session: any = await getServerSession(authOptions);
    const data = await getById(session?.user?.uid!, "user");

    return (
        <p>Teste</p>
    )
}

export default Data;