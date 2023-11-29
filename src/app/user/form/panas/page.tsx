import PanasForm from '@/components/form/PanasForm';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../../../pages/api/auth/[...nextauth]';

const PanasPage = async () => {
  const session: any = await getServerSession(authOptions);

  return (
    <div className="container py-10 mx-auto">
        <PanasForm userId={session?.user.uid!}/>
    </div>
  )
}

export default PanasPage;

PanasPage.requireAuth = true;