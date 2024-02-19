import React from 'react'
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../../../pages/api/auth/[...nextauth]';
import { getById } from '@/lib/firebase';
import { appRedirect } from '@/lib/actions';
import PanasForm from '@/components/form/instrument/PanasForm';
import SamForm from '@/components/form/instrument/SamForm';

const FillEvaluation = async ({
	searchParams,
}: {
	searchParams: { [key: string]: string | string[] | undefined };
}) => {

  const session: any = await getServerSession(authOptions);

  const instruments = [
    {
      id: "Panas",
      component: <PanasForm userId={session?.user?.uid! as string} evaluationId={searchParams.evaluation as string}/>
    },
    {
      id: "Sam",
      component: <SamForm userId={session?.user?.uid! as string} evaluationId={searchParams.evaluation as string}/>
    }
  ]

  let evaluation, answer;

  const ConditionalRendering = () => {
    return (evaluation.users.includes(session?.user?.uid!) && (evaluation.date == new Date().toLocaleDateString('pt-BR')) && !answer) ?
      instruments.find((i) => i.id === evaluation?.instrument)?.component :
      null
  }
  
  try {
    evaluation = await getById(searchParams.evaluation as string, "evaluation");

    (!evaluation || (evaluation.answered && evaluation?.answered.includes(session?.user.uid!))) 
    && await appRedirect('/denied');

  } catch(error) {
    await appRedirect('/denied');
  }

  return (
    <ConditionalRendering/>
  );
};

export default FillEvaluation;