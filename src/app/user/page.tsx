import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { getById } from '@/lib/firebase';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../pages/api/auth/[...nextauth]';
import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import { forms } from '@/types/forms';

//Resolve o problema de cache após atualização
export const dynamic = 'force-dynamic';
export const revalidate = 0;

const User = async () => {
    const session: any = await getServerSession(authOptions);
    const data = await getById(session?.user?.uid! as string, "user");

    return (
        <>
            {data.forms ?
            <div className='px-16 grid grid-flow-row gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                {   
                    data.forms.map((form) => {
                    const findForm = forms.find((option) => option.value == form);
                        return (
                            <Card key={findForm?.value} className="y-8 rounded shadow-lg shadow-gray-200 bg-primary-background duration-300 hover:-translate-y-1">
                                <CardHeader>
                                    <CardTitle>{findForm?.label}</CardTitle>
                                    <CardDescription>{findForm?.description}</CardDescription>
                                </CardHeader>
                                <CardFooter>
                                    <Link className={buttonVariants({ variant: "outline" })} href={`/user/form/${findForm?.value}`} replace>
                                        Acessar
                                    </Link>
                                </CardFooter>
                            </Card>
                        )
                    })
                }
            </div>
            : <p>Não há testes disponíveis</p>}
        </>
    )
}

export default User;