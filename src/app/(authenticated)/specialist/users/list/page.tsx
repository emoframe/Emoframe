import React from 'react'
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../../../../pages/api/auth/[...nextauth]';
import UserDataTable from './data-table';
import { columns } from "./columns";
import { search } from '@/lib/firebase';
import { Filter } from '@/types/firebase';

const Users = async () => {
  const session: any = await getServerSession(authOptions);
  
  const filter: Filter[] = [
    {
        field: "specialistId",
        operation: "==",
        value: session?.user.uid!
    }
  ];
  const data = await search("user", filter);

  return (
    <div className="flex justify-center w-full px-4 py-6 print:!p-0">
      <UserDataTable columns={columns} data={data} />
    </div>
  )
}

export default Users;