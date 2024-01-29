import React from 'react'

import { search } from '@/lib/firebase';

import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../../pages/api/auth/[...nextauth]';

const EvaluationsForm = async () => {
  const session: any = await getServerSession(authOptions);
  const data = await search("specialistId", session?.user.uid!, "user");
  
  return (
    
  );
};

export default EvaluationsForm;