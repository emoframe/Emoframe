'use client';

import React from 'react';
import Image from 'next/image';
import { BookOpen, User } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { DashboardSection } from './DashboardSection';

interface SpecialistDashboardProps {
  sessionUser: {
    name?: string | null;
    email?: string | null;
  };
  dashboardData: {
    userCount: number;
    lastEvaluations?: any[];
    lastResults?: any[];
  };
}

export default function SpecialistDashboard({ sessionUser, dashboardData }: SpecialistDashboardProps) {
  const { t } = useTranslation('specialist');

  return (
    <div className='w-full flex justify-center min-h-screen bg-gray-50/50 px-sidebar'>
      
      <div className='flex flex-col lg:flex-row lg:justify-center w-full max-w-[1600px] py-8 gap-8'>
        <aside className='w-full lg:w-[320px] xl:w-[380px] flex-shrink-0'>
            
            <div className='flex flex-col rounded-xl bg-white shadow-md w-full overflow-hidden lg:sticky lg:top-6'>
                
                <div className='h-32 bg-primary w-full'></div>

                <div className='flex flex-col px-6 pb-8 relative'>
                
                    <div className='flex justify-center -mt-20 mb-4'>
                        <div className='bg-white rounded-es-[50px] rounded-se-[50px] rounded-ee-[40px] rounded-ss-[40px] shadow-sm'>
                            <Image 
                                className='rounded-es-[45px] rounded-se-[45px] rounded-ee-[35px] rounded-ss-[35px] bg-gray-100 object-cover' 
                                src={"/images/user.svg"} 
                                alt='Profile picture' 
                                width={160} 
                                height={160} 
                            />
                        </div>
                    </div>

                    <div className='text-center'> 
                        <h2 className='text-2xl font-bold text-gray-800'>{sessionUser.name || "Usuário"}</h2>
                        <p className='font-light text-gray-500 mt-1'>{t('role', 'Specialist | Computer Science')}</p>
                    </div>

                   
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 mt-8'>
                        
                        <div className='flex items-center gap-4 border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow bg-gray-50'>
                            <div className='bg-[#6EA05A]/10 rounded-lg p-3 shrink-0'>
                                <User size={24} className="text-[#6EA05A]" />
                            </div>
                            <div className='flex flex-col overflow-hidden'>
                                <p className='text-2xl font-bold text-gray-800 leading-tight'>{dashboardData.userCount}</p>
                                <p className='text-gray-500 text-xs font-semibold uppercase tracking-wide truncate'>
                                    {t('stats.users')}
                                </p>
                            </div>
                        </div>

                        <div className='flex items-center gap-4 border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow bg-gray-50'>
                            <div className='bg-[#1881BF]/10 rounded-lg p-3 shrink-0'>
                                <BookOpen size={24} className="text-[#1881BF]" />
                            </div>
                            <div className='flex flex-col overflow-hidden'>
                                <p className='text-2xl font-bold text-gray-800 leading-tight'>23</p>
                                <p className='text-gray-500 text-xs font-semibold uppercase tracking-wide truncate'>
                                    {t('stats.publications')}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </aside>

       
        <section className='flex-1 flex flex-col gap-8 min-w-0'>
            
            <DashboardSection 
                title={t('sections.evaluations', 'Latest evaluations')}
                readAllText={t('actions.read_all', 'read all')}
                readMoreText={t('actions.read_more', 'read more')}
                colorClass="text-primary"
                items={[
                    { title: 'Cognitive Development Assessment', subtitle: 'Oct 24, 2025 • Patient: A. Silva', link: '#' },
                    { title: 'Social Skills Screening', subtitle: 'Oct 20, 2025 • Patient: J. Doe', link: '#' }
                ]}
            />

            <DashboardSection 
                title={t('sections.publications', 'Latest publications')}
                readAllText={t('actions.read_all', 'read all')}
                readMoreText={t('actions.read_more', 'read more')}
                colorClass="text-[#1881BF]"
                items={[
                    { title: 'Understanding Early Signs of ASD', subtitle: 'Sep 15, 2025 • Scientific Article', link: '#' },
                    { title: 'New Protocols for 2025', subtitle: 'Aug 10, 2025 • Clinical Guide', link: '#' }
                ]}
            />

            <DashboardSection 
                title={t('sections.results', 'Latest Results')}
                readAllText={t('actions.read_all', 'read all')}
                readMoreText={t('actions.read_more', 'read more')}
                colorClass="text-[#EF7700]"
                items={[
                    { title: 'Assessment Report #4209', subtitle: 'Oct 22, 2025 • Status: Completed', link: '#' },
                    { title: 'Quarterly Progress Analysis', subtitle: 'Oct 01, 2025 • Status: Under Review', link: '#' }
                ]}
            />

        </section>
      </div>
    </div>
  );
}