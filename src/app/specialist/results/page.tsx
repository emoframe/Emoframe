import React from 'react'

import ResultDataTable from './data-table'

import { columns } from './columns';
import { search } from '@/lib/firebase';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../pages/api/auth/[...nextauth]';
import { differentiateKeysFromObjects } from '@/lib/utils';
import { getById } from '@/lib/firebase';

const ResultsPage = async () => {
  const session: any = await getServerSession(authOptions);
  const evaluations: any = await search({
    field: 'specialist',
    operation: '==',
    value: session?.user.uid!,
    col: 'evaluation'
  });


  const formData: any[] = [];

  for(const evaluation of evaluations) {
    const curData = evaluation.answered?.map(async (uid) => {
      const user = (await search({
        field: '__name__',
        operation: '==',
        value: uid,
        col: 'user'
      }))[0]

      return {...evaluation, answered: uid, fullName: `${user.name} ${user.surname}`, birthday: user.birthday}
    })

    if(curData !== undefined) {
      await Promise.all(curData).then(data => {
        formData.push(data[0])
      })
    }  
  }

  console.log(formData)

  return (
      <ResultDataTable columns={columns} data={formData} />
  )

}

export default ResultsPage