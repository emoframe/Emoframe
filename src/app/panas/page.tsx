import PanasForm from '@/components/form/PanasForm';
import { authOptions } from '../../../pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth/next';

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