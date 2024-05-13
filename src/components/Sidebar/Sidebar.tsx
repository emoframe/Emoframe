"use client";

import { ChevronLast, ChevronFirst, User, 
         Users, LineChart, BookOpenText, BookUser,
         Home
} from "lucide-react";
import { useContext, createContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { buttonVariants, Button } from "../ui/button";
import Link from "next/link";
import LoginMenu from "./LoginMenu";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useTheme } from "next-themes";
import { useTranslation } from 'react-i18next';




type SidebarContextType = {
    expanded: boolean;
}

const SidebarContext = createContext<SidebarContextType>({expanded: false});

const SidebarCore = ({ children }) => {

  const { data: session } = useSession();

  const [expanded, setExpanded] = useState(false);

  const { theme } = useTheme();
  const [themeState, setThemeState] = useState<string>();

  useEffect(() => {
    theme && setThemeState(theme); // Passa o valor do hook de theme pra um state
  },[theme])
  /* Explicação: passar o valor diretamente do hook para o JSX/view pode causar 
  um valor inconsistente dentro do JSX/view, de modo que a renderização da página 
  também não pode ser consistente e haverá um valor diferente entre o valor no SSR 
  e no cliente. */

  const Login = () => {
    if(session?.user) {
      return (
        <>
          <User className="text-primary w-10 h-10 rounded-md"/>
          <div
            className={`
              flex justify-between items-center
              overflow-hidden transition-all w-52 ml-3`}
          >
            <div className="leading-4">
              <h4 className="font-semibold text-primary">{session?.user.name}</h4>
              <span className="text-xs ">{session?.user.email}</span>
            </div>
            <LoginMenu/>
          </div>
        </>
      )
    } else {
        return (
            <Link className={buttonVariants({variant: "default"})} href="/sign-in">
                Entre
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
    <aside className="h-screen fixed z-10 top-0">
      <nav className="h-full flex flex-col bg-primary-background border-r shadow-sm">
        <div className="p-4 pb-2 flex flex-wrap justify-between items-center">
          <Link href={redirect()}>
            <Image
              src={`/images/emoframe-logo-${themeState}.svg`}
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
            <ThemeToggle />
          </div>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className=" px-3">{children}</ul>
        </SidebarContext.Provider>

        <div className={`absolute bottom-0 w-full flex justify-center items-center border-t p-3 ${!expanded && "invisible"}`}>
          <Login/>
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

const SidebarItem = ({ icon, text, href, active = false, alert = false}: SidebarItemType) => {
  const { expanded } = useContext(SidebarContext)
  const { t, i18n } = useTranslation();  // Obtenha o objeto i18n diretamente

  const changeLanguage = lng => {
    console.log(i18n); // Confira se o objeto i18n está completo
    i18n.changeLanguage(lng).then(() => {
      console.log('Language changed to ' + lng);
    }).catch(err => {
      console.error('Error changing language', err);
    });
  }
  
  return (
    <Link href={href}>
      <li
        className={`
          relative flex items-center py-2 px-3 my-1
          font-medium rounded-md cursor-pointer
          transition-colors group
          ${
            active
              ? "bg-gradient-to-tr from-primary to-primary-foreground text-primary-background"
              : "hover:bg-primary-foreground "
          }
          ${!expanded && "justify-center"}
      `}
      >
        {icon}
        <span
          className={`overflow-hidden transition-all ${
            expanded ? "w-52 ml-3" : "w-0"
          }`}
        >
          {t(text)}
        </span>
        {alert && (
          <div
            className={`absolute right-2 w-2 h-2 rounded bg-primary-foreground ${
              expanded ? "" : "top-2"
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
            {t(text)}
          </div>
        )}
      </li>
        
      <button onClick={() => changeLanguage('en')}>en</button>
    </Link>
  )
}

const Sidebar = () => {
  const { data: session } = useSession();

  const redirect = () => {
    const type = session?.user?.type;
    let redirect = "/"
    if (session?.user) {
        (type == "specialist") ? redirect = "/specialist" : redirect = "/user"
    } 

    return redirect;
  }

  return (
    <SidebarCore>
      <SidebarItem icon={<Home size={20} />} text="Início" href={redirect()}/>
      {
        (session?.user.type == 'specialist') &&
        <>
          <SidebarItem icon={<Users size={20} />} text="Usuários" href="/specialist/users"/>
          <SidebarItem icon={<BookOpenText size={20} />} text="Avaliações" href="/specialist/evaluations"/>
          <SidebarItem icon={<BookUser size={20} />} text="Serviços" href="/specialist/services"/>
          <SidebarItem icon={<LineChart size={20} />} text="Resultados" href="/specialist/results"/>
        </>
      }
      {
        (session?.user.type == 'user') &&
        <>
          <SidebarItem icon={<BookOpenText size={20} />} text="Avaliações" href="/user/evaluations"/>
        </>
      }
    </SidebarCore>
  )
}

export default Sidebar