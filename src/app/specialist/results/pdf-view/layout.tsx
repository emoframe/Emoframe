import { ReactNode, Suspense } from 'react'

interface ResultIdLayoutProps {
    children: ReactNode
}

const ResultIdLayout = ({ children } : ResultIdLayoutProps) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex flex-col bg-primary-background lg:w-[1200px]  md:w-full h-full">
        {children}
      </div>
    </Suspense>
  )
}

export default ResultIdLayout