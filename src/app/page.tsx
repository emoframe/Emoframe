'use client';

import Reveal from "@/components/Reveal";
import { buttonVariants } from "../components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Trans, useTranslation } from 'react-i18next';
import "@/config/i18";

const contents: {title: string, description: string}[] = [
    {
        title: 'reasoningItemTitle_1',
        description: 'reasoningItemDescription_1',
    },
    {
        title: 'reasoningItemTitle_2',
        description: 'reasoningItemDescription_2',
    },
    {
        title: 'reasoningItemTitle_3',
        description: 'reasoningItemDescription_3',
    },
    {
        title: 'reasoningItemTitle_4',
        description: 'reasoningItemDescription_4',
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
        <section className="w-full h-full flex flex-col">
            <div className="text-primary-background bg-primary flex flex-nowrap flex-col md:flex-row items-center justify-center gap-6 md:gap-14 p-10">
                <Reveal>
                    <Image
                        src={`/images/logo_sem_nome_${themeState}.svg`}
                        alt=""
                        height="256"
                        width="256"
                    />
                </Reveal>
                <Reveal>
                <div className="max-w-[700px] relative">
                        <h1 className="text-7xl font-black leading-none mb-4">
                            Emo​Frame
                        </h1>
                        <h2 className="text-2xl font-bold mb-4">
                            {t('subtitle')}
                        </h2>
                        <div className="font-extralight text-justify flex flex-col gap-4">
                            <p>
                                {t('description_1')}
                            </p>
                            <p>
                                <Trans ns="home" i18nKey="description_2" components={{b: <b/>}}/>
                            </p>
                            <p>
                            <Trans ns="home" i18nKey="description_3" components={{b: <b/>}}/>
                            </p>
                        </div>
                </div>
                </Reveal>
            </div>
            <div className="bg-primary w-full h-24">
                <svg className="h-24 w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
                    <path className="text-background fill-current" fillOpacity="0.99" d="M0,288L60,245.3C120,203,240,117,360,112C480,107,600,181,720,229.3C840,277,960,299,1080,256C1200,213,1320,107,1380,53.3L1440,0L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
                </svg>  
            </div>
            <div className="flex flex-col gap-8 p-10">
                <div className="flex flex-col items-center">
                    <h2 className="text-2xl font-bold mb-6">
                        {t('reasoningTitle')}
                    </h2>
                    <div className="flex flex-wrap justify-center gap-6">
                        {contents.map(({title, description}, i) => (
                            <div key={i} className="max-w-xs flex flex-col justify-between gap-4">
                                <h2 className="text-xl text-center font-semibold">{t(title)}</h2>
                                <p className="font-extralight text-justify">{t(description)}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col items-center">
                    <h2 className="text-2xl font-bold mb-6">
                        {t('knowMoreTitle')}
                    </h2>
                    <p className="font-extralight text-justify mb-5">
                        {t('knowMoreDescription')}
                    </p>
                    <Link className={buttonVariants({variant: "default"})} href="/sign-up">
                        {t('registerLabel')}
                    </Link> 
                </div>
            </div>
        </section>
    );
}
