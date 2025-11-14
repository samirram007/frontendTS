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
import { useFormContext } from "react-hook-form"
import { FaSignOutAlt } from "react-icons/fa"
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
interface StockItemComboboxProps {

    stockItems: StockItem[];
    handleRemove?: () => void;
}
export const StockItemCombobox = ({ stockItems, handleRemove }: StockItemComboboxProps) => {
    const form = useFormContext<StockJournalEntryForm>()
    const [open, setOpen] = React.useState(false)
    // const index = currentIndex
    // const [value, setValue] = React.useState(form.getValues(`stockItemId`)?.toString())
    const selectedId = form.watch('stockItemId')?.toString()
    const handleSelect = (value: string) => {
        if (value === '-1') {
            handleRemove?.();
            return
        }  
        const selected = stockItems.find((i) => i.id === Number(value));
        const quantity = 1
        form.setValue(`stockItemId`, Number(value))
        form.setValue(`actualQuantity`, quantity)
        form.setValue(`billingQuantity`, quantity)
        form.setValue(`stockUnitId`, selected?.stockUnitId)
        form.setValue(`rate`, selected?.standardCost)
        form.setValue(`rateUnitId`, selected?.stockUnitId)
        form.setValue(`discountPercentage`, 0)
        form.setValue(`discount`, (form.getValues(`rate`)! * form.getValues(`discountPercentage`)! / 100 * selected?.standardCost! * quantity))
        form.setValue(`amount`, (selected?.standardCost! * quantity - form.getValues(`discount`)!))

        // ✅ Safely update nested field value by index
        // console.log(form.getValues('stockJournal'), index, "index")
        form.setValue(`stockItem`, selected ?? null, { shouldValidate: true, shouldDirty: true } // optional but recommended
        );

        // setValue(value);
        setOpen(false);
    };

    const frameworks = [
        {
            label: (
                <div className="flex items-center justify-end gap-2 text-red-600 hover:text-red-800 font-medium">
                    <FaSignOutAlt className="  hover:text-red-800 h-4 w-4" />Finish Item Entries
                </div>
            ), value: "-1",
            className: "min-w-full bg-red-200 active:bg-red-300 data-[selected=true]:bg-red-400  "
        },
        ...(stockItems?.map((stockItem: StockItem) => ({
            label: capitalizeAllWords(stockItem.name!),
            value: String(stockItem.id),
            className: "min-w-full hover:bg-blue-300",
        })) ?? []),
    ];

    const selected = frameworks.find((o) => o.value === selectedId)
    const selectedLabel = selected ? (selected?.label.toString()) : 'Select item'



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