'use client';

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";
import "@/config/i18";
import Image, { type StaticImageData } from "next/image";
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

export const OptionCard = ({ content, className = "w-full"}: { content: Content, className?:string}) => {
    const { t } = useTranslation('specialist_services_instruments');
    const { t: t2 } = useTranslation('specialist_users');
    
    return (
        <Card className={cn("shadow-2xl shadow-shadow_color bg-primary-background border-background hover:-translate-y-3 duration-300 overflow-hidden", className)}>
            <div className="flex flex-col md:flex-row items-center h-full"> 
                
                {content.image ? (
                    <div className={cn(
                        "flex items-center justify-center overflow-hidden shrink-0",
                        "w-full h-48 md:h-60 md:w-60 p-4 md:p-8", 
                        content.imageBgClass ? content.imageBgClass : "bg-white"
                    )}>
                        <Image
                            className='object-contain w-full h-full' 
                            src={content.image}
                            alt='imagem'
                        />
                    </div>
                ) : null}
                
                <div className="flex flex-col w-full md:flex-row md:flex-1 md:items-center">
                    
                    <CardHeader className="w-full">
                        <CardTitle className={cn(content.instruments ? "flex text-primary items-center gap-2 justify-between" : "flex items-center gap-2 justify-between")}>
                            <span className="truncate font-bold text-lg md:text-xl">{t(content.title)}</span>
                            {content.published && <Badge variant="secondary" className="shrink-0">Publicado</Badge>}
                        </CardTitle>
                        
                        {content.description && (
                            <CardDescription className="text-muted-foreground text-sm mt-2 line-clamp-3 md:line-clamp-none">
                                {t(content.description)}
                            </CardDescription>
                        )}
                    </CardHeader>

                    <CardFooter className="w-full md:w-auto p-6 pt-0 md:pt-6 md:pl-0">
                        <Button asChild className="w-full md:w-auto gap-4">
                            <Link href={content.href}>
                                {t2('accessLabel')} <ArrowRight size={18} />
                            </Link>
                        </Button>
                    </CardFooter>
                </div>

            </div>
        </Card>
    );
}