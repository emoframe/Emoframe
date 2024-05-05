import React from 'react'
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../../../pages/api/auth/[...nextauth]';
import { OptionCard, Content } from '@/components/OptionCard';
import { search } from '@/lib/firebase';
import SetTemplateButton from '@/components/template/SetTemplateButton';
import { Filter } from '@/types/firebase';

const TemplatesCards = async () => {
  const session: any = await getServerSession(authOptions);

  const filter: Filter[] = [
    {
        field: "specialistId",
        operation: "==",
        value: session?.user.uid!
    }
  ];
  const data = await search("template", filter);

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
      <SetTemplateButton specialistId={session?.user.uid!}/>
      <TemplatesCards/>
    </div>
  )
}

export default TemplatesPage