import Link from "next/link";
import React from "react";
import { buttonVariants } from "@/components/ui/button";

const Navbar = () => {
    return (
        <div className=" h-navbar bg-zinc-100 flex items-center justify-between border-b border-s-zinc-200 fixed w-full z-10 top-0">
            <div className="container flex items-center justify-between">
                <Link href="/">
                    Logo
                </Link>
                <Link className={buttonVariants()} href="/sign-in">
                    Entre
                </Link>
            </div>
        </div>
    );
};

export default Navbar;
