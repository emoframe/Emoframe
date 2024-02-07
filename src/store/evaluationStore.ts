import { Evaluation } from "@/types/forms";
import { create } from "zustand";

type EvaluationStore = {
    itens: Evaluation[];
    add: (item: Evaluation | Evaluation[]) => void;
};

export const useEvaluationStore = create<EvaluationStore>((set) => {
    return {
        itens: [],
        add: (item) => {
            set((state) => ({
                itens: Array.isArray(item)
                    ? [...state.itens, ...item]
                    : [...state.itens, item],
            }));
        },
    };
});