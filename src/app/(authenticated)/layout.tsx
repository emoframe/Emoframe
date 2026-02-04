"use client";
import { FC, ReactNode, useState } from 'react';
import PathnameAware from '@/components/PathnameAware';
import Sidebar from '@/components/sidebar/Sidebar';
import { TutorialContext } from '@/components/context/TutorialContext';
import { signOut, useSession } from 'next-auth/react';
import { 
    AArrowDown, AArrowUp, Languages, LogOut, MessageCircleQuestion, 
    Moon, PersonStanding, Settings, Sun, Menu 
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Button, buttonVariants } from '@/components/ui/button';
import { useTranslation } from '@/config/i18';
import { usePathname, useSearchParams } from 'next/navigation';
import { 
    DropdownMenu, DropdownMenuContent, DropdownMenuLabel, 
    DropdownMenuSeparator, DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { useTheme } from 'next-themes';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"; 

interface SpecialistLayoutProps {
    children: ReactNode;
}

const SpecialistLayout: FC<SpecialistLayoutProps> = ({ children }) => {
    const { data: session } = useSession();
    const [showTutorial, setTutorial] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    
    const { t, i18n } = useTranslation('headerMenu');
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const instrument = searchParams?.get('instrument');
    const { theme, setTheme } = useTheme();

    const toggleLanguage = () => {
        const newLang = i18n.language === 'en' ? 'pt' : 'en';
        if ((newLang === 'en') && pathname && ['/specialist/services/instruments/fill'].includes(pathname) && instrument && ['eaz', 'leap'].includes(instrument)) return alert('This page is not available in English');
        i18n.changeLanguage(newLang);
    }

    const defaultLayout = (
        <div className='flex flex-1 min-h-screen bg-gray-50'>
            
            {/* Sidebar Desktop: Visível apenas em telas grandes (lg) */}
            <div className="hidden lg:flex h-screen sticky top-0 z-50">
                <Sidebar />
            </div>

            <main className='flex-1 flex flex-col min-w-0'>
                {/* Header */}
                <header className='flex h-16 w-full bg-primary-background border-b border-gray-200 px-4 items-center justify-between sticky top-0 z-40'>
                    
                    {/* Lado Esquerdo: Apenas o Botão Menu Mobile */}
                    <div className="flex items-center">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="lg:hidden">
                                    <Menu size={24} />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="p-0 w-72">
                                <Sidebar /> 
                            </SheetContent>
                        </Sheet>
                        {/* Removi a imagem/logo daqui */}
                    </div>

                    {/* Lado Direito: Menu Original */}
                    <nav className='flex items-center gap-4 lg:gap-8 relative'>
                        <button onClick={() => setTutorial(prev => !prev)} className="hidden sm:block">
                            <MessageCircleQuestion size={40} color='#323232' />
                        </button>
                        
                        <button onClick={() => setIsProfileOpen(prev => !prev)}>
                            <Image className='rounded-full border border-gray-200' src={"/images/user.svg"} alt='logo' width={52} height={52} />
                        </button>

                        {/* SEU MENU ORIGINAL (MANTIDO) */}
                        {isProfileOpen && (
                            <div className='absolute top-16 right-0 w-72 bg-white rounded-md shadow-lg border border-gray-200 z-50 p-4 flex flex-col'>

                                <div>
                                    <div className='flex items-center justify-between gap-3 mb-3 w-full'>
                                        <div className='flex items-center gap-2'>
                                            <Image
                                                className='rounded-full'
                                                src={"/images/pedro.jpg"}
                                                alt='foto de perfil'
                                                width={40}
                                                height={40}
                                            />
                                            <p className='font-semibold text-sm text-gray-800 truncate max-w-[120px]'>{session?.user.name}</p>
                                        </div>

                                        <div className='flex items-center justify-around'>
                                            <Link className={`w-22 h-8 text-xs ${buttonVariants({ variant: "default" })}`} href={"/profile"}>
                                                Ver Perfil
                                            </Link>
                                        </div>
                                    </div>

                                    <div className='border-b border-gray-200 -mx-4 my-2'></div>

                                    <div className='flex flex-col w-full p-2 gap-1'>

                                        <button className='flex w-full items-center gap-3 p-2 rounded-md hover:bg-gray-100 transition-colors text-gray-700'>
                                            <div className="flex items-center justify-center w-8 h-8">
                                                <Settings size={20} color='#323232' />
                                            </div>
                                            <div className='flex flex-col items-start text-left'>
                                                <p className='text-sm font-medium text-[#323232]'>Minha conta</p>
                                                <p className='text-[0.65rem] text-[#969696]'>Acesse configurações e preferências</p>
                                            </div>
                                        </button>

                                        <button
                                            className='flex w-full items-center gap-3 p-2 rounded-md hover:bg-gray-100 transition-colors text-gray-700'
                                            onClick={toggleLanguage}
                                        >
                                            <div className="flex items-center justify-center w-8 h-8">
                                                <Languages size={20} color='#323232' />
                                            </div>
                                            <span className="text-sm font-medium text-[#323232]">
                                                {i18n.language === 'en' ? 'Idioma: Português' : 'Language: English'}
                                            </span>
                                        </button>

                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <button className='flex w-full items-center gap-3 p-2 rounded-md hover:bg-gray-100 transition-colors text-gray-700'>
                                                    <div className="flex items-center justify-center w-8 h-8">
                                                        <PersonStanding size={20} color='#323232' />
                                                    </div>
                                                    <span className="text-sm font-medium text-[#323232]">Acessibilidade</span>
                                                </button>
                                            </DropdownMenuTrigger>

                                            <DropdownMenuContent align="end" className="w-40">
                                                <DropdownMenuLabel>{t('accessibilityLabel')}</DropdownMenuLabel>
                                                <DropdownMenuSeparator />

                                                <div className="flex justify-between p-2">
                                                    <Button variant="ghost" size="icon" onClick={() => setTheme((theme === 'dark') ? 'light' : 'dark')}>
                                                        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                                                        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                                                        <span className="sr-only">Alto contraste</span>
                                                    </Button>

                                                    <Button variant="ghost" size="icon" onClick={() => document.documentElement.style.fontSize = `${parseFloat(window.getComputedStyle(document.documentElement, null).getPropertyValue('font-size')) + 2}px`}>
                                                        <AArrowUp className="h-[1.2rem] w-[1.2rem]" />
                                                        <span className="sr-only">Aumentar fonte</span>
                                                    </Button>

                                                    <Button variant="ghost" size="icon" onClick={() => document.documentElement.style.fontSize = `${parseFloat(window.getComputedStyle(document.documentElement, null).getPropertyValue('font-size')) - 2}px`}>
                                                        <AArrowDown className="h-[1.2rem] w-[1.2rem]" />
                                                        <span className="sr-only">Diminuir fonte</span>
                                                    </Button>
                                                </div>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>

                                </div>

                                <button
                                    onClick={() => { signOut({ callbackUrl: "/" }) }}
                                    className='w-full flex items-center gap-3 p-2 mt-auto rounded hover:bg-red-50 text-red-600'
                                >
                                    <LogOut size={22} />
                                    <span className='text-sm font-medium'>Sair da conta</span>
                                </button>
                            </div>
                        )}
                    </nav>
                </header>
                
                {/* Conteúdo da Página */}
                <div className="flex-1 overflow-x-hidden">
                    {children}
                </div>

            </main>
        </div>
    );

    const specialLayout = (
        <>{children}</>
    );

    return (
        <TutorialContext.Provider value={{ showTutorial, setTutorial, currentStep, setCurrentStep }}>
            <PathnameAware
                defaultContent={defaultLayout}
                specialContent={specialLayout}
                ignorePaths="/specialist/services/templates/builder"
            />
        </TutorialContext.Provider>
    );
};

export default SpecialistLayout;