import { Evaluation } from "@/types/forms";
import { create } from "zustand";

type EvaluationStore = {
    itens: Evaluation[];
    add: (item: Evaluation) => void;
};

export const useEvaluationStore = create<EvaluationStore>((set) => {
    return {
        itens: [],
        add: (item) => set((state) => ({ itens: [...state.itens, item] })),
    };
});