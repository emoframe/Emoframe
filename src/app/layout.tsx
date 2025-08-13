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

const vlibras = `
  <div vw class="enabled">
    <div vw-access-button class="active"></div>
    <div vw-plugin-wrapper>
      <div class="vw-plugin-top-wrapper"></div>
    </div>
  </div>
  <script src="https://vlibras.gov.br/app/vlibras-plugin.js"></script>
  <script>
    new window.VLibras.Widget('https://vlibras.gov.br/app');
  </script>
`;

export default function RootLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <SessionProvider>
                <body className={cn("flex flex-1 w-full min-h-full h-fit bg-background print:bg-white", inter.className)}>
                    <ThemeProvider attribute="class" defaultTheme="light" disableTransitionOnChange>
                        <Sidebar/>
                        <main className="flex flex-1 flex-col justify-center items-center ml-sidebar print:ml-0">
                            {children}
                        </main>
                        <Toaster/>
                    </ThemeProvider>
                    <div className='print:hidden' dangerouslySetInnerHTML={{__html: vlibras}}></div>
                </body>
            </SessionProvider>
        </html>
    );
}
