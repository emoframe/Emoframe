'use client';

import Reveal from "@/components/Reveal";
import { buttonVariants } from "../components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Trans, useTranslation } from 'react-i18next';
import "@/config/i18";
import HomeCard from "@/components/HomeCard";
import { HomeModel } from "@/types/forms";


const contents: { title: string, description: string, type: HomeModel, odd: boolean, image: string}[] = [
    {
        title: 'Avaliação Personalizada',
        description: 'Considera desde o perfil do usuário até o ambiente de avaliação, garantindo que o método escolhido seja o mais adequado',
        type: HomeModel.Avaliation,
        odd: true,
        image: `/images/emo_smile.svg`
    },
    {
        title: 'Ferramentas Integradas',
        description: 'Combina instrumentos de diferentes domínios para uma aplicação sistemática e eficaz.',
        type: HomeModel.Tool,
        odd: false,
        image: `/images/emo_tool.svg`
    },
    {
        title: 'Processos Simplificados',
        description: 'Ideal para profissionais de computação e áreas afins que buscam uma solução integrada e prática',
        type: HomeModel.Process,
        odd: true,
        image: `/images/emo_process.svg`
    },
    {
        title: 'Apoio Multidisciplinar',
        description: 'Pensado para o campo interdisciplinar da IHC, mas também aplicável a outras áreas de avaliação',
        type: HomeModel.Support,
        odd: false,
        image: `/images/emo_support.svg`
    },
];

export default function Home() {
    const { theme } = useTheme();
    const [themeState, setThemeState] = useState<string>();
    const { t } = useTranslation('home');

    useEffect(() => {
        theme && setThemeState(theme);
    }, [theme])

    return (
        <main className="w-full h-full flex flex-col items-center">
            <header className="w-full p-8 pl-20 h-16 flex items-center justify-between bg-[#ffffff] shadow-[0px_9px_6px_0px_rgba(0,_0,_0,_0.1)]">
                <div>
                    <Image
                        src={`/images/home_page_logo_${themeState}.svg`}
                        alt=""
                        height="160"
                        width="160"
                    />
                </div>

                <div className="flex items-center gap-6">
                    <Link className={buttonVariants({ variant: "alternative" })} href="/sign-in">
                        Fazer login
                    </Link>
                    <Link className={buttonVariants({ variant: "default" })} href="/sign-up">
                        Criar uma conta
                    </Link>
                </div>
            </header>

            <section className="flex items-center w-full justify-evenly h-screen">
                <div className="flex flex-col justify-center gap-8">
                    <div><h2 className="text-5xl font-black text-primary">Um Framework para<br />Avaliação de Soluções<br />Computacionais</h2></div>
                    <div><p className="text-primary">Avaliar corretamente um produto é crucial para garantir<br /> que ele atenda aos requisitos e expectativas.</p></div>
                </div>
                <div className="flex flex-col items-center justify-center gap-4">
                    <Image
                        src={`/images/fun_icons.svg`}
                        alt=""
                        height="240"
                        width="240"
                    />
                    <Link className={buttonVariants({ variant: "default" })} href="/sign-up">
                        Criar uma conta
                    </Link>
                </div>
            </section>

            <section className="h-fit w-full flex items-center justify-between gap-40 flex-col pb-20">
                {contents.map(({title, description, odd, type, image}) => (
                    <HomeCard 
                        title={title}
                        description={description}
                        odd={odd}
                        image={image}
                        type={type}
                    />
                ))}
                
            </section>

        </main>
    );
}
