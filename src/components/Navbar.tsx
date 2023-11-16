'use client';

import Link from "next/link";
import React from "react";
import { buttonVariants } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import UserMenu from "@/components/UserMenu";

const Navbar = () => {
    const { data: session } = useSession();

    const IsLogged = () => {
        if(session?.user) {
          return (
            <UserMenu/>
          )
        } else {
            return (
                <Link className={buttonVariants({variant: "outline"})} href="/sign-in">
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
        <div className=" h-navbar bg-zinc-100 flex items-center justify-between border-b border-s-zinc-200 fixed w-full z-10 top-0">
            <div className="container flex items-center justify-between">
                <Link href={redirect()}>
                    Logo
                </Link>
                <IsLogged/>
            </div>
        </div>
    );
};

export default Navbar;
