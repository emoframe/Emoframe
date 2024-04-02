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
    {  
        value: "brums",
        label: "BRUMS",
    },
    {  
        value: "gds",
        label: "GDS",
    },
    {
        value: "leap",
        label: "LEAP",
    }
];

export interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
}

export interface RadioItem {
    value: number;
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

export interface FillEvaluationForm {
    userId: string;
    evaluationId: string;
}

export class PanasClass {
    interested: number = -1;
    repulsion: number = -1;
    hearty: number = -1;
    tormented: number = -1;
    enthusiastic: number = -1;
    scared: number = -1;
    excited: number = -1;
    guilty: number = -1;
    pleasantly_surprised: number = -1;
    disturbed: number = -1;
    active: number = -1;
    trembling: number = -1;
    proud: number = -1;
    nervous: number = -1;
    inspired: number = -1;
    angry: number = -1;
    determined: number = -1;
    remorse: number = -1;
    charmed: number = -1;
    frightened: number = -1;    
}

export class SamClass {
    satisfaction: number = -1;
    motivation: number = -1;
    willpower: number = -1;
}

export class SusClass {
    solution_evaluation: string = '';
    app_useFrequency: number = -1;
    app_useComplex: number = -1;
    app_useEasy: number = -1;
    app_useNeedHelp: number = -1;
    app_functionIntegration: number = -1;
    app_inconsistency: number = -1;
    app_learningCurve: number = -1;
    app_jumbled: number = -1;
    app_confidence: number = -1;
    app_learnSystem: number = -1;

}

export class EazClass {
    passionate: number = -1;
    happy: number = -1;
    confident: number = -1;
    courageous: number = -1;
    determined: number = -1;
    resilient: number = -1;
    open_new_things: number = -1;
    proud_about_myself: number = -1;
    brave: number = -1;
    happy_person: number = -1;
    tired: number = -1;
    worried: number = -1;
    nervous: number = -1;
    guilty: number = -1;
    angry: number = -1;
    easy_to_anger:  number = -1;
    humiliated: number = -1;
    sad: number = -1;
    grumpy: number = -1;
    rage: number = -1;
}

export class BrumsClass {
    tense: number = -1;
    terrified: number = -1;
    anxious: number = -1;
    worried: number = -1;
    depressed: number = -1;
    crestfallen: number = -1;
    sad: number = -1;
    unhappy: number = -1;
    irritated: number = -1;
    grumpy: number = -1;
    huffy: number = -1;
    angry: number = -1;
    broken_down: number = -1;
    exhausted: number = -1;
    sleepy: number = -1;
    tired: number = -1;
    cheered_up: number = -1;
    willing: number = -1;
    energy: number = -1;
    alert: number = -1;
    confused: number = -1;
    insecure: number = -1;
    disoriented: number = -1;
    undecided: number = -1;
}

export class GdsClass {
    satisfied: number = -1;
    no_activities: number = -1;
    empty: number = -1;
    upset: number = -1;
    good: number = -1;
    bad: number = -1;
    happy: number = -1;
    helpless: number = -1;
    stay_at_home: number = -1;
    problems_of_memory: number = -1;
    wonderful_to_stay_alive: number = -1;
    useless: number = -1;
    full_of_energy: number = -1;
    hopeless: number = -1;
    unlucky: number = -1;
}

export class LeapClass {
    fear: number = -1;
    scared: number = -1;
    shame: number = -1;
    serious: number = -1;
    guilty: number = -1;
    sad: number = -1;
    humiliated: number = -1;
    take_pity_on: number = -1;
    surprised: number = -1;
    admiration: number = -1;
    relieved: number = -1;
    tired: number = -1;
    accept: number = -1;
    heat: number = -1;
    satisfied: number = -1;
    jealous: number = -1;
    attracted: number = -1;
    calm: number = -1;
    funny: number = -1;
    desire: number = -1;
    careful: number = -1;
    strange: number = -1;
    hopeful: number = -1;
    fall_in_love: number = -1;
    conformed: number = -1;
    hungry: number = -1;
    cold: number = -1;
    despise: number = -1;
    disgusting: number = -1;
    need: number = -1;
    duty: number = -1;
    envy: number = -1;
    interested: number = -1;
    proud: number = -1;
    angry: number = -1;
    sleepy: number = -1;
    longing: number = -1;
    happy: number = -1;
    thirst: number = -1;
    thoughtful: number = -1;
}


export interface Panas extends PanasClass {}
export interface Sam   extends SamClass   {}
export interface Sus   extends SusClass   {}
export interface Eaz   extends EazClass   {}
export interface Brums extends BrumsClass {}
export interface Gds   extends GdsClass   {}
export interface Leap  extends LeapClass  {}