import { ColumnDef } from "@tanstack/react-table";

export interface Instruments {
    value: Lowercase<string>;
    label: string;
}

export const instruments: Instruments[] = [
    {  
        value: "panas",
        label: "PANAS",
    },
    {  
        value: "sam",
        label: "SAM",
    },
    {  
        value: "sus",
        label: "SUS",
    },
    {  
        value: "eaz",
        label: "EAZ",
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

export interface Sam {
    satisfaction: string;
    motivation: string;
    willpower: string;
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

export interface FillEvaluationForm {
    userId: string;
    evaluationId: string;
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

export interface Sus {
    solution_evaluation: string,
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