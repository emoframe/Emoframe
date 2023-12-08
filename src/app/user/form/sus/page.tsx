import SusForm from '@/components/form/SusForm';
import { authOptions } from '../../../../../pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth/next';

const SusPage = async () => {
  const session: any = await getServerSession(authOptions);

  return (
    <div className="container py-10 mx-auto">
        <SusForm userId={session?.user.uid!}/>
    </div>
  )
}

export default SusPage;

SusPage.requireAuth = true;