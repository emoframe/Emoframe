import { ColumnDef } from "@tanstack/react-table";

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