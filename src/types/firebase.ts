enum Operations {
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

export interface Search {
    col: string, 
    field: string, 
    operation: keyof typeof Operations,
    value: string
}

export interface GetById {
    id: string | string[], 
    col: string
}