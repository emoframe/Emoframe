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