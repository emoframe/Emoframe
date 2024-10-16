'use client';

import Reveal from "@/components/Reveal";
import { buttonVariants } from "../components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const contents: {title: String, description: String}[] = [
    {
        title: 'Avaliação Personalizada',
        description: 'Considera desde o perfil do usuário até o ambiente de avaliação, garantindo que o método escolhido seja o mais adequado',
    },
    {
        title: 'Ferramentas Integradas',
        description: 'Combina instrumentos de diferentes domínios para uma aplicação sistemática e eficaz',
    },
    {
        title: 'Processos Complexos Simplificados',
        description: 'Ideal para profissionais de computação e áreas afins que buscam uma solução integrada e prática',
    },
    {
        title: 'Apoio Multidisciplinar',
        description: 'Pensado para o campo interdisciplinar da IHC, mas também aplicável a outras áreas de avaliação',
    },
];

export default function Home() {
    const { theme } = useTheme();
    const [themeState, setThemeState] = useState<string>();

    useEffect(() => {
        theme && setThemeState(theme);
    }, [theme])

    return (
        <section className="w-full h-full flex flex-col">
            <div className="text-primary-background bg-primary flex flex-nowrap flex-row items-center justify-center gap-x-14 p-10">
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
                        <h1 className="text-[5rem] font-black">
                            EmoFrame
                        </h1>
                        <h2 className="text-2xl font-bold mb-4">
                            Um framework de apoio à etapa de avaliação de soluções computacionais
                        </h2>
                        <div className="font-extralight text-justify flex flex-col gap-4">
                            <p>
                                Avaliar corretamente um produto é crucial para garantir que ele atenda aos requisitos e expectativas. No desenvolvimento de software, uma avaliação eficaz permite identificar problemas que podem ter passado despercebidos nas etapas anteriores do processo.
                            </p>
                            <p>
                                O <b>EmoFrame</b> é um ambiente digital que oferece suporte à etapa de avaliação, ajudando a destacar falhas potenciais. Nossa solução foi projetada para considerar diversos fatores, como o perfil do usuário e o ambiente onde a avaliação será realizada, oferecendo uma seleção criteriosa dos métodos de avaliação mais adequados.
                            </p>
                            <p>
                            Escolher o método correto pode ser um desafio, especialmente na área de Interação Humano-Computador, devido a sua natureza interdisciplinar. O <b>EmoFrame</b> combina ferramentas de diferentes domínios para apoiar profissionais de computação e outras áreas na aplicação sistemática desses instrumentos, buscando fornecer resultados precisos e confiáveis.
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
                        Por que usar o EmoFrame?
                    </h2>
                    <div className="flex flex-wrap justify-center gap-6">
                        {contents.map(({title, description}, i) => (
                            <div key={i} className="max-w-xs flex flex-col justify-between gap-4">
                                <h2 className="text-xl text-center font-semibold">{title}</h2>
                                <p className="font-extralight text-justify">{description}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col items-center">
                    <h2 className="text-2xl font-bold mb-6">
                        Quer saber mais?
                    </h2>
                    <p className="font-extralight text-justify mb-5">
                        Descubra como o EmoFrame pode otimizar sua avaliação de software e melhorar a qualidade do seu produto.
                    </p>
                    <Link className={buttonVariants({variant: "default"})} href="/sign-up">
                        Cadastre-se
                    </Link> 
                </div>
            </div>
        </section>
    );
}
