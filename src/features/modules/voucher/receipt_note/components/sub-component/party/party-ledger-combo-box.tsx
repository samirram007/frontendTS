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
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { capitalizeAllWords } from "@/utils/removeEmptyStrings"
import { useFormContext } from "react-hook-form"

import { useFocusNext } from "@/core/hooks/useFocusNext"
import type { PartyLedger } from "../../../../data-schema/partyLedger/data/schema"
import type { PartyForm, ReceiptNoteForm } from "../../../data/schema"

interface Props {

    partyLedgers: PartyLedger[];
    tabIndex?: number;
}

export const PartyLedgerCombobox = ({ partyLedgers }: Props) => {
    const form = useFormContext<ReceiptNoteForm>()
    const focusNext = useFocusNext();
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState(form.getValues('partyLedger.id')?.toString())
    const [enterCount, setEnterCount] = React.useState(0)

    const handleSelect = (value: string) => {
        // form.setValue("party", partyLedgers.find((party) => party.id === Number(value)))
        form.setValue("partyLedger.id", Number(value))
        const partyLedger = partyLedgers.find((partyLedger) => partyLedger.id === Number(value))
        const ledgerable = partyLedger?.ledgerable as any
        const party: PartyForm = {
            name: ledgerable?.name,
            mailingName: ledgerable?.name,
            line1: ledgerable?.address?.line1,
            line2: ledgerable?.address?.line2,
            line3: ledgerable?.address?.landmark,
            stateId: ledgerable?.address?.stateId ?? 36,
            countryId: ledgerable?.address?.countryId ?? 76,
            gstRegistrationTypeId: ledgerable?.gstRegistrationTypeId ?? 1,
            gstin: ledgerable?.gstin,
            placeOfSupplyStateId: ledgerable?.stateId ?? 36,
        }
        form.setValue("party", party)
        setValue(value)
        setOpen(false);
        setEnterCount(1)
        focusNext();
    }
    const handleBlur = () => {
        if (!form.getValues('partyLedger.id'))
            setOpen(true);
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
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between"
                    onKeyDown={handleKeyDown}
                    onBlur={handleBlur}

                >
                    {value
                        ? frameworks.find((framework) => framework.value === value)?.label
                        : "Select party..."}
                    <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </SheetTrigger>
            <SheetContent className="sheet-content-width-same-as-trigger p-0">
                <SheetHeader>
                    <SheetTitle>Search Party</SheetTitle>
                    <SheetDescription>
                        Select the party ledger for this receipt note.
                    </SheetDescription>
                </SheetHeader>
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
            </SheetContent>
        </Sheet>
    )
}