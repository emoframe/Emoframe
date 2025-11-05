"use client"
import React, { useEffect, useState } from 'react';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../../pages/api/auth/[...nextauth]';
import { getSpecialtistDashboardInfo } from '@/lib/firebase';
import SpecialistDashboard from '@/components/SpecialistDashboard';
import VideosTutorials from '@/components/VideoTutorials';
import LatestPublications from '@/components/LatestPublications';
import Welcome from '@/components/Welcome';
import WhatIs from '@/components/WhatIs';
import { BookOpen, LibraryBig, LogOut, MessageCircleQuestion, Settings, SquareUserRound, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button, buttonVariants } from '@/components/ui/button';
import { signOut, useSession } from 'next-auth/react';
import { useTutorial } from '@/components/context/TutorialContext';


interface DashboardData {
    lastEvaluations: any[];
    lastResults: any[];
    userCount: number;
}

const SpecialistPage = () => {

    const { data: session, status } = useSession();
    const { setTutorial } = useTutorial();


    const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
    const [isLoadingData, setIsLoadingData] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isProfileOpen, setIsProfileOpen] = useState(false);


    useEffect(() => {
        const loadDashboardData = async (uid: string) => {
            try {
                setError(null);
                setIsLoadingData(true);
                const data = await getSpecialtistDashboardInfo(uid);
                setDashboardData(data);
            } catch (err) {
                console.error("Erro ao buscar dados do dashboard:", err);
                setError("Não foi possível carregar os dados.");
            } finally {
                setIsLoadingData(false);
            }
        };

        if (status === 'authenticated') {
            loadDashboardData(session.user.uid!);
        } else if (status === 'unauthenticated') {
            setIsLoadingData(false);
            setError("Você não está autenticado.");

        }

    }, [session, status]);

    if (status === 'loading' || isLoadingData) {
        return (
            <div className='flex h-screen w-full items-center justify-center'>
                <p>Carregando...</p>
            </div>
        );
    }


    return (
        // <div className="max-w-[1400px] mx-auto">
        //     <Welcome name={session?.user.name}/>
        //     <SpecialistDashboard
        //         lastEvaluations={dashboardData.lastEvaluations}
        //         lastResults={dashboardData.lastResults}
        //         userCount={dashboardData.userCount}
        //     />
        //     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        //         <VideosTutorials thumbnail='' ns='specialist' />
        //         <LatestPublications />
        //     </div>
        //     <WhatIs/>
        // </div>
        <div className=''>
            <header className='flex h-16 w-full bg-primary-background px-sidebar items-center justify-between'>
                <Image src={"/images/logo_emoframe.svg"} alt='logo' width={140} height={140} />
                <nav className='flex items-center p-8 gap-8'>
                    <button onClick={() => setTutorial(prev => !prev)}>
                        <MessageCircleQuestion size={40} color='#323232' />
                    </button>
                    <button onClick={() => setIsProfileOpen(prev => !prev)}>
                        <Image className='rounded-full' src={"/images/pedro.jpg"} alt='logo' width={52} height={52} />
                    </button>
                    {isProfileOpen && (
                        <div className='absolute top-20 h-60 right-8 w-64 bg-white rounded-md shadow-lg border border-gray-200 z-50 p-4 flex flex-col'>
                            
                            <div>
                                <div className='flex items-center justify-between gap-3 mb-3 w-full'>
                                    <div className='flex items-center gap-2'>
                                        <Image className='rounded-full' src={"/images/pedro.jpg"} alt='logo' width={40} height={40} />
                                        <p className='font-semibold text-sm text-gray-800'>{session?.user.name}</p>
                                    </div>

                                    <div className='flex items-center justify-around'>
                                        <Link className={`w-22 h-8 text-xs ${buttonVariants({ variant: "default" })}`} href={"/profile"}>
                                            Ver Perfil
                                        </Link>
                                    </div>
                                </div>

                                <div className='border-b border-gray-200 -mx-4 my-2'></div>

                                <button className='w-full flex items-center gap-3 p-2 rounded hover:bg-gray-100 text-gray-700'>
                                    <Settings size={26} color='#6EA05A'/>
                                    <div className='flex flex-col items-start'>
                                        <p className='text-sm'>Minha conta</p>
                                        <p className='text-[0.60rem] text-start text-[#969696]'>Acesse configurações e preferências</p>
                                    </div>
                                </button>
                            </div>

                            <button
                                onClick={() => {signOut({callbackUrl: "/"})}}
                                className='w-full flex items-center gap-3 p-2 mt-auto rounded hover:bg-red-50 text-red-600'
                            >
                                <LogOut size={22} />
                                <span className='text-sm font-medium'>Sair da conta</span>
                            </button>
                        </div>
                    )}
                </nav>
            </header>
            <div className='flex h-full w-full px-4 py-6 print:!p-0 justify-between'>
                <aside className='flex-[0.4] ml-40'>
                    <div className='border border-[#323232] flex flex-col rounded-md h-3/4 w-1/4 fixed bg-[#F8F8F8]'>
                        <div className='h-2/6 bg-primary rounded-sm'></div>

                        <div className='flex flex-1 flex-col justify-center'>
                            <div className='absolute left-32 top-24'>
                                <Image className='rounded-es-[7777px] rounded-se-[6777px] rounded-ee-[6000px] rounded-ss-[6000px]' src={"/images/pedro.jpg"} alt='imagem' width={200} height={200} />
                            </div>

                            <div className='p-4 flex flex-col'>
                                <p className='text-2xl font-bold'>{session != null ? session?.user.name : "null"}</p>
                                <p className='font-thin text-lg mt-2'>Especialista | Especialidade</p>
                            </div>

                            <div className='flex w-full items-center gap-4 p-4'>
                                <div className='flex items-center gap-4 border border-[#777777] rounded-2xl p-2 pr-8 py-4 w-52 max-w-56'>
                                    <div className='bg-primary rounded-md p-1'>
                                        <User size={28} color="#fafafa" />
                                    </div>
                                    <div className='flex flex-col justify-center items-start'>
                                        <p className='text-2xl font-medium text-[#323232] leading-5'>{dashboardData?.userCount}</p>
                                        <p className='text-[#969696] text-xs font-bold'>nº de usuários </p>
                                    </div>
                                </div>

                                <div className='flex items-center gap-4 border border-[#777777] rounded-2xl p-2 pr-8 py-4 w-52 max-w-56'>
                                    <div className=' rounded-md p-1'>
                                        <BookOpen size={28} color="#1881BF" />
                                    </div>
                                    <div className='flex flex-col justify-center items-start'>
                                        <p className='text-2xl font-medium text-[#323232] leading-5'>23</p>
                                        <p className='text-[#969696] text-xs font-bold'>nº de publicações </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </aside>
                <section className='flex flex-col flex-1 max-w-[75%] ml-12 p-20 box-border items-center gap-20'>
                    <div className='flex flex-col bg-white w-full flex-[0.4] p-8 rounded-md shadow-[-8px_5px_6px_0px_rgba(0,_0,_0,_0.1)]'>
                        <div className='flex justify-between'>
                            <p className='font-bold text-[#505050]'>Últimas avaliações</p>
                            <Link className='font-bold text-primary' href={""}>ler todas &#8594;</Link>
                        </div>
                        <div className='flex flex-col flex-1  items-center justify-around'>
                            <div className='flex flex-col w-full py-8 border-b #66323232'>
                                <p className='text-xl font-bold text-primary'>Titulo referente à avaliação</p>
                                <p className='font-thin'>30/08/2006 • Hollow Knight Silksong</p>
                                <Link href={""} className='font-bold text-primary text-sm'>ler mais &#8599;</Link>
                            </div>
                            <div className='flex flex-col items-start justify-start w-full py-8'>
                                <p className='text-xl font-bold text-primary'>Titulo referente à avaliação</p>
                                <p className='font-thin'>30/08/2006 • Hollow Knight Silksong</p>
                                <Link href={""} className='font-bold text-primary text-sm'>ler mais &#8599;</Link>
                            </div>
                        </div>
                    </div>


                    <div className='flex flex-col bg-white w-full flex-[0.4] p-8 rounded-md shadow-[-8px_5px_6px_0px_rgba(0,_0,_0,_0.1)]'>
                        <div className='flex justify-between'>
                            <p className='font-bold text-[#505050]'>Últimas publicações</p>
                            <Link className='font-bold text-[#1881BF]' href={""}>ler todas &#8594;</Link>
                        </div>
                        <div className='flex flex-col flex-1  items-center justify-around'>
                            <div className='flex flex-col w-full py-8 border-b #66323232'>
                                <p className='text-xl font-bold text-[#1881BF]'>Titulo referente à publicação</p>
                                <p className='font-thin'>30/08/2006 • Hollow Knight Silksong</p>
                                <Link href={""} className='font-bold text-[#1881BF] text-sm'>ler mais &#8599;</Link>
                            </div>
                            <div className='flex flex-col items-start justify-start w-full py-8'>
                                <p className='text-xl font-bold text-[#1881BF]'>Titulo referente à publicação</p>
                                <p className='font-thin'>30/08/2006 • Hollow Knight Silksong</p>
                                <Link href={""} className='font-bold text-[#1881BF] text-sm'>ler mais &#8599;</Link>
                            </div>
                        </div>
                    </div>

                    <div className='flex flex-col bg-white w-full flex-[0.4] p-8 rounded-md shadow-[-8px_5px_6px_0px_rgba(0,_0,_0,_0.1)]'>
                        <div className='flex justify-between'>
                            <p className='font-bold text-[#505050]'>Últimos Resultados</p>
                            <Link className='font-bold text-[#EF7700]' href={""}>ler todas &#8594;</Link>
                        </div>
                        <div className='flex flex-col flex-1  items-center justify-around'>
                            <div className='flex flex-col w-full py-8 border-b #66323232'>
                                <p className='text-xl font-bold text-[#EF7700]'>Titulo referente ao resultado</p>
                                <p className='font-thin'>30/08/2006 • Hollow Knight Silksong</p>
                                <Link href={""} className='font-bold text-[#EF7700] text-sm'>ler mais &#8599;</Link>
                            </div>
                            <div className='flex flex-col items-start justify-start w-full py-8'>
                                <p className='text-xl font-bold text-[#EF7700]'>Titulo referente ao resultado</p>
                                <p className='font-thin'>30/08/2006 • Hollow Knight Silksong</p>
                                <Link href={""} className='font-bold text-[#EF7700] text-sm'>ler mais &#8599;</Link>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default SpecialistPage;