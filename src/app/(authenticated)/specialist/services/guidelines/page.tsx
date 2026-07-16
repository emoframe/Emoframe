'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import { guidelineCategories } from '@/data/guidelines';
import { CategoryCard } from '@/components/guidelines/CategoryCard';

export default function GuidelineCategoriesPage() {
  const { t } = useTranslation('diretrizes');

  return (
    <div className='w-full flex justify-center min-h-screen bg-gray-50/50 px-sidebar'>
      <div className='flex flex-col w-full max-w-2xl py-8 gap-6'>
        <div className='text-center'>
          <h1 className='text-2xl font-bold text-gray-800'>{t('title', 'Diretrizes')}</h1>
          <p className='font-light text-gray-500 mt-1'>
            {t('subtitle', 'Selecione uma categoria para ver as diretrizes disponíveis')}
          </p>
        </div>

        <div className='flex flex-col gap-4'>
          {guidelineCategories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </div>
  );
}