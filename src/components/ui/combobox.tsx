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
import { Option } from "@/types/forms"


const Combobox = ({ onSelect, options, placeholder, className }:
    {
        onSelect: (currentValue: string) => void,
        options: Option[],
        placeholder: string,
        className?: string
    }
) => {
    const [open, setOpen] = useState(false)
    const [selectedOption, setSelectedOption] = useState<Option | null>(null);

    React.useEffect(() => {
        console.log(selectedOption);
    },[selectedOption])

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
                        selectedOption // selectedOption fica em lowercase
                        ? <>{selectedOption.label}</>
                        : <>{placeholder}</>
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
                                onSelect={() => {
                                    setSelectedOption(option);
                                    onSelect(option.value);
                                    setOpen(false);
                                }}
                            >
                                <Check
                                    className={cn(
                                        "mr-2 h-4 w-4",
                                        selectedOption?.value === option.value ? "opacity-100" : "opacity-0"
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