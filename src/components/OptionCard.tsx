'use client';

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";
import "@/config/i18";
import Image, { type ImageLoaderProps, type ImageProps, type StaticImageData } from "next/image";
import { cn } from "@/lib/utils";

export type Content = {
    title: string,
    description: string,
    href: string,
    published?: boolean
    image?: StaticImageData
    imageBgClass?: string,
    instruments?: boolean
}

export const OptionCard = ({ content, className = "w-1/2"}: { content: Content, className?:string}) => {
    const { t } = useTranslation('specialist_services_instruments');
    const { t: t2 } = useTranslation('specialist_users');
    return (
        <Card className={cn("flex flex-col shadow-2xl shadow-shadow_color bg-primary-background border-background hover:-translate-y-3 duration-300 overflow-hidden", className)}>
            <div className="flex justify-center items-center"> 
                
                {content.image ? (
                    <div className={cn(
                        "h-60 w-60 flex items-center p-8 justify-center overflow-hidden",
                        content.imageBgClass ? content.imageBgClass : "bg-white"
                    )}>
                        <Image
                            className='object-contain p-4 h-full w-full' 
                            src={content.image}
                            alt='imagem'
                        />
                    </div>
                ) : null}
                
                <CardHeader className="flex-1">
                    <CardTitle className={cn(content.instruments ? "flex text-primary items-center gap-2 justify-between" : "flex items-center gap-2 justify-between")}>
                        <span className="truncate font-bold">{t(content.title)}</span>
                        {content.published && <Badge>Publicado</Badge>}
                    </CardTitle>
                    {content.description && (
                        <CardDescription className="flex items-center justify-between text-muted-foreground text-sm">
                            {t(content.description)}
                        </CardDescription>
                    )}
                </CardHeader>
                <CardFooter className="">
                    <Button asChild className="w-full mt-2 text-md gap-4">
                        <Link href={content.href}>
                            {t2('accessLabel')} <ArrowRight />
                        </Link>
                    </Button>
                </CardFooter>
            </div>
        </Card>
    );
}
