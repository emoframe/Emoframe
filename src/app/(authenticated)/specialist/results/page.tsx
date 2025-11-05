import React from 'react'

import { getResults } from '@/lib/firebase';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../../../pages/api/auth/[...nextauth]';
import ResultsDataTable from './data-table';
import { columns } from './columns';
import { Result } from '@/types/forms';
import CardsTitle from '@/components/CardsTitle';

const Results = async () => {
  const session: any = await getServerSession(authOptions);

  const data: Result[] = await getResults(session?.user.uid!);

  console.dir(data, { depth: null });

  return (
    <div className="flex justify-center w-full px-4 py-6 print:!p-0">
      <div className="flex flex-col justify-center items-center bg-primary-background p-4 rounded-md shadow print:w-full">
        <div className='flex flex-col w-full print:items-center'>
          <div className="w-full flex flex-col">
            <CardsTitle ns='specialist_results' />
            <ResultsDataTable data={data} columns={columns} />
          </div>
        </div>
      </div>
    </div>

  );
};

export default Results;