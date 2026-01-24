"use client";

import {
    ChevronLast, ChevronFirst, User,
    Users, LineChart, BookOpenText, BookUser,
    Home, Info, PersonStanding, Sun, Moon, AArrowUp, AArrowDown,
    Menu,
    ChevronLeft,
    ChevronRight,
    X
} from "lucide-react";
import { useContext, createContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { buttonVariants, Button } from "../ui/button";
import Link from "next/link";
import LoginMenu from "./LoginMenu";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { useTranslation } from 'react-i18next';
import "@/config/i18";
import { useSearchParams } from "next/navigation";
import { useTutorial } from "../context/TutorialContext";

type SidebarContextType = {
    expanded: boolean;
}

interface SidebarCoreProps {
    children: React.ReactNode,
    tutorial: boolean
}
const SidebarContext = createContext<SidebarContextType>({ expanded: false });

const SidebarCore = ({ children }: SidebarCoreProps) => {

    const { data: session } = useSession();
    const { showTutorial, setTutorial, currentStep, setCurrentStep } = useTutorial();

    const [expanded, setExpanded] = useState(false);

    const { theme, setTheme } = useTheme();
    const [themeState, setThemeState] = useState<string>();


    const { t, i18n } = useTranslation('sidebar');  // Obtenha o objeto i18n diretamente
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const instrument = searchParams?.get('instrument');

    const tutorialSteps = [
        { top: 80, text: "Aqui é a página inicial, onde você vê um resumo de tudo." },
        { top: 135, text: "Nesta aba você gerencia todos os seus usuários." },
        { top: 190, text: "Acesse aqui todas as avaliações realizadas." },
        { top: 245, text: "Gerencie os serviços disponíveis na plataforma." },
        { top: 300, text: "Saiba mais sobre nosso projeto e equipe" },

    ];

    const handleNext = () => {
        if (currentStep < tutorialSteps.length - 1) {
            setCurrentStep(prev => prev + 1);
        }
    };

    const handlePrev = () => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
        }
    };

    const handleClose = () => {
        setTutorial(false);
        setCurrentStep(0);
    }




    const toggleLanguage = () => {
        const newLang = i18n.language === 'en' ? 'pt' : 'en';  // Troca entre 'en' e 'pt'
        if ((newLang === 'en') && pathname && ['/specialist/services/instruments/fill'].includes(pathname) && instrument && ['eaz', 'leap'].includes(instrument)) return alert('This page is not available in English');
        i18n.changeLanguage(newLang).then(() => {
            console.log('Language changed to ' + newLang);
        }).catch(err => {
            console.error('Error changing language', err);
        });
    }


    useEffect(() => {
        theme && setThemeState(theme); // Passa o valor do hook de theme pra um state
    }, [theme])
    /* Explicação: passar o valor diretamente do hook para o JSX/view pode causar 
    um valor inconsistente dentro do JSX/view, de modo que a renderização da página 
    também não pode ser consistente e haverá um valor diferente entre o valor no SSR 
    e no cliente. */

    const Login = () => {
        if (session?.user) {
            return (
                <>
                    <User className="text-primary w-10 h-10 rounded-md" />
                    <div
                        className={`
              flex justify-between items-center
              overflow-hidden transition-all w-52 ml-3`}
                    >
                        <div className="leading-4">
                            <h4 className="font-semibold text-primary">{session?.user.name}</h4>
                            <span className="text-xs ">{session?.user.email}</span>
                        </div>
                        <LoginMenu />
                    </div>
                </>
            )
        } else {
            return (
                <Link className={buttonVariants({ variant: "default" })} href="/sign-in">
                    {t('loginLabel')}
                </Link>
            )
        }
    }

    const redirect = () => {
        const type = session?.user?.type;
        let redirect = "/"
        if (session?.user) {
            (type == "specialist") ? redirect = "/specialist" : redirect = "/user"
        }

        return redirect;
    }

    return (
        <aside className="print:hidden h-screen fixed z-10 top-0">
            <nav className="h-screen flex flex-col bg-primary-background "> {/*shadow-md shadow-slate-800/40 dark:shadow-slate-800*/}
                <div className="p-4 pb-2 flex flex-wrap justify-end items-end">
                    <Link href={redirect()} className="absolute top-4 left-2">
                        <Image
                            src={`/images/logo_emoframe.svg`}
                            className={``}
                            alt=""
                            width={expanded ? 120 : 0}
                            height={expanded ? 40 : 0}
                        />
                    </Link>

                    <div className="flex flex-col flex-wrap justify-between items-center gap-2">
                        <Button
                            onClick={() => setExpanded((curr) => !curr)}
                            variant="icon"
                            className=""
                        >
                            <Menu />
                        </Button>
                        
                    </div>
                </div>

                <SidebarContext.Provider value={{ expanded }}>
                    <ul className=" px-3">{children}</ul>

                </SidebarContext.Provider>

                {/* <div className={`absolute bottom-0 w-full flex justify-center items-center border-t border-muted p-3 ${!expanded && "invisible"}`}>
                    <Login />
                </div> */}
                {
                    showTutorial && (
                        <div
                            className="absolute left-20 z-50 w-64 bg-blue-500 p-4 rounded-lg shadow-xl text-white transition-all duration-300 ease-in-out"
                            style={{ top: `${tutorialSteps[currentStep].top}px` }}
                        >
                            <button onClick={handleClose} className="absolute top-2 right-2 text-blue-200 hover:text-white">
                                <X size={16} />
                            </button>

                            <p className="font-bold mb-2">Passo {currentStep + 1} de {tutorialSteps.length}</p>
                            <p className="text-sm mb-4">{tutorialSteps[currentStep].text}</p>

                            <div className="flex justify-between mt-2">
                                <button
                                    onClick={handlePrev}
                                    disabled={currentStep === 0}
                                    className={`flex items-center px-2 py-1 rounded text-sm ${currentStep === 0 ? 'opacity-50 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
                                >
                                    <ChevronLeft size={16} /> Anterior
                                </button>

                                <button
                                    onClick={handleNext}
                                    disabled={currentStep === tutorialSteps.length - 1}
                                    className={`flex items-center px-2 py-1 rounded text-sm ${currentStep === tutorialSteps.length - 1 ? 'opacity-50 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
                                >
                                    Próximo <ChevronRight size={16} />
                                </button>
                            </div>
                        </div>
                    )
                }

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
}

const SidebarItem = ({ icon, text, href, active = false, alert = false }: SidebarItemType) => {
    const { expanded } = useContext(SidebarContext);
    const { t } = useTranslation('sidebar');

    return (
        <Link href={href}>
            <li
                className={`
          relative flex items-center py-2 px-3 my-1
          font-medium rounded-md cursor-pointer
          transition-colors group
          ${active
                        ? "bg-primary text-primary-background"
                        : "hover:bg-primary-foreground "
                    }
          ${!expanded && "justify-center"}
      `}
            >
                {icon}
                <span
                    className={`overflow-hidden transition-all whitespace-nowrap ${expanded ? "w-52 ml-3" : "w-0"
                        }`}
                >
                    {text}
                </span>
                {alert && (
                    <div
                        className={`absolute right-2 w-2 h-2 rounded bg-primary-foreground ${expanded ? "" : "top-2"
                            }`}
                    />
                )}

                {!expanded && (
                    <div
                        className={`
            absolute left-full rounded-md px-2 py-1 ml-6
            bg-primary-foreground text-sm
            invisible opacity-20 -translate-x-3 transition-all
            group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
        `}
                    >
                        {text}
                    </div>
                )}
            </li>
        </Link>
    )
}

interface sidebarProps {
    tutorial?: boolean
}

const Sidebar = ({ tutorial = false }: sidebarProps) => {
    const { data: session } = useSession();
    const currentPath = usePathname();

    const { t } = useTranslation('sidebar');

    const isActive = (path: string) => {
        return currentPath === path;
    }

    const redirect = () => {
        const type = session?.user?.type;
        let redirect = "/"
        if (session?.user) {
            (type == "specialist") ? redirect = "/specialist" : redirect = "/user"
        }

        return redirect;
    }

    const globalItems: SidebarItemType[] = [
        { text: t('homeLabel'), href: redirect(), icon: <Home size={20} /> },
    ]

    const userItems: SidebarItemType[] = [
        { text: t('evaluationsLabel'), href: "/user/evaluations", icon: <BookOpenText size={20} /> },
    ]

    const specialistItems: SidebarItemType[] = [
        { text: t('usersLabel'), href: "/specialist/users", icon: <Users size={20} /> },
        { text: t('evaluationsLabel'), href: "/specialist/evaluations", icon: <BookOpenText size={20} /> },
        { text: t('servicesLabel'), href: "/specialist/services", icon: <BookUser size={20} /> },
        { text: t('resultsLabel'), href: "/specialist/results", icon: <LineChart size={20} /> },
    ]

    const bottomItems: SidebarItemType[] = [
        { text: t('aboutLabel'), href: "/about", icon: <Info size={20} /> },
    ]

    return (
        <SidebarCore tutorial={tutorial}>
            {
                globalItems.map((item, index) => (
                    <SidebarItem key={index} text={item.text} href={item.href} icon={item.icon} active={isActive(item.href)} />
                ))
            }
            {
                (session?.user.type == 'specialist') &&
                specialistItems.map((item, index) => (
                    <SidebarItem key={index} text={item.text} href={item.href} icon={item.icon} active={isActive(item.href)} />
                ))
            }
            {
                (session?.user.type == 'user') &&
                userItems.map((item, index) => (
                    <SidebarItem key={index} text={item.text} href={item.href} icon={item.icon} active={isActive(item.href)} />
                ))
            }
            {
                bottomItems.map((item, index) => (
                    <SidebarItem key={index} text={item.text} href={item.href} icon={item.icon} active={isActive(item.href)} />
                ))
            }
        </SidebarCore>
    )
}

export default Sidebar