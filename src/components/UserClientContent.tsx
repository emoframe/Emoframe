"use client"

import React, { useState } from 'react'
import { Calendar, CheckCircle, FileText, Mail, MoreHorizontal, Search, User, UsersIcon } from 'lucide-react';
import Image from 'next/image';
import UserRegisterModal from '@/components/form/UserRegisterModal';
import { useTranslation } from 'react-i18next';

// Tipagem dos dados que vêm do servidor
interface UIUser {
    id: string;
    name: string;
    type: string;
    category: string;
    email: string;
    birthDate: string;
    gender: string;
    pending: number;
    completed: number;
    image: string;
}

interface UsersClientContentProps {
    initialUsers: UIUser[];
    userName: string;
    specialistId: string | null;
}

const UsersClientContent = ({ initialUsers, userName, specialistId }: UsersClientContentProps) => {
    const [searchTerm, setSearchTerm] = useState("");
    const {t} = useTranslation('specialist_users_view')
    

    const filteredUsers = initialUsers.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="w-full px-4 md:px-8 lg:px-16 xl:px-40 py-8 md:py-20 relative min-h-screen">
            
            <div className='flex flex-col gap-8 md:gap-20'>
                <div>
                    <h1 className='text-2xl md:text-3xl text-[#323232] font-medium break-words'>
                        {t('label')} {userName} 👋🏼,
                    </h1>
                </div>
                
                <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0'>
                    <h2 className='text-xl md:text-2xl font-medium text-[#323232]'>{t('mainLabel')}</h2>
                    <div className="w-full sm:w-auto">
                         <UserRegisterModal specialistId={specialistId} />
                    </div>
                </div>
            </div>

            <div className='mt-8 md:mt-10 flex flex-col gap-6'>
                <div className='border p-6 flex justify-between items-center w-full sm:max-w-96 rounded-md bg-white shadow-sm'>
                    <div>
                        <p className='text-[#777777]'>{t('mainLabel')}</p>
                        <p className='text-2xl font-bold'>{initialUsers.length}</p>
                    </div>
                    <div className="bg-gray-100 p-3 rounded-full">
                        <UsersIcon size={24} className="text-primary" />
                    </div>
                </div>

                <div className='w-full'>
                    <label htmlFor="search-users" className="sr-only">Pesquisar usuários</label>
                    <div className="relative group w-full">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-gray-400 group-focus-within:text-primary transition-colors" />
                        </div>
                        <input
                            id="search-users"
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-400 focus:outline-none focus:placeholder-gray-400 focus:border-primary focus:ring-1 focus:ring-primary sm:text-sm transition-all shadow-sm"
                            placeholder={t('searchPlaceholder')}
                        />
                    </div>
                </div>
            </div>

            <main className='mt-8 md:mt-10'>
                <div className="w-full mt-6 md:mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
                    {filteredUsers.length > 0 ? (
                        filteredUsers.map((user) => (
                            <div key={user.id} className='bg-white p-5 md:p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between'>
                                <div>
                                    <div className='flex items-start justify-between mb-4 md:mb-6'>
                                        <div className='flex gap-3 md:gap-4 items-center overflow-hidden'>
                                            <div className="relative w-[40px] h-[40px] md:w-[50px] md:h-[50px] rounded-full overflow-hidden bg-slate-50 flex-shrink-0">
                                                <Image src={user.image} alt={user.name} fill className="object-cover"/>
                                            </div>
                                            <div className="min-w-0"> {/* min-w-0 ajuda no truncate */}
                                                <p className='font-medium text-[#323232] text-base md:text-lg leading-tight truncate pr-2'>{user.name}</p>
                                                <div className='flex flex-wrap gap-2 mt-2'>
                                                    <div className='px-2 py-0.5 flex rounded-md bg-[#ef770020] items-center justify-center whitespace-nowrap'>
                                                        <p className='text-[10px] md:text-xs font-medium text-[#9D4F01]'>{user.type}</p>
                                                    </div>
                                                    <div className='px-2 py-0.5 flex rounded-md bg-[#6EA05A20] items-center justify-center whitespace-nowrap'>
                                                        <p className='text-[10px] md:text-xs font-medium text-[#345E23] capitalize'>{user.category}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <button className="text-gray-400 hover:text-gray-600 flex-shrink-0">
                                            <MoreHorizontal size={24} />
                                        </button>
                                    </div>

                                    <div className='flex flex-col gap-2 md:gap-3'>
                                        <div className='flex items-center gap-3 text-sm text-[#777777]'>
                                            <Mail size={16} className="flex-shrink-0" /> 
                                            <span className="truncate" title={user.email}>{user.email}</span>
                                        </div>
                                        <div className='flex items-center gap-3 text-sm text-[#777777]'>
                                            <Calendar size={16} className="flex-shrink-0" /> 
                                            <span>{user.birthDate}</span>
                                        </div>
                                        <div className='flex items-center gap-3 text-sm text-[#777777]'>
                                            <User size={16} className="flex-shrink-0" /> 
                                            <span>{user.gender == 'Feminino'? t('labelGenderF') : t('labelGenderM')}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className='mt-4 md:mt-6 pt-4 border-t border-gray-100 grid grid-cols-2 gap-4'>
                                    <div className='flex flex-col gap-1'>
                                        <p className='text-[10px] md:text-xs text-[#777777] font-medium'>{t('labelPendingEvaluations')}</p>
                                        <div className="flex items-center gap-2">
                                            <FileText size={16} className="text-[#ef7700]" />
                                            <p className='text-lg font-bold text-[#323232]'>{user.pending}</p>
                                        </div>
                                    </div>
                                    <div className='flex flex-col gap-1'>
                                        <p className='text-[10px] md:text-xs text-[#777777] font-medium'>{t('labelConcludedEvaluations')}</p>
                                        <div className="flex items-center gap-2">
                                            <CheckCircle size={16} className="text-[#6EA05A]" />
                                            <p className='text-lg font-bold text-[#323232]'>{user.completed}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full flex flex-col items-center justify-center py-10 text-gray-500">
                            <User size={48} className="mb-4 opacity-50" />
                            <p className="text-lg">Nenhum usuário encontrado</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    )
}

export default UsersClientContent