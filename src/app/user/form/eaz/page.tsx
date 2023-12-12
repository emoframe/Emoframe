import EazForm from '@/components/form/EazForm';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../../../pages/api/auth/[...nextauth]';

const EazPage = async () => {
  const session: any = await getServerSession(authOptions);

  return (
    <div className="container py-10 mx-auto">
        <EazForm userId={session?.user.uid!}/>
    </div>
  )
}

export default EazPage;

EazPage.requireAuth = true;