import React from 'react'
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../../../pages/api/auth/[...nextauth]';
import { getById } from '@/lib/firebase';
import { appRedirect } from '@/lib/actions';
import PanasForm from '@/components/form/instrument/PanasForm';
import SamForm from '@/components/form/instrument/SamForm';
import SusForm from '@/components/form/instrument/SusForm';
import EazForm from '@/components/form/instrument/EazForm';

const FillEvaluation = async ({
	searchParams,
}: {
	searchParams: { [key: string]: string | string[] | undefined };
}) => {

  const session: any = await getServerSession(authOptions);

  const instruments = [
    {
      value: "panas",
      component: <PanasForm userId={session?.user?.uid! as string} evaluationId={searchParams.evaluation as string}/>
    },
    {
      value: "sam",
      component: <SamForm userId={session?.user?.uid! as string} evaluationId={searchParams.evaluation as string}/>
    },
    {
      value: "sus",
      component: <SusForm userId={session?.user?.uid! as string} evaluationId={searchParams.evaluation as string}/>
    },
    {
      value: "eaz",
      component: <EazForm userId={session?.user?.uid! as string} evaluationId={searchParams.evaluation as string}/>
    }
  ]

  let evaluation, answer;

  const ConditionalRendering = () => {
    return (evaluation.users.includes(session?.user?.uid!) && (evaluation.date == new Date().toLocaleDateString('pt-BR')) && !answer) ?
      instruments.find((i) => i.value === evaluation?.instrument)?.component :
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