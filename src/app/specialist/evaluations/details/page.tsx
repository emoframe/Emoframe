import React from 'react'

import { columns } from './columns';
import EvaluationsDetailsDataTable from './data-table';
import { useEvaluationStore } from '@/store/evaluationStore';
import { getById } from '@/lib/firebase';

const Details = async () => {
  const ids = useEvaluationStore.getState().selected?.users;
  const data = await getById(ids as string[], "users");
  
  return (
    <EvaluationsDetailsDataTable columns={columns} data={data}/>
  );
};

export default Details;