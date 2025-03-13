import PageService from '@/components/form/PageService';

import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../../../pages/api/auth/[...nextauth]';

const Page = async () => {
  const session: any = await getServerSession(authOptions);
  
  return (
    <PageService specialistId={session?.user.uid!}/>
  );
};

export default Page;