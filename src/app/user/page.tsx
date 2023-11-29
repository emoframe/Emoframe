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

//Resolve o problema de cache após atualização
export const dynamic = 'force-dynamic'; 
export const revalidate = 0;

const options = [
    {
        value: "form1",
        label: "Formulário 1",
    },
    {
        value: "form2",
        label: "Formulário 2",
    },
    {
        value: "form3",
        label: "Formulário 3",
    },
]

const User = async () => {
    const session: any = await getServerSession(authOptions);
    const data = await getById(session?.user?.uid! as string, "user");

    return (
        <div className='px-16 grid grid-flow-row gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {data ? data.forms.map((form) => (
                <Card className="y-8 rounded shadow-lg shadow-gray-200 bg-white duration-300 hover:-translate-y-1">
                    <CardHeader>
                        <CardTitle>{options.find((option) => option.value == form )?.label}</CardTitle>
                        <CardDescription>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</CardDescription>
                    </CardHeader>
                    <CardFooter>
                        <Link className={buttonVariants({ variant: "outline" })} href={`/`} replace>
                            Acessar
                        </Link> 
                    </CardFooter>
                </Card>

            )): <p>Não há testes disponíveis</p>}
        </div>


    )
}

export default User;