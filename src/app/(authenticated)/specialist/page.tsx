import React from 'react';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../../pages/api/auth/[...nextauth]'; // Ajuste o caminho se necessário
import { getSpecialtistDashboardInfo } from '@/lib/firebase';
import { BookOpen, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface DashboardData {
    lastEvaluations: any[];
    lastResults: any[];
    userCount: number;
}

const SpecialistPage = async () => {

    const session = await getServerSession(authOptions);

    if (!session?.user?.uid) return null;

    const dashboardData = await getSpecialtistDashboardInfo(session.user.uid);

    return (
        <div className=''>
            
            <div className='flex flex-col lg:flex-row h-full w-full px-4 py-6 print:!p-0 justify-between relative'>
                
                <aside className='w-full mb-8 lg:mb-0 lg:flex-[0.4] lg:ml-40'>
                    
                    <div className='flex flex-col rounded-md bg-[#F8F8F8] shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.1)]
                            w-full relative h-auto
                            lg:fixed lg:h-3/4 lg:w-1/4'>
                        
                        <div className='h-32 lg:h-2/6 bg-primary rounded-sm'></div>

                        <div className='flex flex-1 flex-col justify-center pb-6 lg:pb-0'>
                            
                            <div className='flex justify-center -mt-24 mb-4 relative z-10 
                                            lg:block lg:mt-0 lg:mb-0 lg:absolute lg:left-32 lg:top-24'>
                                <Image 
                                    className='rounded-es-[7777px] rounded-se-[6777px] rounded-ee-[6000px] rounded-ss-[6000px] bg-gray-100' 
                                    src={"/images/user.svg"} 
                                    alt='Profile picture' 
                                    width={200} 
                                    height={200} 
                                />
                            </div>

                            <div className='p-4 flex flex-col text-center lg:text-left lg:mt-16'> 
                                <p className='text-2xl font-bold'>{session != null ? session?.user.name : "null"}</p>
                                <p className='font-thin text-lg mt-2'>Specialist | Computer Science</p>
                            </div>

                            <div className='flex flex-col sm:flex-row lg:flex-row w-full items-center justify-center lg:justify-start gap-4 p-4'>
                                <div className='flex items-center gap-4 border border-[#777777] rounded-2xl p-2 pr-8 py-4 w-full sm:w-52 max-w-56'>
                                    <div className='bg-primary rounded-md p-1'>
                                        <User size={28} color="#fafafa" />
                                    </div>
                                    <div className='flex flex-col justify-center items-start'>
                                        <p className='text-2xl font-medium text-[#323232] leading-5'>{dashboardData?.userCount}</p>
                                        <p className='text-[#969696] text-xs font-bold'>No. of users</p>
                                    </div>
                                </div>

                                <div className='flex items-center gap-4 border border-[#777777] rounded-2xl p-2 pr-8 py-4 w-full sm:w-52 max-w-56'>
                                    <div className=' rounded-md p-1'>
                                        <BookOpen size={28} color="#1881BF" />
                                    </div>
                                    <div className='flex flex-col justify-center items-start'>
                                        <p className='text-2xl font-medium text-[#323232] leading-5'>23</p>
                                        <p className='text-[#969696] text-xs font-bold'>No. of publications</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </aside>

               
                <section className='flex flex-col flex-1 items-center gap-8 lg:gap-20 box-border
                                    w-full p-4 ml-0
                                    lg:max-w-[75%] lg:ml-12 lg:p-20'>
                    
                    <div className='flex flex-col bg-white w-full flex-[0.4] p-6 lg:p-8 rounded-md shadow-[-8px_5px_6px_0px_rgba(0,_0,_0,_0.1)]'>
                        <div className='flex justify-between'>
                            <p className='font-bold text-[#505050]'>Latest evaluations</p>
                            <Link className='font-bold text-primary' href={""}>read all &#8594;</Link>
                        </div>
                        <div className='flex flex-col flex-1 items-center justify-around'>
                            <div className='flex flex-col w-full py-8 border-b border-[#32323232]'>
                                <p className='text-xl font-bold text-[#323232]'>Cognitive Development Assessment</p>
                                <p className='font-thin'>Oct 24, 2025 • Patient: A. Silva</p>
                                <Link href={""} className='font-bold text-primary text-sm'>read more &#8599;</Link>
                            </div>
                            <div className='flex flex-col items-start justify-start w-full py-8'>
                                <p className='text-xl font-bold text-[#323232]'>Social Skills Screening</p>
                                <p className='font-thin'>Oct 20, 2025 • Patient: J. Doe</p>
                                <Link href={""} className='font-bold text-primary text-sm'>read more &#8599;</Link>
                            </div>
                        </div>
                    </div>

                    <div className='flex flex-col bg-white w-full flex-[0.4] p-6 lg:p-8 rounded-md shadow-[-8px_5px_6px_0px_rgba(0,_0,_0,_0.1)]'>
                        <div className='flex justify-between'>
                            <p className='font-bold text-[#505050]'>Latest publications</p>
                            <Link className='font-bold text-[#1881BF]' href={""}>read all &#8594;</Link>
                        </div>
                        <div className='flex flex-col flex-1 items-center justify-around'>
                            <div className='flex flex-col w-full py-8 border-b border-[#32323232]'>
                                <p className='text-xl font-bold text-[#323232]'>Understanding Early Signs of ASD</p>
                                <p className='font-thin'>Sep 15, 2025 • Scientific Article</p>
                                <Link href={""} className='font-bold text-[#1881BF] text-sm'>read more &#8599;</Link>
                            </div>
                            <div className='flex flex-col items-start justify-start w-full py-8'>
                                <p className='text-xl font-bold text-[#323232]'>New Protocols for 2025</p>
                                <p className='font-thin'>Aug 10, 2025 • Clinical Guide</p>
                                <Link href={""} className='font-bold text-[#1881BF] text-sm'>read more &#8599;</Link>
                            </div>
                        </div>
                    </div>

                    <div className='flex flex-col bg-white w-full flex-[0.4] p-6 lg:p-8 rounded-md shadow-[-8px_5px_6px_0px_rgba(0,_0,_0,_0.1)]'>
                        <div className='flex justify-between'>
                            <p className='font-bold text-[#505050]'>Latest Results</p>
                            <Link className='font-bold text-[#EF7700]' href={""}>read all &#8594;</Link>
                        </div>
                        <div className='flex flex-col flex-1 items-center justify-around'>
                            <div className='flex flex-col w-full py-8 border-b border-[#32323232]'>
                                <p className='text-xl font-bold text-[#323232]'>Assessment Report #4209</p>
                                <p className='font-thin'>Oct 22, 2025 • Status: Completed</p>
                                <Link href={""} className='font-bold text-[#EF7700] text-sm'>read more &#8599;</Link>
                            </div>
                            <div className='flex flex-col items-start justify-start w-full py-8'>
                                <p className='text-xl font-bold text-[#323232]'>Quarterly Progress Analysis</p>
                                <p className='font-thin'>Oct 01, 2025 • Status: Under Review</p>
                                <Link href={""} className='font-bold text-[#EF7700] text-sm'>read more &#8599;</Link>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default SpecialistPage;