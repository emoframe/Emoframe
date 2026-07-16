'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, FileText } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Guideline } from '@/types/guideline';
import { getCategoryPath } from '@/data/guidelines';

interface GuidelineContentProps {
  guideline: Guideline;
}

export function GuidelineContent({ guideline }: GuidelineContentProps) {
  const { t } = useTranslation('diretrizes');

  return (
    <div className='w-full flex justify-center min-h-screen bg-gray-50/50 px-sidebar'>
      <div className='flex flex-col w-full max-w-3xl py-8 gap-6'>
        <Link
          href={getCategoryPath(guideline.categoryId)}
          className='inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-700 w-fit'
        >
          <ArrowLeft size={16} />
          {t('actions.back', 'Voltar')}
        </Link>

        <div className='flex flex-col rounded-xl bg-white shadow-md w-full overflow-hidden'>
          <div className='flex items-center gap-4 p-6 border-b border-gray-100'>
            <div className={`bg-gray-50 rounded-lg p-3 shrink-0 ${guideline.colorClass ?? 'text-primary'}`}>
              <FileText size={24} />
            </div>
            <div className='flex flex-col'>
              <h1 className='text-xl font-bold text-gray-800'>{guideline.title}</h1>
              {guideline.updatedAt && (
                <p className='text-xs text-gray-400 mt-1'>
                  {t('updated_at', 'Atualizado em')} {guideline.updatedAt}
                </p>
              )}
            </div>
          </div>

          <div className='flex flex-col gap-6 p-6'>
            <p className='text-gray-600'>{guideline.summary}</p>

            {guideline.sections.map((section) => (
              <div key={section.heading} className='flex flex-col gap-2'>
                <h2 className='text-base font-semibold text-gray-800'>{section.heading}</h2>
                {section.body.map((paragraph, index) => (
                  <p key={index} className='text-sm text-gray-600 leading-relaxed'>
                    {paragraph}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}