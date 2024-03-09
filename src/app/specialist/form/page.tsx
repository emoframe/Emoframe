import SignUpForm from '@/components/form/SignUpUserForm';

import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../../pages/api/auth/[...nextauth]';

const SpecialistForm = async () => {
  const session: any = await getServerSession(authOptions);
  
  return (
    <SignUpForm specialistId={session?.user.uid!}/>
  );
};

export default SpecialistForm;