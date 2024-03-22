import { OptionCard, Content } from '@/components/OptionCard';
import React from 'react'

const contents: Content[] = [
  {title: "Instrumentos", description: "Lorem Ipsum", href: "/specialist/services/instruments"},
  {title: "Modelos", description: "Lorem Ipsum", href: "/specialist/services/templates"},
]

const ServiceCards = () => {
  return (
    <>
      {contents.map((content, index) => (
        <OptionCard key={index} content={content} />
      ))}
    </>
  );
}

const ServicesPage = () => {
  return (
    <div className="grid gric-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <ServiceCards/>
    </div>
  )
}

export default ServicesPage