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
import { FaSignOutAlt } from "react-icons/fa"
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
            label: (
                <div className="flex items-center justify-end gap-2 text-red-600 hover:text-red-800 font-medium">
                    <FaSignOutAlt className="  hover:text-red-800 h-4 w-4" />Finish Godown Entries
                </div>
            ), value: "-1",
            className: "flex flex-row justify-end text-right min-w-full   active:bg-red-200 data-[selected=true]:bg-red-200 [selected=true]:text-gray-200  "
        },
        ...(godowns?.map((godown: Godown) => ({
            label: capitalizeAllWords(godown.name!),
            value: String(godown.id),
            className: "min-w-full hover:bg-blue-300",
        })) ?? []),
    ];

    const selected = frameworks.find((o) => o.value === selectedId)
    console.log("SELECTED GODOWN: ", selectedId, selected)
    const selectedLabel = selected ? (selected?.label?.toString() ?? 'Select godown') : 'Select godown'


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
                    <CommandInput placeholder="Search godown..." />
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