import '@/styles/globals.css';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Sidebar from "@/components/sidebar/Sidebar";
import { Toaster } from "@/components/ui/toaster";
import SessionProvider from "@/components/provider/SessionProvider";
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/ThemeProvider';

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
                <body className={cn("flex flex-1 w-full min-h-full h-fit bg-background", inter.className)}>
                    <ThemeProvider attribute="class" defaultTheme="light" disableTransitionOnChange>
                        <Sidebar/>
                        <main className="flex flex-1 flex-col justify-center items-center pl-sidebar">
                            {children}
                        </main>
                        <Toaster/>
                    </ThemeProvider>
                </body>
            </SessionProvider>
        </html>
    );
}
