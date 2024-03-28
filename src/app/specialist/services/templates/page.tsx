import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../../../pages/api/auth/[...nextauth]';
import SetTemplateForm from '@/components/form/template/SetTemplateForm';
import React from 'react'
import { OptionCard, Content } from '@/components/OptionCard';
import { search } from '@/lib/firebase';

const TemplatesCards = async () => {
  const session: any = await getServerSession(authOptions);
  const data = await search("template", "specialist", "==", session?.user.uid!);

  const transformedContent: Content[] = data.map(template => ({
    title: template.title,
    description: template.description || '', // String vazia se desciption for undefined
    href: `/specialist/services/templates/builder/${template.uid}`
  }));
  
  return (
    <>
      {transformedContent.map((content, index) => (
        <OptionCard key={index} content={content} />
      ))}
    </>
  );
}

const TemplatesPage = async () => {
  const session: any = await getServerSession(authOptions);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <SetTemplateForm specialistId={session?.user.uid!}/>
      <TemplatesCards/>
    </div>
  )
}

export default TemplatesPage