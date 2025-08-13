"use client";

import {
    ChevronLast, ChevronFirst, User,
    Users, LineChart, BookOpenText, BookUser,
    Home, Info, PersonStanding, Sun, Moon, AArrowUp, AArrowDown
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

type SidebarContextType = {
    expanded: boolean;
}

const SidebarContext = createContext<SidebarContextType>({ expanded: false });

const SidebarCore = ({ children }) => {

    const { data: session } = useSession();

    const [expanded, setExpanded] = useState(false);

    const { theme, setTheme } = useTheme();
    const [themeState, setThemeState] = useState<string>();
    
    const { t, i18n } = useTranslation('sidebar');  // Obtenha o objeto i18n diretamente
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const instrument = searchParams?.get('instrument');
    const toggleLanguage = () => {
        const newLang = i18n.language === 'en' ? 'pt' : 'en';  // Troca entre 'en' e 'pt'
        if((newLang === 'en') && pathname && ['/specialist/services/instruments/fill'].includes(pathname) && instrument && ['eaz', 'leap'].includes(instrument)) return alert('This page is not available in English');
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
            <nav className="h-screen flex flex-col bg-primary-background shadow-md shadow-slate-800/40 dark:shadow-slate-800">
                <div className="p-4 pb-2 flex flex-wrap justify-between items-center">
                    <Link href={redirect()}>
                        <Image
                            src={`/images/logo_emoframe.svg`}
                            className={`overflow-hidden transition-all`}
                            alt=""
                            width={expanded ? 160 : 0}
                            height={expanded ? 40 : 0}
                        />
                    </Link>

                    <div className="flex flex-col flex-wrap justify-between items-center gap-2">
                        <Button
                            onClick={() => setExpanded((curr) => !curr)}
                            variant="icon"
                        >
                            {expanded ? <ChevronFirst /> : <ChevronLast />}
                        </Button>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                            <Button variant="icon">
                                <PersonStanding />
                                <span className="sr-only">Acessibilidade</span>
                            </Button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent align="end">

                                <DropdownMenuLabel>{t('accessibilityLabel')}</DropdownMenuLabel>
                                <DropdownMenuSeparator />

                                <div className="flex gap-1">
                                    <Button variant="icon" size="icon" onClick={() => setTheme((theme === 'dark') ? 'light' : 'dark')}>
                                        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                                        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                                        <span className="sr-only">Alto contraste</span>
                                    </Button>
                                    <Button variant="icon" size="icon" onClick={() => document.documentElement.style.fontSize = `${parseFloat(window.getComputedStyle(document.documentElement, null).getPropertyValue('font-size')) + 2}px`}>
                                        <AArrowUp className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all"/>
                                        <span className="sr-only">Aumentar fonte</span>
                                    </Button>
                                    <Button variant="icon" size="icon" onClick={() => document.documentElement.style.fontSize = `${parseFloat(window.getComputedStyle(document.documentElement, null).getPropertyValue('font-size')) - 2}px`}>
                                        <AArrowDown className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all"/>
                                        <span className="sr-only">Diminuir fonte</span>
                                    </Button>
                                </div>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <button onClick={toggleLanguage}>{i18n.language === 'en' ? 'pt' : 'en'}</button>
                    </div>
                </div>

                <SidebarContext.Provider value={{ expanded }}>
                    <ul className=" px-3">{children}</ul>

                </SidebarContext.Provider>

                <div className={`absolute bottom-0 w-full flex justify-center items-center border-t border-muted p-3 ${!expanded && "invisible"}`}>
                    <Login />
                </div>
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
                        ? "bg-gradient-to-tr from-primary to-primary-foreground text-primary-background"
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

const Sidebar = () => {
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
        <SidebarCore>
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