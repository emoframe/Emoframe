import React from 'react'
import { OptionCard } from '@/components/OptionCard';

const Users = async () => {
  return (
      <>
          <h1 className="text-2xl font-bold mb-6">Usuários</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <OptionCard content={{title: 'Ver Usuários', description: '', href: '/specialist/users/list'}} />
              <OptionCard content={{title: 'Cadastrar Novo Usuário', description: '', href: '/specialist/users/form'}} />
          </div>
      </>
  )
}

export default Users;