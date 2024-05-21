import React from 'react';
import ProfileCardClient from './profile-card-client';
import { headers } from 'next/headers';

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

async function formatData(data, essentialsTypes) {
    let essentials = {
        name: `${data["name"]} ${data["surname"]}`,
        type: data["type"],
    };
    let userData = data;

    const toRemove = ["name", "surname", "type"];
    let iterator = essentialsTypes.filter(element => !toRemove.includes(element));
    iterator.forEach(type => {
        essentials[type] = data[type];
    });

    essentialsTypes.forEach(type => {
        delete userData[type];
    });

    return { essentials, userData, iterator };
}

const ProfileCardServer = async ({ data, className, ...props }) => {
    const { essentials, userData, iterator } = await formatData(data, ["name", "surname", "uid", "email", "type"]);

    const headersList = headers();
    const header_url = headersList.get('x-url') || "";
    const pathname = headersList.get('x-pathname');
    const origin_url = headersList.get('x-origin');

    return (
        <ProfileCardClient
            essentials={essentials}
            userData={userData}
            iterator={iterator}
            className={className}
            pathname={pathname}
            {...props}
        />
    );
};

export default ProfileCardServer;
