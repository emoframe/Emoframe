"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

import { Label } from '@/components/ui/label';

export interface LoadingProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string,
  value?: number
}


const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 bg-primary-foreground transition-all"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

const Loading = React.forwardRef<
    HTMLDivElement,
    LoadingProps
>(({ className, value, label, ...props }, ref) => (
      <div ref={ref} className={cn('flex flex-col items-center justify-center w-full h-full py-5', className)} {...props}>
        <Progress value={value} className='w-[150%] h-5' />
        <Label className='text-[20px]'> {label} </Label>
      </div>
))

Loading.displayName = "Loading"

    
export { 
  Progress,
  Loading
}
