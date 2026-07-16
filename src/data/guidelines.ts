import { Guideline, GuidelineCategory } from '@/types/guideline';

export const GUIDELINES_BASE_PATH = '/specialist/services/guidelines';

export function getCategoryPath(categoryId: string): string {
  return `${GUIDELINES_BASE_PATH}/${categoryId}`;
}

export function getGuidelinePath(categoryId: string, guidelineId: string): string {
  return `${getCategoryPath(categoryId)}/${guidelineId}`;
}

export const guidelineCategories: GuidelineCategory[] = [
  {
    id: 'acessibilidade-inclusao',
    label: 'Acessibilidade e Inclusão',
    description: 'Normas, padrões e princípios arquiteturais para garantir ambientes digitais acessíveis a todos.',
    colorClass: 'text-[#1881BF]',
  },
  {
    id: 'usabilidade-design',
    label: 'Usabilidade e Design',
    description: 'Heurísticas, regras e frameworks voltados para a qualidade e avaliação de interfaces.',
    colorClass: 'text-primary',
  },
  {
    id: 'educacao-cognicao',
    label: 'Educação e Cognição',
    description: 'Diretrizes focadas em tecnologias educacionais, neurodivergência e remoção de barreiras cognitivas.',
    colorClass: 'text-[#EF7700]',
  },
  {
    id: 'jogos-gamificacao',
    label: 'Jogos e Gamificação',
    description: 'Critérios e modelos de avaliação voltados ao design lúdico e acessibilidade em jogos.',
    colorClass: 'text-[#191919]',
  },
];
export const guidelines: Guideline[] = [
  {
    id: 'wcag',
    categoryId: 'acessibilidade-inclusao',
    title: 'Web Content Accessibility Guidelines (WCAG)',
    summary: 'Norma padrão internacional criada através da Iniciativa de Acessibilidade na Web (WAI) do W3C para tornar o conteúdo digital acessível.',
    updatedAt: '16 jul. 2026',
    colorClass: 'text-[#1881BF]',
    sections: [
      { heading: 'Contexto', body: ['Acessibilidade'] },
      {
        heading: 'Descrição',
        body: ['Abrange diversas recomendações e diretrizes projetadas para tornar o conteúdo da web acessível a todas as pessoas, incluindo uma ampla gama de deficiências, garantindo que o conteúdo digital seja perceptível, operável, compreensível e robusto.']
      },
      { heading: 'Referência', body: ['https://www.w3.org/TR/WCAG22/'] },
    ],
  },
  {
    id: 'abnt-nbr-17225',
    categoryId: 'acessibilidade-inclusao',
    title: 'ABNT NBR 17225',
    summary: 'Norma técnica brasileira voltada para a padronização e critérios específicos de acessibilidade.',
    updatedAt: '16 jul. 2026',
    colorClass: 'text-[#1881BF]',
    sections: [
      { heading: 'Contexto', body: ['Acessibilidade'] },
      {
        heading: 'Descrição',
        body: ['Esta diretriz é uma referência importante aplicável ao seu respectivo contexto. Para acessar mais informações a respeito, compreender seus princípios e avaliar sua aplicação prática, acesse a página de diretrizes correspondente através do link fornecido.']
      },
      { heading: 'Referência', body: ['https://www.abntcolecao.com.br/mpf/norma.aspx?ID=567818'] },
    ],
  },
  {
    id: 'design-universal',
    categoryId: 'acessibilidade-inclusao',
    title: 'Princípios do Design Universal',
    summary: 'Conjunto de 7 princípios para a criação de produtos, ambientes e comunicações utilizáveis pelo maior número de pessoas possível.',
    updatedAt: '16 jul. 2026',
    colorClass: 'text-[#1881BF]',
    sections: [
      { heading: 'Contexto', body: ['Design'] },
      {
        heading: 'Descrição',
        body: ['Os princípios valorizam o uso flexível, simples e intuitivo, a tolerância ao erro, a informação perceptível e o baixo esforço físico de forma equitativa e sem a necessidade de adaptações posteriores.']
      },
      { heading: 'Referência', body: ['https://universaldesign.ie/about-universal-design/the-7-principles'] },
    ],
  },
  {
    id: 'emag',
    categoryId: 'acessibilidade-inclusao',
    title: 'E-mag',
    summary: 'Modelo de Acessibilidade em Governo Eletrônico de observância obrigatória no ecossistema federal brasileiro.',
    updatedAt: '16 jul. 2026',
    colorClass: 'text-[#1881BF]',
    sections: [
      { heading: 'Contexto', body: ['Acessibilidade'] },
      {
        heading: 'Descrição',
        body: ['Alinhado aos padrões internacionais da WCAG, fornece recomendações práticas de implementação divididas em áreas como marcação HTML, comportamento, conteúdo, CSS e multimídia para os portais do Governo Federal.']
      },
      { heading: 'Referência', body: ['https://emag.governoeletronico.gov.br//'] },
    ],
  },
  {
    id: 'ubiaccess',
    categoryId: 'acessibilidade-inclusao',
    title: 'UbiAccess',
    summary: 'Referência analítica focada em acessibilidade aplicada ao ambiente da computação ubíqua.',
    updatedAt: '16 jul. 2026',
    colorClass: 'text-[#1881BF]',
    sections: [
      { heading: 'Contexto', body: ['Computação ubíqua'] },
      {
        heading: 'Descrição',
        body: ['Esta diretriz é uma referência importante aplicável ao seu respectivo contexto. Para acessar mais informações a respeito, compreender seus princípios e avaliar sua aplicação prática, acesse a página de diretrizes correspondente através do link fornecido.']
      },
      { heading: 'Referência', body: ['https://doi.org/10.1093/iwc/iwac0299'] },
    ],
  },

  {
    id: 'heuristicas-nielsen',
    categoryId: 'usabilidade-design',
    title: 'Heurísticas de Nielsen',
    summary: 'Regras gerais e fundamentais desenvolvidas na década de 1990 para o design de interação e identificação de problemas de usabilidade.',
    updatedAt: '16 jul. 2026',
    colorClass: 'text-primary',
    sections: [
      { heading: 'Contexto', body: ['Usabilidade'] },
      {
        heading: 'Descrição',
        body: ['Servem como um guia para avaliar e identificar problemas de usabilidade em uma interface, orientando que o sistema mantenha o usuário informado sobre seu status, utilize a linguagem do mundo real, previna erros, ofereça liberdade e controle, e mantenha uma estética minimalista e consistente.']
      },
      { heading: 'Referência', body: ['https://www.nngroup.com/articles/ten-usability-heuristics/'] },
    ],
  },
  {
    id: 'regras-ouro-shneiderman',
    categoryId: 'usabilidade-design',
    title: 'Oito Regras de Ouro de Shneiderman',
    summary: 'Padrões seminais de design estruturados para a concepção de interfaces interativas e eficientes.',
    updatedAt: '16 jul. 2026',
    colorClass: 'text-primary',
    sections: [
      { heading: 'Contexto', body: ['Design'] },
      {
        heading: 'Descrição',
        body: ['Esta diretriz é uma referência importante aplicável ao seu respectivo contexto. Para acessar mais informações a respeito, compreender seus princípios e avaliar sua aplicação prática, acesse a página de diretrizes correspondente.']
      },
      { heading: 'Referência', body: ['https://www.cs.umd.edu/users/ben/goldenrules.html'] },
    ],
  },
  {
    id: 'framework-decide',
    categoryId: 'usabilidade-design',
    title: 'Framework DECIDE / Interaction Design',
    summary: 'Estrutura originada da literatura central de IHC que estabelece fundamentos interdisciplinares para o design de interação.',
    updatedAt: '16 jul. 2026',
    colorClass: 'text-primary',
    sections: [
      { heading: 'Contexto', body: ['Avaliação'] },
      {
        heading: 'Descrição',
        body: ['A abordagem foca na investigação do contexto, das emoções e dos aspectos cognitivos do usuário, guiando a avaliação e a construção de produtos interativos desde a descoberta de requisitos até testes naturais e controlados.']
      },
      { heading: 'Referência', body: ['https://www.id-book.com/'] },
    ],
  },
  {
    id: 'iso-25010',
    categoryId: 'usabilidade-design',
    title: 'ISO 25010',
    summary: 'Parte da norma SQuaRE, fornece frameworks rigorosos para a avaliação de qualidade de sistemas de software.',
    updatedAt: '16 jul. 2026',
    colorClass: 'text-primary',
    sections: [
      { heading: 'Contexto', body: ['Qualidade de software'] },
      {
        heading: 'Descrição',
        body: ['A norma garante que os produtos atendam às necessidades humanas, categorizando atributos essenciais em um Modelo de Qualidade do Produto (como usabilidade, segurança, eficiência de desempenho e portabilidade) e um Modelo de Qualidade em Uso.']
      },
      { heading: 'Referência', body: ['https://iso25000.com/index.php/en/iso-25000-standards/iso-25010'] },
    ],
  },
  {
    id: 'heuristicas-budd',
    categoryId: 'usabilidade-design',
    title: 'Heurísticas de Budd',
    summary: 'Princípios e heurísticas voltados ao design de aplicações e interfaces web modernas.',
    updatedAt: '16 jul. 2026',
    colorClass: 'text-primary',
    sections: [
      { heading: 'Contexto', body: ['Design'] },
      {
        heading: 'Descrição',
        body: ['Esta diretriz é uma referência importante aplicável ao seu respectivo contexto. Para acessar mais informações a respeito, compreender seus princípios e avaliar sua aplicação prática, acesse a página de diretrizes correspondente através do link fornecido.']
      },
      { heading: 'Referência', body: ['https://andybudd.com/archives/2007/01/heuristics_for_modern_web_application_de'] },
    ],
  },
  {
    id: 'asa',
    categoryId: 'usabilidade-design',
    title: 'Avaliação Simplificada de Usabilidade (ASA)',
    summary: 'Metodologia ágil e simplificada para verificação de usabilidade e barreiras de acessibilidade.',
    updatedAt: '16 jul. 2026',
    colorClass: 'text-primary',
    sections: [
      { heading: 'Contexto', body: ['Acessibilidade'] },
      {
        heading: 'Descrição',
        body: ['Esta diretriz é uma referência importante aplicável ao seu respectivo contexto. Para acessar mais informações a respeito, compreender seus princípios e avaliar sua aplicação prática, acesse a página de diretrizes correspondente através do link fornecido.']
      },
      { heading: 'Referência', body: ['http://hdl.handle.net/123456789/1424'] },
    ],
  },
  {
    id: 'smash',
    categoryId: 'usabilidade-design',
    title: 'SMArtphones uSability Heuristics (SMASH)',
    summary: 'Conjunto de heurísticas específicas voltadas à avaliação de usabilidade em dispositivos móveis e smartphones.',
    updatedAt: '16 jul. 2026',
    colorClass: 'text-primary',
    sections: [
      { heading: 'Contexto', body: ['Usabilidade'] },
      {
        heading: 'Descrição',
        body: ['Esta diretriz é uma referência importante aplicável ao seu respectivo contexto. Para acessar mais informações a respeito, compreender seus princípios e avaliar sua aplicação prática, acesse a página de diretrizes correspondente através do link fornecido.']
      },
      { heading: 'Referência', body: ['https://doi.org/10.1016/j.csi.2015.08.007'] },
    ],
  },

  
  {
    id: 'coga',
    categoryId: 'educacao-cognicao',
    title: 'Cognitive and Learning Disabilities Accessibility Task Force (COGA)',
    summary: 'Extensão de foco analítico do W3C voltada à remoção de barreiras cognitivas e de aprendizado na web.',
    updatedAt: '16 jul. 2026',
    colorClass: 'text-[#EF7700]',
    sections: [
      { heading: 'Contexto', body: ['Acessibilidade'] },
      {
        heading: 'Descrição',
        body: ['Tem como propósito orientar designers a criarem ambientes digitais que sejam compreensíveis e fáceis de operar para usuários com necessidades ligadas à atenção, memória e função executiva, utilizando linguagem simples e prevenindo que erros estruturais sejam cometidos.']
      },
      { heading: 'Referência', body: ['https://www.w3.org/TR/2021/NOTE-coga-usable-20210429/'] },
    ],
  },
  {
    id: 'cognitive-accessibility-guidance',
    categoryId: 'educacao-cognicao',
    title: 'Cognitive Accessibility Guidance',
    summary: 'Guias e orientações focados na otimização de ambientes interativos e comunicativos para acessibilidade cognitiva.',
    updatedAt: '16 jul. 2026',
    colorClass: 'text-[#EF7700]',
    sections: [
      { heading: 'Contexto', body: ['Acessibilidade'] },
      {
        heading: 'Descrição',
        body: ['Esta diretriz é uma referência importante aplicável ao seu respectivo contexto. Para acessar mais informações a respeito, compreender seus princípios e avaliar sua aplicação prática, acesse a página de diretrizes correspondente através do link fornecido.']
      },
      { heading: 'Referência', body: ['https://accessibility.education.gov.uk/guidelines/coga'] },
    ],
  },
  {
    id: 'gaia',
    categoryId: 'educacao-cognicao',
    title: 'Guidelines for Accessible Interfaces for people with Autism (GAIA)',
    summary: 'Diretrizes focadas no desenvolvimento de interfaces acessíveis para pessoas dentro do espectro autista.',
    updatedAt: '16 jul. 2026',
    colorClass: 'text-[#EF7700]',
    sections: [
      { heading: 'Contexto', body: ['Acessibilidade'] },
      {
        heading: 'Descrição',
        body: ['Esta diretriz é uma referência importante aplicável ao seu respectivo contexto. Para acessar mais informações a respeito, compreender seus princípios e avaliar sua aplicação prática, acesse a página de diretrizes correspondente através do link fornecido.']
      },
      { heading: 'Referência', body: ['https://gaia.wiki.br/'] },
    ],
  },
  {
    id: 'cast-udl',
    categoryId: 'educacao-cognicao',
    title: 'Universal Design for Learning Guidelines (CAST UDL)',
    summary: 'Modelo focado nas diretrizes de acessibilidade e flexibilidade voltadas ao design universal para a aprendizagem.',
    updatedAt: '16 jul. 2026',
    colorClass: 'text-[#EF7700]',
    sections: [
      { heading: 'Contexto', body: ['Acessibilidade'] },
      {
        heading: 'Descrição',
        body: ['Esta diretriz é uma referência importante aplicável ao seu respectivo contexto. Para acessar mais informações a respeito, compreender seus princípios e avaliar sua aplicação prática, acesse a página de diretrizes correspondente através do link fornecido.']
      },
      { heading: 'Referência', body: ['https://udlguidelines.cast.org/'] },
    ],
  },
  {
    id: 'meta',
    categoryId: 'educacao-cognicao',
    title: 'MeTA',
    summary: 'Diretriz técnica e pedagógica voltada para o universo das tecnologias educacionais.',
    updatedAt: '16 jul. 2026',
    colorClass: 'text-[#EF7700]',
    sections: [
      { heading: 'Contexto', body: ['Tecnologias educacionais'] },
      {
        heading: 'Descrição',
        body: ['Esta diretriz é uma referência importante aplicável ao seu respectivo contexto. Para acessar mais informações a respeito, compreender seus princípios e avaliar sua aplicação prática, acesse a página de diretrizes correspondente através do link fornecido.']
      },
      { heading: 'Referência', body: ['https://hdl.handle.net/1884/74808'] },
    ],
  },
  {
    id: 'parc',
    categoryId: 'educacao-cognicao',
    title: 'Parceria pela Alfabetização em Regime de Colaboração (PARC)',
    summary: 'Diretrizes voltadas à implementação e avaliação de tecnologias educacionais no cenário da alfabetização.',
    updatedAt: '16 jul. 2026',
    colorClass: 'text-[#EF7700]',
    sections: [
      { heading: 'Contexto', body: ['Tecnologias educacionais'] },
      {
        heading: 'Descrição',
        body: ['Esta diretriz é uma referência importante aplicável ao seu respectivo contexto. Para acessar mais informações a respeito, compreender seus princípios e avaliar sua aplicação prática, acesse a página de diretrizes correspondente através do link fornecido.']
      },
      { heading: 'Referência', body: ['https://parc.caeddigital.net/#!/pagina-inicial'] },
    ],
  },

  {
    id: 'gag',
    categoryId: 'jogos-gamificacao',
    title: 'Game Accessibility Guidelines (GAG)',
    summary: 'Diretrizes importantes aplicáveis ao contexto de acessibilidade no universo dos jogos digitais.',
    updatedAt: '16 jul. 2026',
    colorClass: 'text-[#191919]',
    sections: [
      { heading: 'Contexto', body: ['Jogos'] },
      {
        heading: 'Descrição',
        body: ['Esta diretriz é uma referência importante aplicável ao seu respectivo contexto. Para acessar mais informações a respeito, compreender seus princípios e avaliar sua aplicação prática, acesse a página de diretrizes correspondente através do link fornecido.']
      },
      { heading: 'Referência', body: ['https://gameaccessibilityguidelines.com/'] },
    ],
  },
  {
    id: 'meega-plus',
    categoryId: 'jogos-gamificacao',
    title: 'Modelo para a Avaliação de Jogos Educacionais para o ensino de Computação (MEEGA+)',
    summary: 'Modelo estruturado para a avaliação sistemática da qualidade de jogos educacionais.',
    updatedAt: '16 jul. 2026',
    colorClass: 'text-[#191919]',
    sections: [
      { heading: 'Contexto', body: ['Jogos'] },
      {
        heading: 'Descrição',
        body: ['A avaliação é feita por meio de questionários e foca em duas perspectivas principais: a Experiência do Jogador (atenção focada, diversão, sensação de desafio, usabilidade e confiança) e a Percepção da Aprendizagem.']
      },
      { heading: 'Referência', body: ['https://www.ufsm.br/grupos/gptec/paginas/portfolio/meega'] },
    ],
  },
  {
    id: 'cai-games',
    categoryId: 'jogos-gamificacao',
    title: 'CAI-Games',
    summary: 'Critérios e diretrizes voltados para o design e avaliação sob a ótica dos jogos.',
    updatedAt: '16 jul. 2026',
    colorClass: 'text-[#191919]',
    sections: [
      { heading: 'Contexto', body: ['Jogos'] },
      {
        heading: 'Descrição',
        body: ['Esta diretriz é uma referência importante aplicável ao seu respectivo contexto. Para acessar mais informações a respeito, compreender seus princípios e avaliar sua aplicação prática, acesse a página de diretrizes correspondente através do link fornecido.']
      },
      { heading: 'Referência', body: ['https://hdl.handle.net/1884/99716'] },
    ],
  },
  {
    id: 'daj',
    categoryId: 'jogos-gamificacao',
    title: 'Diretrizes de Acessibilidade para Jogos (DAJ)',
    summary: 'Parâmetros técnicos projetados para assegurar a acessibilidade em cenários e mecânicas de jogos.',
    updatedAt: '16 jul. 2026',
    colorClass: 'text-[#191919]',
    sections: [
      { heading: 'Contexto', body: ['Jogos'] },
      {
        heading: 'Descrição',
        body: ['Esta diretriz é uma referência importante aplicável ao seu respectivo contexto. Para acessar mais informações a respeito, compreender seus princípios e avaliar sua aplicação prática, acesse a página de diretrizes correspondente através do link fornecido.']
      },
      { heading: 'Referência', body: ['https://www.inf.ufrgs.br/~jfpcheiran/diretrizes/'] },
    ],
  },
  {
    id: 'gameful-design-heuristics',
    categoryId: 'jogos-gamificacao',
    title: 'Gameful Design Heuristics',
    summary: 'Diretrizes focadas em guiar e avaliar o design lúdico (gamificação) em sistemas sob variadas nuances motivacionais.',
    updatedAt: '16 jul. 2026',
    colorClass: 'text-[#191919]',
    sections: [
      { heading: 'Contexto', body: ['Jogos'] },
      {
        heading: 'Descrição',
        body: ['Elas são divididas para analisar tanto a motivação intrínseca do usuário (como o sentimento de autonomia e superação de desafios) quanto a motivação extrínseca (ganho de recompensas), além de considerar a clareza e imprevisibilidade da interação.']
      },
      { heading: 'Referência', body: ['https://hcigames.com/gameful-design-heuristics/'] },
    ],
  },
];

export function getAllCategoryIds(): string[] {
  return guidelineCategories.map((category) => category.id);
}

export function getCategoryById(categoryId: string): GuidelineCategory | undefined {
  return guidelineCategories.find((category) => category.id === categoryId);
}

export function getGuidelinesByCategory(categoryId: string): Guideline[] {
  return guidelines.filter((guideline) => guideline.categoryId === categoryId);
}

export function getGuideline(categoryId: string, guidelineId: string): Guideline | undefined {
  return guidelines.find(
    (guideline) => guideline.categoryId === categoryId && guideline.id === guidelineId
  );
}