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
    collection: string, 
    field: string, 
    operation: keyof typeof Operations,
    value: string
}