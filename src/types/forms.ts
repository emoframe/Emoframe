import { ColumnDef } from "@tanstack/react-table";

export type Instruments = {
    value: Lowercase<string>;
    label: string;
    description?: string,
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
];

export interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
}

export interface RadioItem {
    value: string;
    label: string;
}

export interface Evaluation {
    uid?: string,
    specialist: string,
    users: string[],
    identification: string,
    date: Date,
    method: string,
    instrument: string,
}

export type FillEvaluationForm = {
    userId: string,
    evaluationId: string,
} |
{
    isViewable: true,
}

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