import React from 'react'

import { search } from '@/lib/firebase';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../../pages/api/auth/[...nextauth]';
import EvaluationsDataTable from './data-table';
import { columns } from './columns';
import { Search } from '@/types/firebase';

const Evaluations = async () => {
  const session: any = await getServerSession(authOptions);
  const parameters: Search = {
    col: "evaluation", 
    field: "users", 
    operation: "array-contains", 
    value: session?.user.uid!
  };
  const data = await search(parameters);

  return (
    <EvaluationsDataTable data={data} columns={columns}/>
  );
};

export default Evaluations;