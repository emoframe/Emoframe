import React from 'react'

import { columns } from './columns';
import EvaluationsDetailsDataTable from './data-table';
import { cookies } from 'next/headers'
import { getById } from '@/lib/firebase';

const Details = async () => {
  
  const users: string[] = JSON.parse(cookies().get('evaluationUsers')?.value as string);
  const data = await getById(users, "user");
  
  return (
    <EvaluationsDetailsDataTable columns={columns} data={data}/>
  );
};

export default Details;