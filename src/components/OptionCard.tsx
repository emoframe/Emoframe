'use client';

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export type Content = {
  title: string,
  description: string,
  href: string,
  published?: boolean
}

export const OptionCard = ({ content }: { content: Content }) => {
  return (
    <Card className="flex flex-col h-[250px] w-[250px] shadow-2xl shadow-shadow_color bg-primary-background border-background border-2 hover:-translate-y-3 duration-300">
      <div className="flex flex-col justify-between flex-1"> {/* Container flex para gerenciar o layout interno */}
        <CardHeader>
          <CardTitle className="flex items-center gap-2 justify-between">
            <span className="truncate font-bold">{content.title}</span>
            {content.published && <Badge>Publicado</Badge>}
          </CardTitle>
          {content.description && (
            <CardDescription className="flex items-center justify-between text-muted-foreground text-sm">
              {content.description}
            </CardDescription>
          )}
        </CardHeader>
        <CardFooter className="mt-auto"> {/* mt-auto para empurrar o rodapé para baixo */}
          <Button asChild className="w-full mt-2 text-md gap-4">
            <Link href={content.href}>
              Acessar <ArrowRight />
            </Link>
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
}
