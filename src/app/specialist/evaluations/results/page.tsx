import React from 'react'
import { columns } from './columns';
import EvaluationsAnswersDataTable from './data-table';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../../../pages/api/auth/[...nextauth]';
import { getById } from '@/lib/firebase';
import { appRedirect } from '@/lib/actions';
import { Evaluation } from '@/types/forms';


const Results = async ({
	searchParams,
}: {
	searchParams: { [key: string]: string | string[] | undefined };
}) => {

  const session: any = await getServerSession(authOptions);
  let data = []
  let evaluation: Evaluation;

  try{
    evaluation = await getById(searchParams.evaluation as string, "evaluation");
    
    evaluation.answered ? data = await getById(evaluation.answered as string[], "user") : null;

    if (evaluation.specialist !== session?.user?.uid) {
      throw new Error("A evaluation não pertence a este specialist");
    }
  } catch(error) { 
    await appRedirect('/specialist/evaluations');
  }

  return (
    <div className="flex flex-1 flex-col gap-4 md:min-w-[50vw] lg:min-w-[70vw] md:min-h-[600px]">
      <h3 className='text-2xl font-semibold leading-none tracking-tight'>Usuários que responderam</h3>
      <EvaluationsAnswersDataTable columns={columns} data={data}/>
    </div>
  );
};

export default Results;