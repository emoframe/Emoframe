'use client'

import React from 'react';
import { Button } from './ui/button';
import OrderedList from './ui/ordered-list';
import { useTranslation } from 'react-i18next';

const LatestPublications: React.FC = () => {
  const { t } = useTranslation('specialist');
  return (
    <div className="bg-background p-6 rounded-lg shadow-lg mt-6">
      <h2 className="text-lg font-medium mb-4">{t('publicationsTitle')}</h2>
      <OrderedList listItems={['Entenda cada um dos serviços', 'SUS - Como funciona']}/>
      <Button className="mt-4">{t('seeMore')}</Button>
    </div>
  );
};

export default LatestPublications;