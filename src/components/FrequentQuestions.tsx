'use client'

import React from 'react';
import { Button } from './ui/button';
import OrderedList from './ui/ordered-list';
import { useTranslation } from 'react-i18next';

const LatestPublications: React.FC = () => {
  const { t } = useTranslation('user');
  return (
    <div className="bg-background p-6 rounded-lg shadow-lg mt-6">
      <h2 className="text-lg font-medium mb-4">{t('fAQTitle')}</h2>
      <OrderedList listItems={t('fAQItems', {returnObjects: true}) as string[]}/>
      <Button className="mt-4">{t('fAQMore')}</Button>
    </div>
  );
};

export default LatestPublications;