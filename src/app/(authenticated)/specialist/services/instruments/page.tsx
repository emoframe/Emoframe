'use client'

import { OptionCard, Content } from '@/components/OptionCard';
import { instruments } from '@/types/forms';
import React from 'react'
import { useTranslation } from 'react-i18next';


const InstrumentsCards = () => {
  const { i18n } = useTranslation('specialist_services_instruments');
  const transformedContent: Content[] = instruments.filter(ins => ins.locales.includes(i18n.language)).map(instrument => ({
    title: instrument.label,
    description: instrument.description || '', // String vazia se desciption for undefined
    href: `/specialist/services/instruments/fill?instrument=${instrument.value}`
  }));
  return (
    <>
      {transformedContent.map((content, index) => (
        <OptionCard key={index} content={content} />
      ))}
    </>
  );
}

const InstrumentsPage = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <InstrumentsCards/>
    </div>
  )
}

export default InstrumentsPage;