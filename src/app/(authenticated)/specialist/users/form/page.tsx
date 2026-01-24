import SignUpForm from '@/components/form/SignUpUserForm';

import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../../../../pages/api/auth/[...nextauth]';

const SpecialistForm = async () => {
  const session: any = await getServerSession(authOptions);
  
  return (
    <div className='flex-1 flex justify-center w-full px-4 py-6 print:!p-0'>
      <SignUpForm specialistId={session?.user.uid!}/>

    </div>
  );
};

export default SpecialistForm;