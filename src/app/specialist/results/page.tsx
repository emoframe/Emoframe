import React from 'react'

import { getResults } from '@/lib/firebase';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../../pages/api/auth/[...nextauth]';
import ResultsDataTable from './data-table';
import { columns } from './columns';
import { Result } from '@/types/forms';

const Results = async () => {
  const session: any = await getServerSession(authOptions);

  const data: Result[] = await getResults(session?.user.uid!);

  console.dir(data, { depth: null });

  return (
    <div className="flex flex-1 flex-col gap-4 md:min-w-[50vw] lg:min-w-[70vw] md:min-h-[600px]">
      <h3 className='text-2xl font-semibold leading-none tracking-tight'>Busca de resultados</h3>
      <ResultsDataTable data={data} columns={columns}/>
    </div>
  );
};

export default Results;