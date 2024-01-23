import SignUpForm from '@/components/form/SignUpUserForm';
import { search } from '@/lib/firebase';

import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../../pages/api/auth/[...nextauth]';

const SpecialistForm = async () => {
  const session: any = await getServerSession(authOptions);
  const data = await search("specialistId", session?.user.uid!, "user");
  
  return (
    <SignUpForm specialistId={data}/>
  );
};

export default SpecialistForm;