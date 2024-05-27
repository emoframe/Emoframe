'use client';

import React from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { useTranslation } from 'react-i18next';

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
    forms: "Formulários",
};

const translateGender = (gender, t) => {
    const genderMap = {
        "Feminino": t("Feminino"),
        "Masculino": t("Masculino"),
        "Não sei/Prefiro não dizer": t("Não sei/Prefiro não dizer"),
        "Outro": t("Outro")
    };
    return genderMap[gender] || gender;
};

const ProfileCardClient = ({ essentials, userData, iterator, className = "", pathname, ...props }) => {
    const { t } = useTranslation();

    return (
        <Card className={cn("min-w-[600px]", className)} {...props}>
            <CardHeader>
                <CardTitle>{essentials["name"]}</CardTitle>
                <CardDescription>{(essentials.type === "specialist") ? t("Especialista") : t("Usuário")}</CardDescription>
            </CardHeader>
            <CardContent>
                {iterator.map(key => (
                    <p key={key}>{`${t(description[key])}: ${key === 'gender' ? translateGender(essentials[key], t) : essentials[key]}`}</p>
                ))}

                <Separator className="my-4" />

                {Object.keys(userData).map(key => (
                    <p key={key}>{`${t(description[key])}: ${key === 'gender' ? translateGender(userData[key], t) : userData[key]}`}</p>
                ))}
            </CardContent>
            <CardFooter>
                <Link className={buttonVariants({ variant: "outline" })} href={`${pathname}/edit/data`} replace>
                    {t('Editar dados')}
                </Link>
            </CardFooter>
        </Card>
    );
};

export default ProfileCardClient;
