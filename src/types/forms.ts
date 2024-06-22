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

