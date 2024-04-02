import { ReactNode, Suspense } from 'react'


import { Loading } from '@/components/ui/progress';

interface ResultIdLayoutProps {
    children: ReactNode
}

const PDFViewLayout = ({ children } : ResultIdLayoutProps) => {
  return (
    <Suspense fallback={ <Loading label='Loading' />}>
      <div className="flex flex-col bg-primary-background lg:w-[1300px] md:min-w-full md:min-h-full">
        {children}
      </div>
    </Suspense>
  )
}

export default PDFViewLayout