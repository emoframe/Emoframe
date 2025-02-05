import React from 'react'
import { OptionCard } from '@/components/OptionCard';
import CardsTitle from '@/components/CardsTitle';

const Users = async () => {
    return (
        <>
            <CardsTitle ns='specialist_users'/>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <OptionCard content={{ title: 'specialist_users:optionTitleView', description: '', href: '/specialist/users/list' }} />
                <OptionCard content={{ title: 'specialist_users:optionTitleRegister', description: '', href: '/specialist/users/form' }} />
            </div>
        </>
    )
}

export default Users;