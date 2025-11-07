"use client"

import { CheckIcon, ChevronsUpDownIcon } from "lucide-react"
import * as React from "react"

import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { capitalizeAllWords } from "@/utils/removeEmptyStrings"
import { useFormContext } from "react-hook-form"

import type { Godown } from "@/features/modules/godown/data/schema"
import type { StockJournalGodownEntryForm } from "../../data/schema"

interface GodownComboboxProps {
    handleRemove?: () => void;
    godowns: Godown[];
}
export const GodownCombobox = ({ godowns, handleRemove }: GodownComboboxProps) => {
    const form = useFormContext<StockJournalGodownEntryForm>()
    const [open, setOpen] = React.useState(false)
    const selectedId = form.watch('godownId')?.toString()

    const handleSelect = (value: string) => {
        if (value === '-1') {
            handleRemove?.();
        } else {
            const selected = godowns.find((i) => i.id === Number(value));
            form.setValue(`godownId`, Number(value))
            form.setValue(`godown`, selected ?? null, { shouldValidate: true, shouldDirty: true }
            );
        }
        setOpen(false);
    };
    const frameworks = [
        {
            label: "End Selection", value: "-1",
            className: "min-w-full bg-red-200 active:bg-red-300 data-[selected=true]:bg-red-400  "
        },
        ...(godowns?.map((godown: Godown) => ({
            label: capitalizeAllWords(godown.name!),
            value: String(godown.id),
            className: "min-w-full hover:bg-blue-300",
        })) ?? []),
    ];

    const selected = frameworks.find((o) => o.value === selectedId)
    const selectedLabel = selected ? (selected?.label + ` - ` + selected?.value) : 'Select godown'


    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={cn("w-full justify-between")}
                    autoFocus={true}
                >
                    {selectedLabel}
                    <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="popover-content-width-same-as-trigger p-0">
                <Command className="rounded-lg border shadow-md min-w-full">
                    <CommandInput placeholder="Search item..." />
                    <CommandList>
                        <CommandEmpty>No godown found.</CommandEmpty>
                        <CommandGroup>

                            {frameworks.map((framework) => (
                                <CommandItem
                                    className={cn("justify-start", framework.className)}
                                    key={framework.value}
                                    value={framework.value}
                                    onSelect={() => handleSelect(framework.value)}
                                >
                                    <CheckIcon
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            selectedId === framework.value ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    {framework.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}