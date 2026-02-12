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


export default function Home() {
    const { theme } = useTheme();
    const [themeState, setThemeState] = useState<string>();
    const { t } = useTranslation('home');

    useEffect(() => {
        theme && setThemeState(theme);
    }, [theme])



const contents: { title: string, description: string, type: HomeModel, odd: boolean, image: string}[] = [
    {
        title: t('reasoningItemTitle_1'),
        description: t('reasoningItemDescription_1'),
        type: HomeModel.Avaliation,
        odd: true,
        image: `/images/emo_smile.svg`
    },
    {
        title: t('reasoningItemTitle_2'),
        description: t('reasoningItemDescription_2'),
        type: HomeModel.Tool,
        odd: false,
        image: `/images/emo_tool.svg`
    },
    {
        title: t('reasoningItemTitle_3'),
        description: t('reasoningItemDescription_3'),
        type: HomeModel.Process,
        odd: true,
        image: `/images/emo_process.svg`
    },
    {
        title: t('reasoningItemTitle_2'),
        description: t('reasoningItemDescription_2'),
        type: HomeModel.Support,
        odd: false,
        image: `/images/emo_support.svg`
    },
];

    return (
        <main className="w-full h-full flex flex-col items-center overflow-x-hidden">
            <header className="w-full p-4 md:pl-20 min-h-6 flex flex-col md:flex-row items-center justify-between bg-[#ffffff] shadow-[0px_9px_6px_0px_rgba(0,_0,_0,_0.1)] gap-4 md:gap-0">
                <div className="shrink-0">
                    <Image
                        src={`/images/home_page_logo_${themeState}.svg`}
                        alt="Logo"
                        height="160"
                        width="160"
                        className="w-32 md:w-40 h-auto" 
                    />
                </div>

                <div className="flex items-center gap-4 md:gap-6">
                    <Link className={buttonVariants({ variant: "alternative", size: "sm" })} href="/sign-in">
                        Fazer login
                    </Link>
                    <Link className={buttonVariants({ variant: "default", size: "sm" })} href="/sign-up">
                        Criar uma conta
                    </Link>
                </div>
            </header>

            <section className="flex flex-col lg:flex-row items-center w-full justify-center lg:justify-evenly min-h-[calc(100vh-80px)] py-12 px-6 gap-10 lg:gap-0">
                <div className="flex flex-col justify-center gap-6 md:gap-8 text-center lg:text-left max-w-2xl">
                    <div>
                        <h2 className="text-3xl md:text-5xl font-black text-primary leading-tight">
                            {t('subtitle')}
                        </h2>
                    </div>
                    <div>
                        <p className="text-primary text-base md:text-lg">
                            {t('description_1')}
                        </p>
                    </div>
                </div>

                <div className="flex flex-col items-center justify-center gap-6">
                    <Image
                        src={`/images/fun_icons.svg`}
                        alt="Icons"
                        height="240"
                        width="240"
                        className="w-48 h-48 md:w-60 md:h-60" 
                    />
                    <Link className={`${buttonVariants({ variant: "default" })} w-full md:w-auto`} href="/sign-up">
                        Criar uma conta
                    </Link>
                </div>
            </section>

            <section className="h-fit w-full flex items-center justify-between flex-col pb-20 px-4 md:px-0">
                <div className="flex flex-col gap-16 md:gap-40 w-full max-w-6xl items-center">
                    {contents.map(({title, description, odd, type, image}, index) => (
                        <HomeCard 
                            key={index}
                            title={title}
                            description={description}
                            odd={odd}
                            image={image}
                            type={type}
                        />
                    ))}
                </div>
            </section>

        </main>
    );
}