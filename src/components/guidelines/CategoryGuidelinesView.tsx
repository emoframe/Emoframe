'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Guideline, GuidelineCategory } from '@/types/guideline';
import { GUIDELINES_BASE_PATH } from '@/data/guidelines';
import { GuidelineCard } from '@/components/guidelines/GuidelineCard';

interface CategoryGuidelinesViewProps {
  category: GuidelineCategory;
  guidelines: Guideline[];
}


export function CategoryGuidelinesView({ category, guidelines }: CategoryGuidelinesViewProps) {
  const { t } = useTranslation('diretrizes');

  return (
    <div className='w-full flex justify-center min-h-screen bg-gray-50/50 px-sidebar'>
      <div className='flex flex-col w-full max-w-2xl py-8 gap-6'>
        <Link
          href={GUIDELINES_BASE_PATH}
          className='inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-700 w-fit'
        >
          <ArrowLeft size={16} />
          {t('actions.back_to_categories', 'Voltar para categorias')}
        </Link>

        <div className='text-center'>
          <h1 className='text-2xl font-bold text-gray-800'>{category.label}</h1>
          {category.description && (
            <p className='font-light text-gray-500 mt-1'>{category.description}</p>
          )}
        </div>

        <div className='flex flex-col gap-4'>
          {guidelines.length > 0 ? (
            guidelines.map((guideline) => <GuidelineCard key={guideline.id} guideline={guideline} />)
          ) : (
            <p className='text-center text-sm text-gray-400'>
              {t('empty_category', 'Nenhuma diretriz cadastrada nesta categoria.')}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}