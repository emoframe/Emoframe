"use server";

import { redirect } from 'next/navigation';
import { useEvaluationStore } from "@/store/evaluationStore";
import { Evaluation } from "@/types/forms";

export async function saveSelectedEvaluation(evaluation: Evaluation) {
    try {
        new Promise(resolve => {
            useEvaluationStore.setState(() => ({selected: evaluation}));
            resolve(true);
        });
    } catch (error){
        console.log("ERRO: " + error);
    }
    
    await appRedirect('/specialist/evaluations/details');
}

export async function appRedirect(route: string) {
    redirect(route);
}