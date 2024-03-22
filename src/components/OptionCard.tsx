'use client';

import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import Link from "next/link";

export type Content = {
  title: string,
  description: string,
  href: string,
}

export const OptionCard = ({ content }: { content: Content }) => {
  return (
    <Card className="shadow-2xl shadow-shadow_color bg-primary-background border-background border-2 hover:-translate-y-3 duration-300">
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
          <Link href={content.href}>
            Acessar <ArrowRight />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}