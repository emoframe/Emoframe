import Navbar from "@/components/Navbar";
import SessionProvider from "@/components/provider/SessionProvider";
import '@/styles/globals.css';
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <SessionProvider>
                    <Navbar />
                    <main className="flex flex-col justify-center items-center min-h-screen pt-[var(--navbar)] w-full">
                        {children}
                    </main>
                </SessionProvider>
            </body>
        </html>
    );
}
