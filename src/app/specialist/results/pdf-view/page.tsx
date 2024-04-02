'use client';

import React from 'react'

import { useSearchParams } from 'next/navigation';

import PDFViewFetch from '@/components/pdf-view/PDFViewFetch';

const PDFViewPage = () => {

  const params = useSearchParams();
  const [ eid, aid, type ] = [params?.get('eid')!, params?.get('aid')!, params?.get('type')!]

  return (
    <PDFViewFetch eid={eid} aid={aid} type={type} />
  )
}

export default PDFViewPage