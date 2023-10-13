'use client';

import React, { useEffect, useState } from 'react'

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

import UserDataTable from './data-table';
import { columns } from "./columns";
import { search } from '@/lib/firebase';

const SpecialistPage = () => {
  const { data: session, status } = useSession();
  const uid = session?.user.uid!;
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await search("specialistId", uid, "user");
      if(data) setData(data);
      console.log(session?.user.uid!);
      console.log(data);
    }
  
    if(uid) fetchData().catch(console.error);
  }, [status, uid]);

  if (status === "loading" || !data) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <div className="container py-10 mx-auto">
        <UserDataTable columns={columns} data={data} />
      </div>
    </div>
  )
}

export default SpecialistPage

SpecialistPage.requireAuth = true;