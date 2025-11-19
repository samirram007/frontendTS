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
import type { UseFormReturn } from "react-hook-form"

import type { TransactionLedger } from "../../../data-schema/transactinableStockItem/data/schema"
import type { ReceiptNoteForm } from "../../data/schema"

interface Props {
    form: UseFormReturn<ReceiptNoteForm>;
    transactionLedgers: TransactionLedger[];
}
export const TransactionLedgerCombobox = ({ form, transactionLedgers }: Props) => {

    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState(form.getValues('transactionLedger.id')?.toString())

    const handleSelect = (value: string) => {
        form.setValue("transactionLedger.id", transactionLedgers.find((transactionLedger) => transactionLedger.id === Number(value))?.id!)
        setValue(value)
        setOpen(false)
    }
    const frameworks = transactionLedgers?.map((transactionLedger: TransactionLedger) => ({
        label: capitalizeAllWords(transactionLedger.name!),
        value: String(transactionLedger.id),
    }))



    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between"
                >
                    {value
                        ? frameworks.find((framework) => framework.value === value)?.label
                        : "Select stock ledger..."}
                    <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="popover-content-width-same-as-trigger p-0">
                <Command className="rounded-lg border shadow-md min-w-full">
                    <CommandInput placeholder="Search purchase ledger..." />
                    <CommandList>
                        <CommandEmpty>No pary found.</CommandEmpty>
                        <CommandGroup>
                            {frameworks.map((framework) => (
                                <CommandItem
                                    className="min-w-full"
                                    key={framework.value}
                                    value={framework.value}
                                    onSelect={() => handleSelect(framework.value)}
                                >
                                    <CheckIcon
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            value === framework.value ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    {framework.label} [{framework.value}]
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}