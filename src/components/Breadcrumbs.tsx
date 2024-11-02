'use client'

import React from 'react';
import { usePathname } from 'next/navigation'
import Link from 'next/link';
import { getPageTitle } from '@/lib/utils';

const Breadcrumbs: React.FC<{homeHref: string}> = ({homeHref}) => {
    const pathname = usePathname();
    return (
        <div className='flex gap-1'>
            <Link href={`/${homeHref}`} className='hover:text-primary transition-colors'>Home</Link>
            {pathname?.split('/').slice(2).map((pathSlice, i, arr) => {
                const path = `/${homeHref}/${arr.slice(0, i + 1).join('/')}`;
                return (
                    <React.Fragment key={path}>
                        <span>/</span>
                        <Link href={path} className='hover:text-primary transition-colors'>{getPageTitle(path) ?? pathSlice}</Link>
                    </React.Fragment>
                )
            })}
        </div>
    )
};

export default Breadcrumbs