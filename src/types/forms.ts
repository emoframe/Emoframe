import { ColumnDef } from "@tanstack/react-table";

export interface Forms {
    value: Lowercase<string>;
    label: string;
}

export const forms: Forms[] = [
    {  
        value: "panas",
        label: "PANAS",
    },
    {  
        value: "sam",
        label: "SAM",
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
    worried: string,
    tired: string,
    gleeful: string,
    angry: string,
    guilty: string,
    nervous: string,
    courageous: string,
    confident: string,
    determined: string,
    passionate: string,
    happy: string,
    angry_with_people: string,
    exp_new_things: string,
    humiliated: string,
    sad: string,
    irritated: string,
    proud: string,
    resilient: string,
    brave: string,
    grumpy: string,
}