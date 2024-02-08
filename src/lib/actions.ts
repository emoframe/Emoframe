"use server";

import { redirect } from 'next/navigation';
import { useEvaluationStore } from "@/store/evaluationStore";
import { Evaluation } from "@/types/forms";
import { cookies } from 'next/headers'
 
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

export async function setSelectedEvaluationUsers(evaluation: Evaluation) {

    try {
        cookies().set('evaluationUsers', JSON.stringify(evaluation.users))
    } catch (error){
        console.log("ERRO: " + error);
    }
    
    await appRedirect('/specialist/evaluations/details');
}
  