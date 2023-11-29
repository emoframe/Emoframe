import { FC, ReactNode } from 'react';
import type { Metadata } from 'next'

interface PanasLayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: "PANAS",
  description: "Formulário Positive and Negative Affect Schedule (PANAS)"
}

const SamLayout: FC<PanasLayoutProps> = ({ children }) => {
    return <div className='flex bg-slate-200 p-10 my-12 rounded-md'>{children}</div>;
}

export default SamLayout;