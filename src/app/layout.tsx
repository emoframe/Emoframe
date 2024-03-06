import '@/styles/globals.css';
import type { Metadata } from "next";
import { Inter, The_Girl_Next_Door } from "next/font/google";
import Sidebar from "@/components/Sidebar/Sidebar";
import { Toaster } from "@/components/ui/toaster";
import SessionProvider from "@/components/provider/SessionProvider";
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/ThemeProvider';

import { Button } from "@/components/ui/button";
import { BiUniversalAccess } from "react-icons/bi";

import { useAppSelector, useAppDispatch } from '@/app/hooks';
import { Accessibility } from 'lucide-react';
import AccessibilityMenu from '@/components/AccessibilityMenu';

import ReduxProvider from '@/components/provider/ReduxProvider';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Emoframe",
    description: "Descrição",
};

export default function RootLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <SessionProvider>
                <ReduxProvider>
                <body className={cn("flex flex-1 w-full min-h-full h-fit bg-background", inter.className)}>
                    <ThemeProvider attribute="class" defaultTheme="light" disableTransitionOnChange>
                        <Sidebar/>
                        <main className="flex flex-1 flex-col justify-center items-center pl-sidebar py-16">
                            {children}
                        </main>
                        <Toaster/>
                        <AccessibilityMenu />
                    </ThemeProvider>
                </body>
                </ReduxProvider>
            </SessionProvider>
        </html>
    );
}