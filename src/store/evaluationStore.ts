import { Evaluation } from "@/types/forms";
import { create } from "zustand";

type EvaluationStore = {
    itens: Evaluation[];
    selected: Evaluation | null;
    addItens: (item: Evaluation | Evaluation[]) => void;
    addSelected: (item: Evaluation) => void
};

export const useEvaluationStore = create<EvaluationStore>((set) => {
    return {
        itens: [],
        selected: null,
        addItens: (item) => {
            set((state) => ({
                itens: Array.isArray(item)
                    ? [...state.itens, ...item]
                    : [...state.itens, item],
            }));
        },
        addSelected: (item) => {
            set(() => ({
                selected: item,
            }));
        },
    };
});