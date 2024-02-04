import React from 'react'

import { cn } from "@/lib/utils"
import Link from 'next/link';
import { set } from 'date-fns';
import { count } from 'console';

export interface BreadcrumbProps {
    className?: string,
    path: string
}

const Breadcrumb = ({ className, path } : BreadcrumbProps) => {

    const [progressivePath, setProgressivePath] = React.useState(path.split('/').slice(1).map((_, index, array) => (`/${array.slice(0, index + 1).join('/')}`)))
    const [countReadyPaths, setcountReadyPaths] = React.useState(0)

    React.useEffect(() => {
        progressivePath.forEach((path, index) => {
            fetch(path)
            .then(response => {
                !response.ok ? 
                setProgressivePath((progressivePath) => {
                progressivePath[index] = '#'
                return progressivePath
                })  
            : 
                setProgressivePath((progressivePath) =>{
                progressivePath[index] = path
                return progressivePath
                })        
                setcountReadyPaths((countReadyPaths) => countReadyPaths + 1)
            })
        })

        console.log(countReadyPaths)
        return () => {
            setcountReadyPaths(0)
        }
    }, [progressivePath])
    
    const capitalPath = path.split('/').slice(1).map(currentPath => currentPath.charAt(0).toUpperCase() + currentPath.slice(1))
    
    // console.log(progressivePath)
    // console.log(CapitalPath)
    
    if(countReadyPaths < progressivePath.length) return null
    else return (
        <div className={cn("flex items-center space-x-2 text-md bg-slate-300 w-fit px-2 py-1 rounded-md", className)}>
            {progressivePath.map((path, index) => (
                    <div className="flex flex-row space-x-2 items-center" key={index}>
                    {
                        path === '#' ? 
                        <BreadcrumbItem key={`Item${index}`}>
                            <BreadCrumbDeadLink key={`Link${index}`}>{capitalPath[index]}</BreadCrumbDeadLink>
                        </BreadcrumbItem>
                        :
                        <BreadcrumbItem key={`Item${index}`}>
                            <BreadCrumbLink key={`Link${index}`} className="text-md underline underline-offset-1" href={path}>{capitalPath[index]}</BreadCrumbLink>
                        </BreadcrumbItem>
                    }
                    {
                        index < capitalPath.length - 1 ? 
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

const BreadCrumbDeadLink = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
    <p
    ref={ref}
    className={cn("text-md text-muted-foreground", className)}
    {...props}
    />

))
BreadCrumbDeadLink.displayName = "BreadCrumbDeadLink"

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