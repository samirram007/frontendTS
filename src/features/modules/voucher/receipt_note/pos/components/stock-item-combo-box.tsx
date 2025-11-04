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
import type { StockItem } from "@/features/modules/stock_item/data/schema"
import { cn } from "@/lib/utils"
import { capitalizeAllWords } from "@/utils/removeEmptyStrings"
import { type UseFormReturn } from "react-hook-form"
import type { StockJournalEntryForm } from "../../data/schema"



// const frameworks = [
//     {
//         value: "next.js",
//         label: "Next.js",
//     },
//     {
//         value: "sveltekit",
//         label: "SvelteKit",
//     },
//     {
//         value: "nuxt.js",
//         label: "Nuxt.js",
//     },
//     {
//         value: "remix",
//         label: "Remix",
//     },
//     {
//         value: "astro",
//         label: "Astro",
//     },
// ]
interface Props {
    stockItems: StockItem[];
    form: UseFormReturn<StockJournalEntryForm>;
}
export const StockItemCombobox = ({ stockItems, form }: Props) => {
    //const form = useFormContext<ReceiptNoteForm>()
    const [open, setOpen] = React.useState(false)
    // const index = currentIndex
    const [value, setValue] = React.useState(form.getValues(`stockItemId`)?.toString())

    const handleSelect = (value: string) => {
        const selected = stockItems.find((i) => i.id === Number(value));
        const quantity = 1
        form.setValue(`stockItemId`, Number(value))
        form.setValue(`quantity`, quantity)
        form.setValue(`stockUnitId`, selected?.stockUnitId)
        form.setValue(`rate`, selected?.standardCost)
        form.setValue(`amount`, (selected?.standardCost! * quantity))

        // ✅ Safely update nested field value by index
        // console.log(form.getValues('stockJournal'), index, "index")
        form.setValue(`stockItem`, selected ?? null, { shouldValidate: true, shouldDirty: true } // optional but recommended
        );

        setValue(value);
        setOpen(false);
    };
    console.log("StockItems: ", stockItems)
    const frameworks = stockItems?.map((stockItem: StockItem) => ({
        label: capitalizeAllWords(stockItem.name!),
        value: String(stockItem.id),
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
                        : "Select item..."}
                    <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="popover-content-width-same-as-trigger p-0">
                <Command className="rounded-lg border shadow-md min-w-full">
                    <CommandInput placeholder="Search item..." />
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