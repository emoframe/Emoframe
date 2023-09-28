'use client';

import SignUpForm from '@/components/form/SignUpUserForm';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

const SpecialistForm = () => {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/');
    },
  });
  
  return (
    <div className='flex flex-col w-full'>
      <SignUpForm specialistId={session?.user.uid!}/>
    </div>
  );
};

export default SpecialistForm;

SpecialistForm.requireAuth = true
