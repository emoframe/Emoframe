'use client'

import React from 'react'

import SusResultViewForm from '@/components/form/result-visualization/SusResultViewForm';
import SamResultViewForm from '@/components/form/result-visualization/SamResultViewForm';

import { useSearchParams } from 'next/navigation';

const ResultViewPage = () => {
    const searchParams = useSearchParams()
    const [uid, fid, typeForm] = [searchParams!.get('uid'), searchParams!.get('fid'), searchParams!.get('type')]

    switch(typeForm){
        // case 'Panas':
        //     return <PanasResultViewForm userId={uid!} formId={fid!} />
        case 'Sam':
            return <SamResultViewForm userId={uid!} formId={fid!} />
        case 'Sus':
            return <SusResultViewForm userId={uid!} formId={fid!} />
    }
}

export default ResultViewPage