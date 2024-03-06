import React from 'react'

import ResultDataTable from './data-table'

import { columns } from './columns';
import { getAllForms, search } from '@/lib/firebase';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../pages/api/auth/[...nextauth]';
// import { differentiateKeysFromObjects } from '@/lib/utils';

const ResultsPage = async () => {
  const session: any = await getServerSession(authOptions);
  
  const data = await search({
    field: "specialist",
    value: session?.user.uid!,
    col: "evaluation",
    operation: '==',
  })

  // const myUser = await search({
  //   field: '__name__',
  //   value: data[0].users[0] as string,
  //   col: 'user',
  //   operation: '==',
  // })

  // console.log(myUser)

  // return null

  // console.log('data')
  // console.log(data)

  const formData = await Promise.all(data.map(async (form) => {
    const answered: Array<string> = [];
    const users = await Promise.all(form.users.map(async (userId) => {
      const user = await search({field: '__name__', value: userId, col: 'user', operation: '=='})

      if(form.answered !== undefined && form.answered.includes(userId)) {
        answered.push(`${user[0].name} ${user[0].surname}`)
      }

      return `${user[0].name} ${user[0].surname}`
    }))

    return {
      ...form,
      userNames: users.join(', '),
      answeredNames: answered.join(', ')
    }
    }))
  
  console.log(formData)

  return (
    <ResultDataTable columns={columns} data={formData} />
  )

  // const formData = formResult.map((userForms, userFormsIndex) => (
  //   userForms.map((form) => {
  //     differentiateKeysFromObjects(data[userFormsIndex], form, '_form');
  //     return {...form, ...data[userFormsIndex]}
  //   })
  // )).reduce((acc, val) => acc.concat(val), []);

  // // console.log(formData)

  // return (
  //     <ResultDataTable columns={columns} data={formData} />
  // )
}

export default ResultsPage