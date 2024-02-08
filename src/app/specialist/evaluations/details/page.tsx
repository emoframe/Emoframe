import React from 'react'

import { columns } from './columns';
import EvaluationsDetailsDataTable from './data-table';
import { cookies } from 'next/headers'
import { getById } from '@/lib/firebase';
import { appRedirect } from '@/lib/actions';

const Details = async () => {

  let data = []

  try{ 
    const users: string[] = JSON.parse(cookies().get('evaluationUsers')?.value as string);
    data = await getById(users, "user");
  } catch(error) { 
    await appRedirect('/specialist/evaluations');
  }

  return (
    <EvaluationsDetailsDataTable columns={columns} data={data}/>
  );
};

export default Details;