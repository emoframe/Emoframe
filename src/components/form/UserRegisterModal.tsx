"use client"

import React, { useState } from 'react'
import { Plus, X } from 'lucide-react'
import { useRouter } from 'next/navigation' 
import SignUpForm from '@/components/form/SignUpUserForm'
import { useTranslation } from 'react-i18next'

interface UserRegisterModalProps {
  specialistId: string | null;
}

const UserRegisterModal = ({ specialistId }: UserRegisterModalProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const {t} = useTranslation('specialist_users_view')
  

  const handleSuccess = () => {
    setIsModalOpen(false);
    router.refresh(); 

  };

  const isDisabled = !specialistId;

  return (
    <>
      <button 
        onClick={() => setIsModalOpen(true)}
        disabled={isDisabled}
        className='flex px-4 py-2 bg-primary rounded-md items-center justify-center hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
      >
        <Plus color='white' className="mr-2" size={20} />
        <p className='text-white font-medium'>{t('registerLabel')}</p>
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl h-[90vh] flex flex-col relative overflow-hidden animate-in fade-in zoom-in duration-200">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10 p-1 bg-white/50 rounded-full"
            >
              <X size={24} />
            </button>
            <div className="p-6 h-full overflow-hidden">
               {specialistId && (
                  <SignUpForm 
                    specialistId={specialistId} 
                    onSuccess={handleSuccess}
                  />
               )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default UserRegisterModal;