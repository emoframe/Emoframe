import React from 'react'

import { getResults } from '@/lib/firebase';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../../pages/api/auth/[...nextauth]';
import ResultsDataTable from './data-table';
import { columns } from './columns';
import { Result } from '@/types/forms';
import CardsTitle from '@/components/CardsTitle';

const Results = async () => {
  const session: any = await getServerSession(authOptions);

  const data: Result[] = await getResults(session?.user.uid!);

  console.dir(data, { depth: null });

  return (
    <div className="w-full flex flex-col">
      <CardsTitle ns='specialist_results'/>
      <ResultsDataTable data={data} columns={columns}/>
    </div>
  );
};

export default Results;