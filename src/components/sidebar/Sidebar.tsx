"use client";

import {
    User, Users, LineChart, BookOpenText, BookUser,
    Home, Info, ChevronFirst, ChevronLast,
    X, ChevronLeft, ChevronRight
} from "lucide-react";
import { useContext, createContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { useTranslation } from "@/config/i18";
import { useTutorial } from "@/components/context/TutorialContext";

type SidebarContextType = {
    expanded: boolean;
}
const SidebarContext = createContext<SidebarContextType>({ expanded: true });

interface SidebarCoreProps {
    children: React.ReactNode;
    tutorial: boolean;
    isMobile?: boolean;
}

const SidebarCore = ({ children, tutorial, isMobile = false }: SidebarCoreProps) => {

    const { data: session } = useSession();
    const { showTutorial, setTutorial, currentStep, setCurrentStep } = useTutorial();
    const [desktopExpanded, setDesktopExpanded] = useState(false);
    const expanded = isMobile ? true : desktopExpanded;

    const { theme, setTheme } = useTheme();
    const [themeState, setThemeState] = useState<string>();

    const { t } = useTranslation('sidebar');
    const pathname = usePathname();

    useEffect(() => {
        if (showTutorial && !isMobile) {
            setDesktopExpanded(true);
        }
    }, [showTutorial, isMobile]);

    const tutorialSteps = [
        { top: 90, text: "Aqui é a página inicial, onde você vê um resumo de tudo." },
        { top: 148, text: "Nesta aba você gerencia todos os seus usuários." },
        { top: 206, text: "Acesse aqui todas as avaliações realizadas." },
        { top: 264, text: "Gerencie os serviços disponíveis na plataforma." },
        { top: 322, text: "Analise aqui os resultados, dos usuários. " },
        { top: 380, bottom: 0, text: "Saiba mais sobre nosso projeto e equipe" },
    ];

    const handleNext = () => { 
        if (currentStep < tutorialSteps.length - 1) setCurrentStep(prev => prev + 1); 
    };

    const handlePrev = () => { 
        if (currentStep > 0) setCurrentStep(prev => prev - 1); 
    };

    const handleClose = () => { 
        setTutorial(false); 
        setCurrentStep(0); 
    };

    useEffect(() => { theme && setThemeState(theme); }, [theme]);

    const redirect = () => {
        const type = session?.user?.type;
        return session?.user && type === "specialist" ? "/specialist" : "/user";
    }

    const tutorialStyle = tutorialSteps[currentStep].bottom 
        ? { bottom: `${tutorialSteps[currentStep].bottom}px` } 
        : { top: `${tutorialSteps[currentStep].top}px` };      

    return (
        <aside
            className={`
                bg-primary-background border-r border-gray-200 transition-all duration-300
                ${isMobile 
                    ? 'w-full h-full' 
                    : 'h-screen sticky top-0 z-20' 
                }
            `}
        >
            <nav className="h-full flex flex-col relative">
                <div className={`p-4 pb-2 flex items-center h-20 justify-between`}>
                    <div className={`
                        flex items-center overflow-hidden whitespace-nowrap
                        transition-all duration-500 ease-in-out
                        ${expanded ? "w-32 opacity-100 translate-x-0" : "w-0 opacity-0 -translate-x-4"}
                    `}>
                        <Link href={redirect()}>
                            <Image
                                src={`/images/logo_emoframe.svg`}
                                alt="Logo"
                                width={120}
                                height={40}
                                className={`object-contain transition-transform duration-500 ${expanded ? 'scale-100' : 'scale-90'}`}
                            />
                        </Link>
                    </div>

                    {!isMobile && (
                        <Button
                            onClick={() => setDesktopExpanded((curr) => !curr)}
                            variant="ghost"
                            size="icon"
                            className="text-primary hover:bg-muted shrink-0"
                        >
                            {!expanded ? <ChevronLast /> : <ChevronFirst/>}
                        </Button>
                    )}
                </div>

                <SidebarContext.Provider value={{ expanded }}>
                    <ul className="flex-1 px-3 space-y-1 mt-2">
                        {children}
                    </ul>
                </SidebarContext.Provider>

                {showTutorial && expanded && (
                    <div
                        className="fixed left-64 z-[100] w-64 bg-blue-600 p-4 rounded-lg shadow-2xl text-white transition-all duration-500 ease-out"
                        style={tutorialStyle}
                    >
                        <div className={`absolute -left-2 w-0 h-0 border-t-[8px] border-t-transparent border-r-[10px] border-r-blue-600 border-b-[8px] border-b-transparent 
                            ${tutorialSteps[currentStep].bottom ? 'bottom-4' : 'top-4'}
                        `}></div>

                        <button onClick={handleClose} className="absolute top-2 right-2 text-blue-200 hover:text-white transition-colors">
                            <X size={16} />
                        </button>

                        <p className="font-bold mb-1 text-sm text-blue-100">
                            Passo {currentStep + 1} de {tutorialSteps.length}
                        </p>
                        <p className="text-sm mb-4 leading-snug font-medium">
                            {tutorialSteps[currentStep].text}
                        </p>

                        <div className="flex justify-between mt-2 pt-2 border-t border-blue-500/50">
                            <button 
                                onClick={handlePrev} 
                                disabled={currentStep === 0}
                                className="flex items-center text-xs font-semibold bg-blue-700 hover:bg-blue-800 px-3 py-1.5 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                <ChevronLeft size={14} className="mr-1" /> Ant
                            </button>
                            <button 
                                onClick={handleNext} 
                                disabled={currentStep === tutorialSteps.length - 1}
                                className="flex items-center text-xs font-semibold bg-blue-700 hover:bg-blue-800 px-3 py-1.5 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                Próx <ChevronRight size={14} className="ml-1" />
                            </button>
                        </div>
                    </div>
                )}
            </nav>
        </aside>
    )
}

interface SidebarItemType {
    icon: React.ReactNode;
    text: string;
    href: string;
    active?: boolean;
    alert?: boolean;
    onClick?: () => void; 
}

const SidebarItem = ({ icon, text, href, active = false, alert = false, onClick }: SidebarItemType) => {
    const { expanded } = useContext(SidebarContext);

    return (
        <Link href={href} className="block" onClick={onClick}>
            <li
                className={`
                    relative flex items-center py-3 px-3 my-1
                    font-medium rounded-md cursor-pointer
                    transition-colors group
                    ${active
                        ? "bg-primary/10 text-primary border-r-4 border-primary" 
                        : "hover:bg-gray-100 text-gray-600 hover:text-primary" 
                    }
                    ${!expanded && "justify-center"}
                `}
            >
                <div className="flex items-center justify-center min-w-[24px]">
                    {icon}
                </div>

                <span
                    className={`
                        overflow-hidden transition-all duration-300 whitespace-nowrap
                        ${expanded ? "w-40 ml-3 opacity-100" : "w-0 opacity-0"}
                    `}
                >
                    {text}
                </span>

                {alert && (
                    <div className={`absolute right-2 w-2 h-2 rounded bg-red-500 ${expanded ? "" : "top-2"}`} />
                )}

                {!expanded && (
                    <div className={`
                        absolute left-full rounded-md px-2 py-1 ml-6
                        bg-gray-800 text-white text-xs
                        invisible opacity-20 -translate-x-3 transition-all
                        group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
                        z-50 whitespace-nowrap pointer-events-none
                    `}>
                        {text}
                    </div>
                )}
            </li>
        </Link>
    )
}

interface sidebarProps {
    tutorial?: boolean;
    isMobile?: boolean;     
    onMobileClose?: () => void; 
}

const Sidebar = ({ tutorial = false, isMobile = false, onMobileClose }: sidebarProps) => {
    const { data: session } = useSession();
    const currentPath = usePathname();
    const { t } = useTranslation('sidebar');

    const isActive = (path: string) => currentPath === path;
    const redirect = () => session?.user?.type === "specialist" ? "/specialist" : "/user";

    const globalItems = [
        { text: t('homeLabel'), href: redirect(), icon: <Home size={20} /> },
    ]
    const userItems = [
        { text: t('evaluationsLabel'), href: "/user/evaluations", icon: <BookOpenText size={20} /> },
    ]
    const specialistItems = [
        { text: t('usersLabel'), href: "/specialist/users", icon: <Users size={20} /> },
        { text: t('evaluationsLabel'), href: "/specialist/evaluations", icon: <BookOpenText size={20} /> },
        { text: t('servicesLabel'), href: "/specialist/services", icon: <BookUser size={20} /> },
        { text: t('resultsLabel'), href: "/specialist/results", icon: <LineChart size={20} /> },
    ]
    const bottomItems = [
        { text: t('aboutLabel'), href: "/about", icon: <Info size={20} /> },
    ]

    return (
        <SidebarCore tutorial={tutorial} isMobile={isMobile}>

            {globalItems.map((item, index) => (
                <SidebarItem key={`g-${index}`} {...item} active={isActive(item.href)} onClick={onMobileClose} />
            ))}

            {session?.user.type == 'specialist' && specialistItems.map((item, index) => (
                <SidebarItem key={`s-${index}`} {...item} active={isActive(item.href)} onClick={onMobileClose} />
            ))}

            {session?.user.type == 'user' && userItems.map((item, index) => (
                <SidebarItem key={`u-${index}`} {...item} active={isActive(item.href)} onClick={onMobileClose} />
            ))}

            <div className="mt-auto">
                {bottomItems.map((item, index) => (
                    <SidebarItem key={`b-${index}`} {...item} active={isActive(item.href)} onClick={onMobileClose} />
                ))}
            </div>

        </SidebarCore>
    )
}

export default Sidebar;