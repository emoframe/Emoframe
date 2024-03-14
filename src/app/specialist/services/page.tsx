import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { instruments } from '@/types/forms';
import Link from 'next/link';
import React from 'react'

const ServicesPage = async () => {

  return (
    <div className="grid grid-flow-row gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {instruments.map((instrument) => {
            return (
              <Card
                key={instrument.value}
                className="rounded shadow-2xl shadow-shadow_color bg-primary-background border-none duration-300 hover:-translate-y-3"
              >
                <CardHeader>
                  <CardTitle>{instrument.label}</CardTitle>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <Link
                    className={buttonVariants({ variant: "default" })}
                    href={`/specialist/services/fill?instrument=${instrument.value}`}
                    replace
                  >
                    Acessar
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
  )
}

export default ServicesPage;