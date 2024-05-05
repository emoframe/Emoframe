import React from 'react'

import { search } from '@/lib/firebase';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../../pages/api/auth/[...nextauth]';
import EvaluationsDataTable from './data-table';
import { columns } from './columns';
import { Filter } from '@/types/firebase';

const Evaluations = async () => {
  const session: any = await getServerSession(authOptions);

  const filter: Filter[] = [
    {
        field: "specialist",
        operation: "==",
        value: session?.user.uid!
    }
  ];

  const data = await search("evaluation", filter);

  return (
    <EvaluationsDataTable data={data} columns={columns}/>
  );
};

export default Evaluations;