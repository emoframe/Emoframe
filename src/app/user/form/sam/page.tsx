import SamForm from '@/components/form/SamForm';
import { authOptions } from '../../../../../pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth/next';

const SamPage = async () => {
  const session: any = await getServerSession(authOptions);

  return (
    <div className="container py-10 mx-auto">
        <SamForm userId={session?.user.uid!}/>
    </div>
  )
}

export default SamPage;

SamPage.requireAuth = true;