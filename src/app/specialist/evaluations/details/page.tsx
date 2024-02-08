import React from 'react'

import { columns } from './columns';
import EvaluationsDetailsDataTable from './data-table';
import { useEvaluationStore } from '@/store/evaluationStore';
import { getById } from '@/lib/firebase';

const Details = async () => {
  const data = await getById(useEvaluationStore.getState().selected?.users as string[], "users");
  
  return (
    <EvaluationsDetailsDataTable columns={columns} data={data}/>
  );
};

export default Details;