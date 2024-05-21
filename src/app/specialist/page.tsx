'use client';
import React from 'react'
import { useTranslation } from 'react-i18next';

const SpecialistPage = () => {
  const { t } = useTranslation();

  return (
    <p>{t('Página do especialista')}</p>
  )
}

export default SpecialistPage;