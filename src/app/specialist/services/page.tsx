import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

type Content = {
  title: string,
  description: string,
  href: string,
}

const contents: Content[] = [
  {title: "Instrumentos", description: "Lorem Ipsum", href: "instruments"},
  {title: "Modelos", description: "Lorem Ipsum", href: "templates"},
]

const ServiceCard = ({ content }: { content: Content }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 justify-between">
          <span className="truncate font-bold">{content.title}</span>
        </CardTitle>
        <CardDescription className="flex items-center justify-between text-muted-foreground text-sm">
          {content.description}
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button asChild className="w-full mt-2 text-md gap-4">
          <Link href={`/services/${content.href}`}>
            Acessar <ArrowRight />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

const ServicesPage = () => {
  return (
    <div>ServicesPage</div>
  )
}

export default ServicesPage