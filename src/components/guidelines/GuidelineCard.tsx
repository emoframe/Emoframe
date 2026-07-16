import Link from 'next/link';
import { ChevronRight, FileText } from 'lucide-react';
import { Guideline } from '@/types/guideline';
import { getGuidelinePath } from '@/data/guidelines';

interface GuidelineCardProps {
  guideline: Guideline;
}

export function GuidelineCard({ guideline }: GuidelineCardProps) {
  return (
    <Link
      href={getGuidelinePath(guideline.categoryId, guideline.id)}
      className='flex items-center gap-4 border border-gray-200 rounded-xl p-4 bg-white hover:shadow-md hover:border-gray-300 transition-shadow w-full'
    >
      <div className={`bg-gray-50 rounded-lg p-3 shrink-0 ${guideline.colorClass ?? 'text-primary'}`}>
        <FileText size={22} />
      </div>

      <div className='flex flex-col flex-1 min-w-0'>
        <h3 className='text-base font-semibold text-gray-800 truncate'>{guideline.title}</h3>
        <p className='text-sm text-gray-500 line-clamp-2'>{guideline.summary}</p>
      </div>

      <ChevronRight size={20} className='text-gray-400 shrink-0' />
    </Link>
  );
}