import React from 'react'

import { search } from '@/lib/firebase';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../../../pages/api/auth/[...nextauth]';
import SetEvaluationForm from '@/components/form/SetEvaluationForm';
import { columns } from './columns';
import { DataTableProps, Template } from '@/types/forms';
import { User } from '@/types/users';
import { Filter } from '@/types/firebase';
import { convertTemplatesToOptions } from '@/lib/utils';

const EvaluationsForm = async () => {
  const session: any = await getServerSession(authOptions);

  const filter: Filter[] = [
    {
        field: "specialistId",
        operation: "==",
        value: session?.user.uid!
    }
  ];
  const data = await search("user", filter);

  const filters: Filter[] = [
    {
        field: "specialistId",
        operation: "==",
        value: session?.user.uid!
    },
    {
      field: "published",
      operation: "==",
      value: true
    }
  ];
  const publishedTemplates = await search("template", filters);
  const templateOptions = convertTemplatesToOptions(publishedTemplates as Template[]);
  
  const dataTable: DataTableProps<User, string> = {
    columns: columns,
    data: data
  }

  return (
    <SetEvaluationForm 
      specialistId={session?.user.uid!} 
      dataTable={dataTable} 
      templates={templateOptions}
    />
  );
};

export default EvaluationsForm;