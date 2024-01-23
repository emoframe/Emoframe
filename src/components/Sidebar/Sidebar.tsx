"use client";

import { ChevronLast, ChevronFirst, User, 
         Users, LineChart, BookOpenText, BookUser,
         Home
} from "lucide-react";
import { useContext, createContext, useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { buttonVariants, Button } from "../ui/button";
import Link from "next/link";
import LoginMenu from "./LoginMenu";

type SidebarContextType = {
    expanded: boolean;
}

const SidebarContext = createContext<SidebarContextType>({expanded: false});

const SidebarCore = ({ children }) => {

  const { data: session } = useSession();

  const [expanded, setExpanded] = useState(false)

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
      <nav className="h-full flex flex-col bg-white border-r shadow-sm">
        <div className="p-4 pb-2 flex flex-wrap justify-between items-center">
          <Link href={redirect()}>
            <img
              src="images/emoframe-logo.png"
              className={`overflow-hidden transition-all ${
                expanded ? "h-12" : "w-0"
              }`}
              alt=""
            />
          </Link>
          
          <Button
            onClick={() => setExpanded((curr) => !curr)}
            variant="expand"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </Button>
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
          {text}
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
            bg-primary-foreground  text-sm
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

  return (
    <SidebarCore>
      <SidebarItem icon={<Home size={20} />} text="Início" href="/"/>
      {
        (session?.user.type == 'specialist') &&
        <>
          <SidebarItem icon={<Users size={20} />} text="Usuários" href="/specialist/users"/>
          <SidebarItem icon={<BookOpenText size={20} />} text="Avaliações" href="/specialist/evaluations"/>
          <SidebarItem icon={<BookUser size={20} />} text="Instrumentos" href="/specialist/instruments"/>
          <SidebarItem icon={<LineChart size={20} />} text="Resultados" href="/specialist/results"/>
        </>
      }
    </SidebarCore>
  )
}

export default Sidebar