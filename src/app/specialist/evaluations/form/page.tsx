import React from 'react'

import { search } from '@/lib/firebase';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../../../pages/api/auth/[...nextauth]';
import SetEvaluationForm from '@/components/form/SetEvaluationForm';
import { columns } from './columns';
import { DataTableProps } from '@/types/forms';
import { User } from '@/types/users';
import { Search } from '@/types/firebase';


const EvaluationsForm = async () => {
  const session: any = await getServerSession(authOptions);
  const parameters: Search = {
    col: "user", 
    field: "specialistId", 
    operation: "==", 
    value: session?.user.uid!
  };
  const data = await search(parameters);
  
  const dataTable: DataTableProps<User, string> = {
    columns: columns,
    data: data
  }

  return (
    <SetEvaluationForm specialistId={session?.user.uid!} dataTable={dataTable}/>
  );
};

export default EvaluationsForm;