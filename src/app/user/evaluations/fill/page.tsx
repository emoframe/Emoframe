import React from 'react'
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../../../pages/api/auth/[...nextauth]';
import { getById } from '@/lib/firebase';
import { appRedirect } from '@/lib/actions';
import PanasForm from '@/components/form/instrument/PanasForm';

const FillEvaluation = async ({
	searchParams,
}: {
	searchParams: { [key: string]: string | string[] | undefined };
}) => {

  const session: any = await getServerSession(authOptions);

  const instruments = [{
    id: "Panas",
    component: <PanasForm userId={session?.user?.uid! as string} evaluationId={searchParams.evaluation as string}/>
  }]

  let evaluation, answer;

  const ConditionalRendering = () => {
    return (evaluation?.users.find(session?.user?.uid!) && (new Date(evaluation?.date) >= new Date()) && !answer) ?
      instruments.find((i) => i.id === evaluation?.instrument)?.component :
      null
  }
  
  try {
    evaluation = await getById("evaluation", searchParams.evaluation as string);
    answer = await getById(`evaluation/${searchParams.evaluation}/answers`, session?.user?.uid! as string);  
  } catch(error) {
    await appRedirect('/denied');
  }

  return (
    <ConditionalRendering/>
  );
};

export default FillEvaluation;