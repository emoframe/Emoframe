import { FC, ReactNode } from 'react';
import type { Metadata } from 'next'

interface PanasLayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: "SUS",
  description: "Formulário System Usability Scale (SUS)"
}

const SusLayout: FC<PanasLayoutProps> = ({ children }) => {
    return <div className='flex bg-slate-200 p-10 my-12 rounded-md'>{children}</div>;
}

export default SusLayout;