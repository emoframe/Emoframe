import React from 'react'

import { cn } from "@/lib/utils"
import Link from 'next/link';
import { mapPathToLink } from '@/lib/utils';

export interface BreadcrumbProps {
    className?: string,
    path: string
}

const Breadcrumb = ({ className, path } : BreadcrumbProps) => {

    const progressivePath = path.split('/').slice(1).map((_, index, array) => (`/${array.slice(0, index + 1).join('/')}`))
    
    React.useEffect(() => {
        mapPathToLink(progressivePath);
        console.log(`After use Effect ${progressivePath}`)
    }, [])  

    const CapitalPath = path.split('/').slice(1).map(currentPath => currentPath.charAt(0).toUpperCase() + currentPath.slice(1))

    // console.log(progressivePath)
    // console.log(CapitalPath)

    return (
        <div className={cn("flex items-center space-x-2 text-md bg-slate-300 w-fit px-2 py-1 rounded-md", className)}>
            {CapitalPath.map((path, index) => (
                    <div className="flex flex-row space-x-2 items-center" key={index}>
                    {
                        progressivePath[index] === '#' ? 
                        <BreadcrumbItem key={`Item${index}`}>
                            <BreadCrumbLink key={`Link${index}`} className="text-md" href={progressivePath[index]}>{path}</BreadCrumbLink>
                        </BreadcrumbItem>
                        :
                        <BreadcrumbItem key={`Item${index}`}>
                            <BreadCrumbLink key={`Link${index}`} className="text-md underline underline-offset-1" href={progressivePath[index]}>{path}</BreadCrumbLink>
                        </BreadcrumbItem>
                    }
                    {
                        index < CapitalPath.length - 1 ? 
                        <BreadCrumbSeparator key={`Sep${index}`}>
                            {">"}
                        </BreadCrumbSeparator> : null
                    }
                    </div>
            ))}
        </div>
    )
}

const BreadcrumbItem = React.forwardRef<
    HTMLDivElement, 
    React.HTMLAttributes<HTMLDivElement>>
(({ className, ...props}, ref) => (
    <div
    ref={ref}
    className={cn("flex items-center space-x-2 text-md", className)}
    {...props}
    />
))
BreadcrumbItem.displayName = "BreadcrumbItem"
 
const BreadCrumbLink = React.forwardRef<
    React.ElementRef<typeof Link>,
    React.ComponentPropsWithoutRef<typeof Link>
>(({ className, href, ...props }, ref) => (
    <Link
    ref={ref}
    href={href}
    className={cn("text-md", className)}
    {...props}
    />
))
BreadCrumbLink.displayName = "BreadCrumbLink"

const BreadCrumbSeparator = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
    ref={ref}
    className={cn("text-md text-muted-foreground", className)}
    {...props}
    />
))
BreadCrumbSeparator.displayName = "BreadCrumbSeparator"


export default Breadcrumb