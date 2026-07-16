import { notFound } from 'next/navigation';
import { getGuideline, getGuidelinesByCategory } from '@/data/guidelines';
import { GuidelineContent } from '@/components/guidelines/GuidelineContent';

interface GuidelinePageProps {
  params: { category: string; id: string };
}


export function generateStaticParams({ params }: { params: { category: string } }) {
  return getGuidelinesByCategory(params.category).map((guideline) => ({ id: guideline.id }));
}

export default function GuidelinePage({ params }: GuidelinePageProps) {
  const guideline = getGuideline(params.category, params.id);

  if (!guideline) {
    notFound();
  }

  return <GuidelineContent guideline={guideline} />;
}