import * as React from "react";
import Mask, { Props } from "react-input-mask";
import { UseControllerReturn } from "react-hook-form";
import { cn } from "@/lib/utils";


interface MaskInputProps extends Props {
  className?: string,
  defaultValue?: string | number | readonly string[],
  placeholder?: string,
}

export const InputMask: React.FC<MaskInputProps> = ({ className, mask, defaultValue, value, placeholder, ...props }) => {
    return (
      <Mask
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        mask={mask} 
        defaultValue={defaultValue}
        value={value}
        placeholder={placeholder}
        {...props}
      />
    )
};

InputMask.displayName = "InputMask"
