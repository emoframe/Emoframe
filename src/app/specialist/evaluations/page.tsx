import React from 'react'

import { search } from '@/lib/firebase';

import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../../pages/api/auth/[...nextauth]';
import SetEvaluationForm from '@/components/form/SetEvaluationForm';

const EvaluationsForm = async () => {
  const session: any = await getServerSession(authOptions);
  const data = await search("specialistId", session?.user.uid!, "user");
  
  return (
        <SetEvaluationForm specialistId={session?.user.uid!}/>
  );
};

export default EvaluationsForm;