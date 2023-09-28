'use client';

import Link from "next/link";
import React from "react";
import { buttonVariants } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";

const Navbar = () => {

    const IsLogged = () => {
        const { data: session } = useSession();

        if (session?.user) {
          return (
            <button className={buttonVariants()} onClick={() => signOut()}>Sair</button>
          )
        } else {
            return (
                <Link className={buttonVariants()} href="/sign-in">
                    Entre
                </Link> 
            )
        }
      }
      
    
    return (
        <div className=" h-navbar bg-zinc-100 flex items-center justify-between border-b border-s-zinc-200 fixed w-full z-10 top-0">
            <div className="container flex items-center justify-between">
                <Link href="/">
                    Logo
                </Link>
                <IsLogged/>
            </div>
        </div>
    );
};

export default Navbar;
