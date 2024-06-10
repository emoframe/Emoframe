"use server";

import { redirect } from 'next/navigation';
import { Evaluation } from "@/types/forms";
import { cookies } from 'next/headers'
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../pages/api/auth/[...nextauth]';

export async function appRedirect(route: string) {
    redirect(route);
}

export async function getSessionUser() {
    const session = await getServerSession(authOptions);
  
    return session?.user;
}
  
export async function setSelectedEvaluationUsers(evaluation: Evaluation) {

    try {
        cookies().set('evaluationUsers', JSON.stringify(evaluation.users), { maxAge: 0 })
    } catch (error){
        console.log("ERRO: " + error);
    }
    
    await appRedirect('/specialist/evaluations/details');
}
  