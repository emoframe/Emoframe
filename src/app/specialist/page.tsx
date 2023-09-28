'use client';

import { useSession } from 'next-auth/react';
import { buttonVariants } from "@/components/ui/button";
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react'

const SpecialistPage = () => {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/');
    },
  });

  return (
    <div>
      <Link className={buttonVariants()} href="/specialist/form">
        Cadastre
      </Link> 
    </div>
  )
}

export default SpecialistPage

SpecialistPage.requireAuth = true