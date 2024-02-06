import React from 'react'

import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../../pages/api/auth/[...nextauth]';

import UserDataTable from './data-table';
import { columns } from "./columns";
import { search } from '@/lib/firebase';
import { Search } from '@/types/firebase';

const Users = async () => {
  const session: any = await getServerSession(authOptions);
  const parameters: Search = {
    col: "user", 
    field: "specialistId", 
    operation: "==", 
    value: session?.user.uid!
  };
  const data = await search(parameters);

  return (
    <UserDataTable columns={columns} data={data} />
  )
}

export default Users;