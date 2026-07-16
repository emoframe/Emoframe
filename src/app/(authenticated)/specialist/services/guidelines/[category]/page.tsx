import { notFound } from 'next/navigation';
import { getAllCategoryIds, getCategoryById, getGuidelinesByCategory } from '@/data/guidelines';
import { CategoryGuidelinesView } from '@/components/guidelines/CategoryGuidelinesView';

interface CategoryGuidelinesPageProps {
  params: { category: string };
}


export function generateStaticParams() {
  return getAllCategoryIds().map((category) => ({ category }));
}

export default function CategoryGuidelinesPage({ params }: CategoryGuidelinesPageProps) {
  const category = getCategoryById(params.category);

  if (!category) {
    notFound();
  }

  const categoryGuidelines = getGuidelinesByCategory(category.id);

  return <CategoryGuidelinesView category={category} guidelines={categoryGuidelines} />;
}