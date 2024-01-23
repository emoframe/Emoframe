import { FC, ReactNode } from 'react';
import type { Metadata } from 'next'

interface SamLayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: "SAM",
  description: "Formulário Self-Assessment Manikin (SAM)"
}

const SamLayout: FC<SamLayoutProps> = ({ children }) => {
    return <div className='flex bg-primary-background p-10 m-y-10 rounded-md'>{children}</div>;
}

export default SamLayout;