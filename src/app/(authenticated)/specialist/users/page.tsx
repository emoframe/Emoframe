import React from 'react'
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../../pages/api/auth/[...nextauth]'
import { search } from '@/lib/firebase';
import UsersClientContent from '@/components/UserClientContent';


const getCategory = (birthDate: Date) => {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
    return age >= 60 ? "idoso" : "adulto";
};

const Users = async () => {
    const session = await getServerSession(authOptions);
    const specialistId = session?.user?.uid || (session?.user as any)?.id || null;
    const userName = session?.user?.name?.split(' ')[0] || 'Especialista';

    let formattedUsers: any[] = [];
    
    if (specialistId) {
        try {
            const rawUsers = await search("user", [
                { field: "specialistId", operation: "==", value: specialistId }
            ]);

            formattedUsers = rawUsers.map((u: any) => {
                let birthDateObj = new Date();
                if (u.birthday?.seconds) birthDateObj = new Date(u.birthday.seconds * 1000);
                else if (u.birthday) birthDateObj = new Date(u.birthday);

                return {
                    id: u.uid || u.id,
                    name: `${u.name} ${u.surname || ''}`.trim(),
                    type: "usuário",
                    category: getCategory(birthDateObj),
                    email: u.email,
                    birthDate: birthDateObj.toLocaleDateString('pt-BR'),
                    gender: u.gender || "Não informado",
                    pending: u.pendingEvaluations || 0,
                    completed: u.completedEvaluations || 0,
                    image: u.image || "/images/user.svg"
                };
            });
        } catch (error) {
            console.error("Erro ao buscar usuários no servidor:", error);
        }
    }
    return (
        <UsersClientContent 
            initialUsers={formattedUsers} 
            userName={userName}
            specialistId={specialistId}
        />
    )
}

export default Users;