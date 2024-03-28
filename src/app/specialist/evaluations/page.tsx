import React from 'react'

import { search } from '@/lib/firebase';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../../pages/api/auth/[...nextauth]';
import EvaluationsDataTable from './data-table';
import { columns } from './columns';

const Evaluations = async () => {
  const session: any = await getServerSession(authOptions);
  const data = await search("evaluation", "specialist", "==", session?.user.uid!);

  return (
    <EvaluationsDataTable data={data} columns={columns}/>
  );
};

export default Evaluations;