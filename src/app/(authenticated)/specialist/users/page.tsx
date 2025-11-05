import React from 'react'
import { OptionCard } from '@/components/OptionCard';
import CardsTitle from '@/components/CardsTitle';

const Users = async () => {
    return (
        <div className="flex justify-center w-full px-4 py-6 print:!p-0">
            <div className="flex flex-col justify-center items-center bg-primary-background p-4 rounded-md shadow print:w-full">
                <div className='flex flex-col w-full print:items-center'>
                    <CardsTitle ns='specialist_users' />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <OptionCard content={{ title: 'specialist_users:optionTitleView', description: '', href: '/specialist/users/list' }} />
                        <OptionCard content={{ title: 'specialist_users:optionTitleRegister', description: '', href: '/specialist/users/form' }} />
                    </div>
                </div>
            </div>
        </div>


    )
}

export default Users;