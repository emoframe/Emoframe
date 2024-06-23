import { TemplateElementInstance } from "@/components/template/TemplateElements";
import { ColumnDef } from "@tanstack/react-table";

export type Instruments = {
    value: Lowercase<string>;
    label: string;
    description?: string,
}

export type Option = {
    value: string;
    label: string;
};

export interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
}

export interface RadioItem {
    value: string;
    label: string;
}

export interface Template {
    uid?: string,
    specialistId: string,
    title: string,
    description?: string,
    questions_size: number,
    scale_type: string,
    questions?: TemplateElementInstance[],
    published: boolean,
}

export type Evaluation = {
    uid?: string,
    specialist: string,
    users: string[],
    answered?: string[],
    identification: string,
    date: Date,
    method: string,
} & (
    { instrument: "template", templateId: string } |
    { instrument: Exclude<string, "template">, templateId?: never }
);

export type Answer = {
    [key: string]: any;
}

export type FillEvaluationForm = {
    userId: string;
    evaluationId: string;
    isViewable?: never;
} | {
    userId?: never;
    evaluationId?: never;
    isViewable: true;
}

export type TemplateFormProps = (FillEvaluationForm & {
    content: TemplateElementInstance[];
});

export type TemplateAnswers = {
    [key: string]: string;
};

export interface Panas {
    repulsion: string;
    tormented: string;
    scared: string;
    hearty: string;
    excited: string;
    guilty: string;
    enthusiastic: string;
    pleasantly_surprised: string;
    disturbed: string;
    trembling: string;
    active: string;
    proud: string;
    inspired: string;
    nervous: string;
    angry: string;
    determined: string;
    charmed: string;
    remorse: string;
    frightened: string;
}

export interface Sam {
    satisfaction: string;
    motivation: string;
    willpower: string;
}

export interface Sus {
    app_useFrequency: string,
    app_useComplex: string,
    app_useEasy: string,
    app_useNeedHelp: string,
    app_functionIntegration: string,
    app_inconsistency: string,
    app_learningCurve: string,
    app_jumbled: string,
    app_confidence: string,
    app_learnSystem: string
}

export interface Eaz {
    happy: string,
    tired: string,
    worried: string,
    confident: string,
    courageous: string,
    nervous: string,
    determined: string,
    guilty: string,
    passionate: string,
    angry: string,
    brave: string,
    open_new_things: string,
    happy_person: string,
    easy_to_anger:  string,
    proud_about_myself: string,
    humiliated: string,
    sad: string,
    grumpy: string,
    rage: string,
    resilient: string
}

export interface Brums {
    cheered_up: string,
    irritated: string,
    depressed: string,
    terrified: string,
    crestfallen: string,
    broken_down: string,
    confused: string,
    exhausted: string,
    anxious: string,
    unhappy: string,
    huffy: string,
    worried: string,
    sad: string,
    sleepy: string,
    insecure: string,
    willing: string,
    tense: string,
    disoriented: string,
    grumpy: string,
    undecided: string,
    tired: string,
    energy: string,
    angry: string,
    alert: string,
}

export interface Gds {
    satisfied: string,
    no_activities: string,
    empty: string,
    upset: string,
    good: string,
    bad: string,
    happy: string,
    helpless: string,
    stay_at_home: string,
    problems_of_memory: string,
    wonderful_to_stay_alive: string,
    useless: string,
    full_of_energy: string,
    hopeless: string,
    unlucky: string,
}

export interface Leap {
    admiration: string,
    relieved: string,
    tired: string,
    happy: string,
    accept: string,
    heat: string,
    satisfied: string,
    jealous: string,
    attracted: string,
    calm: string,
    funny: string,
    desire: string,
    careful: string,
    strange: string,
    hopeful: string,
    fall_in_love: string,
    conformed: string,
    hungry: string,
    guilty: string,
    cold: string,
    despise: string,
    take_pity_on: string,
    disgusting: string,
    need: string,
    duty: string,
    envy: string,
    humiliated: string,
    interested: string,
    fear: string,
    proud: string,
    shame: string,
    angry: string,
    sleepy: string,
    longing: string,
    sad: string,
    surprised: string,
    thirst: string,
    thoughtful: string,
    serious: string,
    scared: string
}

export const leapQuestions = [
    { index: 1, field: 'fear', factor: 'Fator 1', question: "Estou com medo." },
    { index: 2, field: 'scared', factor: 'Fator 1', question: "Estou assustado(a)." },
    { index: 3, field: 'shame', factor: 'Fator 1', question: "Estou com vergonha." },
    { index: 4, field: 'serious', factor: 'Fator 1', question: "Estou sem graça." },
    { index: 5, field: 'guilty', factor: 'Fator 1', question: "Sinto-me culpado(a)." },
    { index: 6, field: 'sad', factor: 'Fator 1', question: "Sinto-me triste." },
    { index: 7, field: 'humiliated', factor: 'Fator 1', question: "Sinto-me humilhado(a)." },
    { index: 8, field: 'take_pity_on', factor: 'Fator 1', question: "Tenho pena de alguém." },
    { index: 9, field: 'surprised', factor: 'Fator 2', question: "Sinto-me surpreso(a)." },
    { index: 10, field: 'happy', factor: 'Fator 2', question: "Estou alegre." },
    { index: 11, field: 'proud', factor: 'Fator 2', question: "Sinto-me orgulhoso(a)." },
    { index: 12, field: 'relieved', factor: 'Fator 2', question: "Estou aliviado(a)." },
    { index: 13, field: 'hopeful', factor: 'Fator 2', question: "Estou com esperança." },
    { index: 14, field: 'interested', factor: 'Fator 2', question: "Sinto-me interessado(a)." },
    { index: 15, field: 'calm', factor: 'Fator 2', question: "Sinto-me calmo(a)." },
    { index: 16, field: 'funny', factor: 'Fator 2', question: "Acho algo engraçado." },
    { index: 17, field: 'admiration', factor: 'Fator 2', question: "Sinto uma admiração por alguém." },
    { index: 18, field: 'longing', factor: 'Fator 2', question: "Sinto saudade de alguém." },
    { index: 19, field: 'despise', factor: 'Fator 3', question: "Faço pouco caso de alguém." },
    { index: 20, field: 'angry', factor: 'Fator 3', question: "Sinto raiva." },
    { index: 21, field: 'disgusting', factor: 'Fator 3', question: "Estou com nojo." },
    { index: 22, field: 'envy', factor: 'Fator 3', question: "Sinto inveja de alguém." },
    { index: 23, field: 'attracted', factor: 'Fator 4', question: "Sinto atração sexual por alguém." },
    { index: 24, field: 'fall_in_love', factor: 'Fator 4', question: "Estou gostando de alguém." },
    { index: 25, field: 'jealous', factor: 'Fator 4', question: "Sinto ciúme de alguém." },
    { index: 26, field: 'need', factor: 'Fator 5', question: "Sinto uma necessidade." },
    { index: 27, field: 'thoughtful', factor: 'Fator 5', question: "Estou refletindo." },
    { index: 28, field: 'desire', factor: 'Fator 5', question: "Sinto um desejo." },
    { index: 29, field: 'duty', factor: 'Fator 5', question: "Sinto uma obrigação." },
    { index: 30, field: 'sleepy', factor: 'Fator 6', question: "Estou com sono." },
    { index: 31, field: 'hungry', factor: 'Fator 6', question: "Estou com fome." },
    { index: 32, field: 'thirst', factor: 'Fator 6', question: "Estou com sede." },
    { index: 33, field: 'tired', factor: 'Fator 6', question: "Estou cansado(a)." },
    { index: 34, field: 'careful', factor: 'Fator 7', question: "Estou tomando cuidado." },
    { index: 35, field: 'strange', factor: 'Fator 7', question: "Acho algo estranho." },
    { index: 36, field: 'cold', factor: 'Fator 8', question: "Estou com frio." },
    { index: 37, field: 'heat', factor: 'Fator 8', question: "Estou com calor." },
    { index: 38, field: 'conformed', factor: 'Fator 9', question: "Estou conformado(a)." },
    { index: 39, field: 'accept', factor: 'Fator 9', question: "Estou aceitando alguma coisa." },
    { index: 40, field: 'satisfied', factor: 'Fator 9', question: "Estou cheio(a)." }
  ];

export const instruments: Instruments[] = [
    {  
        value: "panas",
        label: "PANAS",
        description: "Lorem Ipsum",
    },
    {  
        value: "sam",
        label: "SAM",
        description: "Lorem Ipsum",
    },
    {  
        value: "sus",
        label: "SUS",
        description: "Lorem Ipsum",
    },
    {  
        value: "eaz",
        label: "EAZ",
        description: "Lorem Ipsum",
    },
    {  
        value: "brums",
        label: "BRUMS",
        description: "Lorem Ipsum",
    },
    {  
        value: "gds",
        label: "GDS",
        description: "Lorem Ipsum",
    },
    {  
        value: "leap",
        label: "LEAP",
        description: "Lorem Ipsum",
    },
];


export const scales: Option[] = [
    {  
      value: "likert",
      label: "Escala Likert",
    },
    {  
      value: "semantic",
      label: "Escala de Diferencial Semântico",
    },
];

export const questions_size: Option[] = [
    {
      label: "Cinco opções",
      value: "5",
    },
    {
      label: "Sete opções",
      value: "7",
    },
    {
      label: "Nove opções",
      value: "9",
    },
  ];

