export interface Forms {
    label: string;
    value: string;
    description: string;
}

export const forms: Forms[] = [
    {
        label: "Panas",
        value: "panas",
        description: "Lorem ipsum dolor sit amet.",
    },
    {
        label: "SAM",
        value: "sam",
        description: "Lorem ipsum dolor sit amet.",
    },
];

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
    horny: string;
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