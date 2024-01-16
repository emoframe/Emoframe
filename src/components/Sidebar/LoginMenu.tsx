'use client';

import React from "react";
import {
    LogOut,
    MoreVertical,
    User,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoginMenu = () => {
    const { data: session } = useSession();
    const router = useRouter();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <MoreVertical size={20} />
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => router.push("/profile")}>
                        <User className="mr-2 h-4 w-4" />
                        <span>Perfil</span>
                    </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => {signOut({callbackUrl: "/"})}}>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Sair</span>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default LoginMenu;
