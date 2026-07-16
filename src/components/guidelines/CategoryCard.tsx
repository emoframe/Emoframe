import Link from 'next/link';
import { ChevronRight, Folder } from 'lucide-react';
import { GuidelineCategory } from '@/types/guideline';
import { getCategoryPath } from '@/data/guidelines';

interface CategoryCardProps {
  category: GuidelineCategory;
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      href={getCategoryPath(category.id)}
      className='flex items-center gap-4 border border-gray-200 rounded-xl p-4 bg-white hover:shadow-md hover:border-gray-300 transition-shadow w-full'
    >
      <div className={`bg-gray-50 rounded-lg p-3 shrink-0 ${category.colorClass ?? 'text-primary'}`}>
        <Folder size={22} />
      </div>

      <div className='flex flex-col flex-1 min-w-0'>
        <h3 className='text-base font-semibold text-gray-800 truncate'>{category.label}</h3>
        {category.description && (
          <p className='text-sm text-gray-500 line-clamp-2'>{category.description}</p>
        )}
      </div>

      <ChevronRight size={20} className='text-gray-400 shrink-0' />
    </Link>
  );
}