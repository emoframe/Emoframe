import { FC, ReactNode } from 'react'

interface ResultsLayoutPageProps {
    children: ReactNode
}

const ResultsLayoutPage: FC<ResultsLayoutPageProps> = ({ children }) => {
  return (
    <div className="flex flex-col bg-primary-background p-5 m-5 rounded-md">{children}</div>
  )
}

export default ResultsLayoutPage