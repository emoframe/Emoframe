import React from 'react'

import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../../pages/api/auth/[...nextauth]';

import UserDataTable from './data-table';
import { columns } from "./columns";
import { search } from '@/lib/firebase';

const Users = async () => {
  const session: any = await getServerSession(authOptions);
  const data = await search("user", "specialistId", session?.user.uid!);

  return (
    <UserDataTable columns={columns} data={data} />
  )
}

export default Users;