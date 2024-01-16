"use client";

import { ChevronLast, ChevronFirst, User, Users, LucideIcon } from "lucide-react";
import { useContext, createContext, useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { buttonVariants, Button } from "../ui/button";
import Link from "next/link";
import LoginMenu from "./LoginMenu";

/*
  Criar componente com items de user e specialist
*/

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
        <div className="border-t flex p-3">
          <User className="w-10 h-10 rounded-md"/>
          <div
            className={`
              flex justify-between items-center
              overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}
          `}
          >
            <div className="leading-4">
              <h4 className="font-semibold">{session?.user.name}</h4>
              <span className="text-xs text-gray-600">{session?.user.email}</span>
            </div>
            <LoginMenu/>
          </div>
        </div>
      )
    } else {
        return (
            <Link className={buttonVariants({variant: "sidebar"})} href="/sign-in">
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
    <aside className="h-screen">
      <nav className="h-full flex flex-col bg-white border-r shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center">
          <Link href={redirect()}>
            <Image
              src="https://img.logoipsum.com/243.svg"
              className={`overflow-hidden transition-all ${
                expanded ? "w-32" : "w-0"
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
          <ul className="flex-1 px-3">{children}</ul>
        </SidebarContext.Provider>

        <Login/>
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
              ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
              : "hover:bg-indigo-50 text-gray-600"
          }
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
            className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
              expanded ? "" : "top-2"
            }`}
          />
        )}

        {!expanded && (
          <div
            className={`
            absolute left-full rounded-md px-2 py-1 ml-6
            bg-indigo-100 text-indigo-800 text-sm
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
      {
        (session?.user.type == 'specialist') &&
        <>
          <SidebarItem icon={<Users size={20} />} text="Usuários" href="/specialist"/>
        </>
      }
      <SidebarItem icon={<Users size={20} />} text="Teste" href="/"/>
    </SidebarCore>
  )
}

export default Sidebar