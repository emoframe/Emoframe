'use client';

import Image from "next/image"
import { Trans, useTranslation } from "react-i18next"

const contents: {picture: string, name: string, role: string}[] = [
    {
        picture: '/images/kamila.jpeg',
        name: 'Kamila Rios',
        role: 'Orientadora',
    },
    {
        picture: '/images/suzane.jpeg',
        name: 'Suzane Santos',
        role: 'Coordenadora',
    },
    {
        picture: '/images/marcus.jpeg',
        name: 'Marcus Rodrigues',
        role: 'Desenvolvedor',
    },
    {
        picture: '/images/pedro.jpg',
        name: 'Pedro Falcão',
        role: 'Desenvolvedor',
    },
]

const publications = [
    {
        year: 2024,
        title: 'Desenvolvimento de um framework de apoio à etapa de avaliação de soluções computacionais e à coleta de dados de indivíduos',
        src: 'https://sol.sbc.org.br/index.php/ihc_estendido/article/view/30665',
    },
    {
        year: 2024,
        title: 'Proposta de um framework de apoio à etapa de avaliação de soluções computacionais',
        src: 'https://sol.sbc.org.br/index.php/webmedia_estendido/article/view/30490',
    },
    {
        year: 2024,
        title: 'Desenvolvimento de um ambiente digital integrado de apoio à etapa de avaliação de soluções computacionais',
        src: 'https://sol.sbc.org.br/index.php/ihc_estendido/article/view/30645',
    },
    {
        year: 2023,
        title: 'Analyzing the Results of a Gerontology Data Collection Instrument - How do Specialists and Non-specialists Interpret the Data?',
        src: 'https://dl.acm.org/doi/10.1145/3638067.3638096',
    },
    {
        year: 2023,
        title: 'ePAGe: Sistematização do Plano de Atenção Gerontológica (PAGe)',
        src: 'https://periodicos.univali.br/index.php/acotb/article/view/19431',
    },
    {
        year: 2023,
        title: 'Um framework com instrumentos para coleta de respostas emocionais de usuários frente a sistemas interativos',
        src: 'https://sol.sbc.org.br/index.php/ihc_estendido/article/view/26493',
    },
    {
        year: 2022,
        title: 'EmoFrame: Prototype of a Framework to Assess Users’ Emotional Responses',
        src: 'https://link.springer.com/chapter/10.1007/978-3-031-17615-9_20',
    },
];

export default function About(){
    const { t } = useTranslation('about');
    return (
        <section className="h-full max-w-screen-xl p-10">
            <div className="flex flex-col items-center">
                <h2 className="text-2xl font-bold mb-6">{t('title')}</h2>
            </div>
            <p className="font-extralight text-justify mb-8">
                <Trans ns="about" i18nKey="description_1" components={{b: <b/>}}/>
            </p>
            <p className="font-extralight text-justify mb-8">{t('description_2')}</p>
            <div className="w-full flex flex-wrap justify-center gap-5 mb-8">
                {contents.map(({picture, name, role}, i) => (
                    <div key={i} className="bg-primary-background p-5 rounded-lg max-w-xs flex flex-col justify-between gap-4">
                        <Image src={picture} alt="" width="200" height="200" className="h-[200px] object-cover rounded-lg"/>
                        <h2 className="text-xl text-center font-semibold">{name}</h2>
                        <p className="text-xl font-extralight text-center">{role}</p>
                    </div>
                ))}
            </div>
            <h2 className="text-2xl font-bold mb-6">{t('motivationTitle')}</h2>
            <p className="font-extralight text-justify">{t('motivationDescription')}</p>
            <ul className="list-disc list-inside mb-8 font-extralight">
                <li>{t('motivationDescriptionItem_1')}</li>
                <li>
                    <Trans ns="about" i18nKey="motivationDescriptionItem_2" components={{b: <b/>}}/>
                </li>
                <li>{t('motivationDescriptionItem_3')}</li>
                <li>{t('motivationDescriptionItem_4')}</li>
            </ul>
            <h2 className="text-2xl font-bold mb-6">{t('featuresTitle')}</h2>
            <ul className="list-decimal mb-8 font-extralight flex flex-col gap-4">
                <li>
                    <h3 className="text-xl font-bold">{t('featuresItemTitle_1')}</h3>
                    <p className="font-extralight text-justify">
                        <Trans ns="about" i18nKey="featuresItemDescription_1" components={{b: <b/>}}/>
                    </p>
                </li>
                <li>
                    <h3 className="text-xl font-bold">{t('featuresItemTitle_2')}</h3>
                    <p className="font-extralight text-justify">{t('featuresItemDescription_2')}</p>
                    <ul className="list-disc list-inside font-extralight">
                        <li>{t('featuresItemDescription_2Item_1')}</li>
                        <li>{t('featuresItemDescription_2Item_2')}</li>
                        <li>{t('featuresItemDescription_2Item_3')}</li>
                    </ul>
                </li>
                <li>
                    <h3 className="text-xl font-bold">{t('featuresItemTitle_3')}</h3>
                    <ul className="list-disc list-inside font-extralight">
                        <li>
                            <Trans ns="about" i18nKey="featuresItemDescription_3Item_1" components={{b: <b/>}}/>
                        </li>
                        <li>
                            <Trans ns="about" i18nKey="featuresItemDescription_3Item_2" components={{b: <b/>}}/>
                        </li>
                        <li>
                            <Trans ns="about" i18nKey="featuresItemDescription_3Item_3" components={{b: <b/>}}/>
                        </li>
                    </ul>
                </li>
            </ul>
            <h2 className="text-2xl font-bold mb-6">{t('benefitsTitle')}</h2>
            <p className="font-extralight text-justify">{t('benefitsDescription')}</p>
            <ul className="list-disc list-inside mb-8 font-extralight">
                <li>{t('benefitsDescriptionItem_1')}</li>
                <li>{t('benefitsDescriptionItem_2')}</li>
            </ul>
            <h2 className="text-2xl font-bold mb-6">{t('publicationsTitle')}</h2>
            <ul className="list-disc list-inside mb-8 font-extralight">
                {publications.map(({year, title, src}, i) => (
                    <li key={i}>
                        <a href={src} target="_blank" rel="noreferrer" className="text-primary hover:underline">
                            {title} ({year})
                        </a>
                    </li>
                ))}
            </ul>
        </section>
    )
}