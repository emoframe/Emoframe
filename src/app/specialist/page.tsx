import React from 'react'

import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../pages/api/auth/[...nextauth]';

import UserDataTable from './data-table';
import { columns } from "./columns";
import { search } from '@/lib/firebase';

const SpecialistPage = async () => {
  const session: any = await getServerSession(authOptions);
  const data = await search("specialistId", session?.user.uid!, "user");

  console.log("Data:", data);

  return (
    <UserDataTable columns={columns} data={data} />
  )
}

export default SpecialistPage

SpecialistPage.requireAuth = true;