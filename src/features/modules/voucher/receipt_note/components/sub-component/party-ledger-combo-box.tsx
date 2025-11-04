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

import type { PartyLedger } from "../../../data-schema/partyLedger/data/schema"
import type { ReceiptNoteForm } from "../../data/schema"

interface Props {
    form: UseFormReturn<ReceiptNoteForm>;
    partyLedgers: PartyLedger[];
}

export const PartyLedgerCombobox = ({ form, partyLedgers }: Props) => {

    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState(form.getValues('partyLedger.id')?.toString())
    const [enterCount, setEnterCount] = React.useState(0)

    const handleSelect = (value: string) => {
        // form.setValue("party", partyLedgers.find((party) => party.id === Number(value)))
        form.setValue("partyLedger.id", partyLedgers.find((partyLedger) => partyLedger.id === Number(value))?.id!)
        setValue(value)
        setOpen(false);
        setEnterCount(1)
    }
    const frameworks = partyLedgers?.map((partyLedger: PartyLedger) => ({
        label: capitalizeAllWords(partyLedger.name!),
        value: String(partyLedger.id),
    }))



    const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
        if (e.key !== "Enter") {
            setEnterCount(0)
            return
        }

        e.preventDefault()
        console.log("ENTER COUNT:", enterCount)
        if (enterCount === 0) {
            // 🔹 1st Enter → open dropdown
            setOpen(true)
        } else if (enterCount === 1) {
            // 🔹 2nd Enter → select current option and move focus
            const selected = frameworks.find((f) => f.value === value)
            if (selected) {
                console.log("Selected:", selected)
                setOpen(false)
            }

            // 🔹 Move to next focusable element in same form
            const formEl = (e.currentTarget as HTMLButtonElement).form
            console.log("formEl", formEl)
            if (formEl) {
                const elements = Array.from(
                    formEl.querySelectorAll<HTMLElement>(
                        "input, select, textarea, button, [tabindex]:not([tabindex='-1'])"
                    )
                )
                const index = elements.indexOf(e.currentTarget)
                const nextEl = elements[index + 1]
                if (nextEl) {
                    nextEl.focus()
                }
            }

            // Reset count after finishing
            setEnterCount(0)
        }

        // Increment for next Enter
        setEnterCount((prev) => prev + 1)
    }
    // React.useEffect(() => {
    //     if (enterCount > 0) {
    //         const timer = setTimeout(() => setEnterCount(0), 800)
    //         return () => clearTimeout(timer)
    //     }
    // }, [enterCount])
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button 
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between"  
                    onKeyDown={handleKeyDown}
                >
                    {value
                        ? frameworks.find((framework) => framework.value === value)?.label
                        : "Select party..."}
                    <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="popover-content-width-same-as-trigger p-0">
                <Command className="rounded-lg border shadow-md min-w-full">
                    <CommandInput placeholder="Search party..." />
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