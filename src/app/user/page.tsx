import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { search } from '@/lib/firebase';
import { Search } from '@/types/firebase';
import { forms } from '@/types/forms';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../pages/api/auth/[...nextauth]';
import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';

//Resolve o problema de cache após atualização
export const dynamic = 'force-dynamic';
export const revalidate = 0;

const User = async () => {
    const session: any = await getServerSession(authOptions);

    const parameters: Search = {
        col: "evaluation", 
        field: "users", 
        operation: "array-contains", 
        value: session?.user.uid!
    };
    const data = await search(parameters);
    const evaluations = data.filter((evaluation) => evaluation.date == new Date().toLocaleDateString('pt-BR'))
    .sort((a, b) => a.identification.toLowerCase().localeCompare(b.identification.toLowerCase()))


    return (
        <>
            {evaluations ?
            <div className='grid grid-flow-row gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                {   
                    evaluations.map((evaluation) => {
                        return (
                            <Card key={evaluation.uid} className="rounded shadow-lg shadow-black/25 bg-background duration-300 hover:-translate-y-1">
                                <CardHeader>
                                    <CardTitle>{evaluation.identification}</CardTitle>
                                    <CardDescription>{`${evaluation.instrument} - ${evaluation.method}`}</CardDescription>
                                </CardHeader>
                                <CardFooter className='justify-center'>
                                    <Link className={buttonVariants({ variant: "default" })} href={`/user/evaluations/fill?evaluation=${evaluation.uid}`} replace>
                                        Acessar
                                    </Link>
                                </CardFooter>
                            </Card>
                        )
                    })
                }
            </div>
            : <p>Não há avaliações disponíveis</p>}
        </>
    )
}

export default User;