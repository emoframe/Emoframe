import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../../../pages/api/auth/[...nextauth]';
import SetTemplateForm from '@/components/form/template/SetTemplateForm';
import React from 'react'

const TemplatesPage = async () => {
  const session: any = await getServerSession(authOptions);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <SetTemplateForm specialistId={session?.user.uid!}/>
    </div>
  )
}

export default TemplatesPage