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

export interface FillEvaluationForm {
    userId: string;
    evaluationId: string;
}

export class PanasClass {
    interested: string = '';
    repulsion: string = '';
    hearty: string = '';
    tormented: string = '';
    enthusiastic: string = '';
    scared: string = '';
    excited: string = '';
    guilty: string = '';
    pleasantly_surprised: string = '';
    disturbed: string = '';
    active: string = '';
    trembling: string = '';
    proud: string = '';
    nervous: string = '';
    inspired: string = '';
    angry: string = '';
    determined: string = '';
    remorse: string = '';
    charmed: string = '';
    frightened: string = '';    
}

export class SamClass {
    satisfaction: string = '';
    motivation: string = '';
    willpower: string = '';
}

export class SusClass {
    solution_evaluation: string = '';
    app_useFrequency: string = '';
    app_useComplex: string = '';
    app_useEasy: string = '';
    app_useNeedHelp: string = '';
    app_functionIntegration: string = '';
    app_inconsistency: string = '';
    app_learningCurve: string = '';
    app_jumbled: string = '';
    app_confidence: string = '';
    app_learnSystem: string = '';

}

export class EazClass {
    happy: string = '';
    tired: string = '';
    worried: string = '';
    confident: string = '';
    courageous: string = '';
    nervous: string = '';
    determined: string = '';
    guilty: string = '';
    passionate: string = '';
    angry: string = '';
    brave: string = '';
    open_new_things: string = '';
    happy_person: string = '';
    easy_to_anger:  string = '';
    proud_about_myself: string = '';
    humiliated: string = '';
    sad: string = '';
    grumpy: string = '';
    rage: string = '';
    resilient: string = '';
}

export class BrumsClass {
    cheered_up: string = '';
    irritated: string = '';
    depressed: string = '';
    terrified: string = '';
    crestfallen: string = '';
    broken_down: string = '';
    confused: string = '';
    exhausted: string = '';
    anxious: string = '';
    unhappy: string = '';
    huffy: string = '';
    worried: string = '';
    sad: string = '';
    sleepy: string = '';
    insecure: string = '';
    willing: string = '';
    tense: string = '';
    disoriented: string = '';
    grumpy: string = '';
    undecided: string = '';
    tired: string = '';
    energy: string = '';
    angry: string = '';
    alert: string = '';
}

export class GdsClass {
    satisfied: string = '';
    no_activities: string = '';
    empty: string = '';
    upset: string = '';
    good: string = '';
    bad: string = '';
    happy: string = '';
    helpless: string = '';
    stay_at_home: string = '';
    problems_of_memory: string = '';
    wonderful_to_stay_alive: string = '';
    useless: string = '';
    full_of_energy: string = '';
    hopeless: string = '';
    unlucky: string = '';
}

export class LeapClass {
    fear: string = '';
    scared: string = '';
    shame: string = '';
    serious: string = '';
    guilty: string = '';
    sad: string = '';
    humiliated: string = '';
    take_pity_on: string = '';
    surprised: string = '';
    admiration: string = '';
    relieved: string = '';
    tired: string = '';
    accept: string = '';
    heat: string = '';
    satisfied: string = '';
    jealous: string = '';
    attracted: string = '';
    calm: string = '';
    funny: string = '';
    desire: string = '';
    careful: string = '';
    strange: string = '';
    hopeful: string = '';
    fall_in_love: string = '';
    conformed: string = '';
    hungry: string = '';
    cold: string = '';
    despise: string = '';
    disgusting: string = '';
    need: string = '';
    duty: string = '';
    envy: string = '';
    interested: string = '';
    proud: string = '';
    angry: string = '';
    sleepy: string = '';
    longing: string = '';
    happy: string = '';
    thirst: string = '';
    thoughtful: string = '';
}


export interface Panas extends PanasClass {}
export interface Sam   extends SamClass   {}
export interface Sus   extends SusClass   {}
export interface Eaz   extends EazClass   {}
export interface Brums extends BrumsClass {}
export interface Gds   extends GdsClass   {}
export interface Leap  extends LeapClass  {}