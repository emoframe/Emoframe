export enum Operations {
    "<",
    "<=", 
    "==",
    ">", 
    ">=", 
    "!=",
    "array-contains",
    "array-contains-any",
    "in",
    "not-in",
}

export type Filter = {
    field: string;
    operation: keyof typeof Operations;
    value: string | number | boolean;
};