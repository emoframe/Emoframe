import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'
import { Separator } from '@/components/ui/separator'

const description = {
    uid: "ID",
    email: "E-mail",
    type: "Tipo",
    name: "Nome",
    surname: "Sobrenome",
    social_name: "Nome Social",
    phone: "Telefone",
	connection: "Conexão",
    gender: "Gênero",
    specialty: "Especialidade",
    password: "Senha",
    confirm_password: "Confirmar Senha",
    race: "Etnia",
    schooling: "Escolaridade",
    individual_income: "Renda Individual Mensal",
    family_income: "Renda Familiar Mensal",
    address: "Endereço",
    birthday: "Aniversário",
    specialistId: "ID do Especialista",
}

async function formatData(data, essentialsTypes) {
    let essentials: any = {
        name: `${data["name"]} ${data["surname"]}`,
        type: data["type"],
    };
    let userData: any = data;

    const toRemove = ["name", "surname", "type"];
    let iterator = essentialsTypes.filter(( element ) => !toRemove.includes(element));
    iterator.forEach(type => {
        essentials[type] = data[type];
    });

    essentialsTypes.forEach(type => {
        delete userData[type];
    });

    return {essentials, userData, iterator};
}

const ProfileCard = async ({data, className, ...props}: any) => {

    const {essentials, userData, iterator} = await formatData(data, ["name", "surname", "uid", "email", "type"]);

    return (
        <Card className={cn("min-w-[600px]", className)} {...props}>
            <CardHeader>
                <CardTitle>{essentials["name"]}</CardTitle>
                <CardDescription>{(essentials.type == "specialist") ? "Especialista" : "Usuário"}</CardDescription>
            </CardHeader>
            <CardContent>
                {iterator.map((key) => (
                    <p>{`${description[key]}: ${essentials[key]}`}</p>
                ))}

                <Separator className="my-4"/>

                {Object.keys(userData).map((key) => (
                    <p>{`${description[key]}: ${userData[key]}`}</p>
                ))}
            </CardContent>
            <CardFooter>
                <Link className={buttonVariants({ variant: "outline" })} href="/">
                    Editar dados
                </Link>
            </CardFooter>
        </Card>

    )
}

export default ProfileCard