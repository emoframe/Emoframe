import { FC, ReactNode } from 'react';
import type { Metadata } from 'next'

interface EazLayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: "EAZ",
  description: "Formulário Escala de Afetos de Zanon (EAZ)"
}

const SamLayout: FC<EazLayoutProps> = ({ children }) => {
    return <div className='flex bg-slate-200 p-10 my-12 rounded-md'>{children}</div>;
}

export default SamLayout;