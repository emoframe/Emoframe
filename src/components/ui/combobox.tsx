"use client"

import * as React from "react"
import { useState } from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Options } from "@/types/forms"


const Combobox = ({ onSelect, defaultValue, options, placeholder, className }:
    {
        onSelect: (currentValue: string) => void,
        defaultValue?: string,
        options: Options[],
        placeholder: string,
        className?: string
    }
) => {
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState(defaultValue ? defaultValue : "")

    React.useEffect(() => {
        console.log(value);
    },[value])

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={cn("w-full justify-between text-left font-normal", className)}
                >
                    {
                        value // value fica em lowercase
                        ? options.find((option) => option.value === value)?.label
                        : placeholder
                    }
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className={cn("p-0", className)}>
                <Command>
                    <CommandInput placeholder={placeholder} />
                    <CommandEmpty>Nada encontrado.</CommandEmpty>
                    <CommandGroup>
                        {options.map((option) => (
                            <CommandItem
                                key={option.value}
                                value={option.value}
                                onSelect={(currentValue) => {
                                    onSelect(currentValue === value ? "" : currentValue);
                                    setValue(currentValue === value ? "" : currentValue);
                                    setOpen(false);
                                }}
                            >
                                <Check
                                    className={cn(
                                        "mr-2 h-4 w-4",
                                        value === option.value ? "opacity-100" : "opacity-0"
                                    )}
                                />
                                {option.label}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    )
}

export default Combobox;