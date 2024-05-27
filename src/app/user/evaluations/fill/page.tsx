import React from 'react';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../../../pages/api/auth/[...nextauth]';
import { getById } from '@/lib/firebase';
import { appRedirect } from '@/lib/actions';
import PanasForm from '@/components/form/instrument/PanasForm';
import SamForm from '@/components/form/instrument/SamForm';
import SusForm from '@/components/form/instrument/SusForm';
import EazForm from '@/components/form/instrument/EazForm';
import BrumsForm from '@/components/form/instrument/BrumsForm';
import GdsForm from '@/components/form/instrument/GdsForm';
import LeapForm from '@/components/form/instrument/LeapForm';
import TemplateForm from '@/components/form/instrument/TemplateForm';
import { Evaluation, RenderComponentProps, Template } from '@/types/forms';
import { isSameDay } from '@/lib/utils';

const RenderComponent = ({ instrument, userId, evaluationId, identification, template }: RenderComponentProps) => {
  const commonProps = { userId, evaluationId };

  switch (instrument) {
    case "panas":
      return <PanasForm {...commonProps} />;
    case "sam":
      return <SamForm {...commonProps} />;
    case "sus":
      return <SusForm {...commonProps} identification={identification} />;
    case "eaz":
      return <EazForm {...commonProps} />;
    case "brums":
      return <BrumsForm {...commonProps} />;
    case "gds":
      return <GdsForm {...commonProps} />;
    case "leap":
      return <LeapForm {...commonProps} />;
    case "template":
      if (template) {
        return <TemplateForm {...commonProps} content={template} />;
      }
      console.error('Os dados do template são necessários para o instrumento.');
      return <div>Template é obrigatório.</div>;
    default:
      return <div>Instrumento não suportado</div>;
  }
};

const FillEvaluation = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {

  const session = await getServerSession(authOptions);

  if (!searchParams.evaluation || typeof searchParams.evaluation !== 'string') {
    await appRedirect('/denied');
    return null;
  }

  let evaluation: Evaluation;
  let template: Template | null = null; // Initialize to null

  try {
    evaluation = await getById(searchParams.evaluation, "evaluation");

    if (!evaluation || evaluation.answered?.includes(session.user.uid)) {
      await appRedirect('/denied');
      return null;
    }

    if (evaluation.instrument === "template" && evaluation.templateId) {
      template = await getById(evaluation.templateId, "template");
    }
  } catch (error) {
    console.error('Error fetching evaluation:', error);
    await appRedirect('/denied');
    return null;
  }

  if (!evaluation.users.includes(session.user.uid) || 
  !isSameDay(new Date(evaluation.date), new Date()) || 
  (evaluation.instrument === "template" && !template)) {
    await appRedirect('/denied');
    return null;
  }

  return (
    <RenderComponent 
      instrument={evaluation?.instrument} 
      userId={session?.user?.uid! as string}
      evaluationId={searchParams.evaluation as string}
      identification={evaluation.identification}
      template={template?.questions ? Object.values(template?.questions) : []}
    />
  );
};

export default FillEvaluation;