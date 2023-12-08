import BrumsForm from '@/components/form/BrumsForm';
import { authOptions } from '../../../../../pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth/next';

const BrumsPage = async () => {
  const session: any = await getServerSession(authOptions);

  return (
    <div className="container py-10 mx-auto">
        <BrumsForm userId={session?.user.uid!}/>
    </div>
  )
}

export default BrumsPage;

BrumsPage.requireAuth = true;