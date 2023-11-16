import React from 'react'
import { getById } from '@/lib/firebase';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../../../pages/api/auth/[...nextauth]';
import EditSpecialistDataForm from '@/components/form/EditSpecialistDataForm';
import EditUserDataForm from '@/components/form/EditUserDataForm';  

const Data = async () => {
    const session: any = await getServerSession(authOptions);
    const data = await getById(session?.user?.uid!, "user");

    return (
        <>
            {
                (data.type == 'specialist') ?
                    <EditSpecialistDataForm data={data} /> :
                    <EditUserDataForm data={data}/>
            }
        </>
    )
}

export default Data;