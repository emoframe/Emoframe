import SignUpForm from '@/components/form/SignUpUserForm';
import { search } from '@/lib/firebase';

import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../../pages/api/auth/[...nextauth]';
import { Search } from '@/types/firebase';

const SpecialistForm = async () => {
  const session: any = await getServerSession(authOptions);
  const parameters: Search = {
    col: "user", 
    field: "specialistId", 
    operation: "==", 
    value: session?.user.uid!
  };
  const data = await search(parameters);
  
  return (
    <SignUpForm specialistId={data}/>
  );
};

export default SpecialistForm;