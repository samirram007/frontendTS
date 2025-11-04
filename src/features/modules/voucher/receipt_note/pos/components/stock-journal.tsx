

import FormInputField from "@/components/form-input-field"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { fetchGodownService } from "@/features/modules/godown/data/api"
import { fetchStockItemService } from "@/features/modules/stock_item/data/api"
import { fetchStockUnitService } from "@/features/modules/stock_unit/data/api"
import { zodResolver } from "@hookform/resolvers/zod"
import { useQueries } from "@tanstack/react-query"
import { useForm, type UseFormReturn } from "react-hook-form"

import { Input } from "@/components/ui/input"
import type { Godown } from "@/features/modules/godown/data/schema"
import type { StockItem } from "@/features/modules/stock_item/data/schema"
import type { StockUnit } from "@/features/modules/stock_unit/data/schema"
import { useEffect, useMemo, useState } from "react"
import { stockJournalEntryDefaultValues, stockJournalGodownEntryDefaultValues } from "../../data/data"
import { stockJournalEntrySchema, stockJournalGodownEntrySchema, stockJournalSchema, type StockJournalEntryForm, type StockJournalForm, type StockJournalGodownEntryForm } from '../../data/schema'
import { GodownCombobox } from "./godown-combo-box"
import { StockItemCombobox } from "./stock-item-combo-box"
import { StockUnitCombobox } from "./stock-unit-combo-box"

type StockJournalProps = {
    onSave: (values: StockJournalForm) => void
    defaultValues: StockJournalForm
}

const StockJournal = ({ onSave, defaultValues }: StockJournalProps) => {
    const stockJournalForm = useForm<StockJournalForm>({
        resolver: zodResolver(stockJournalSchema),
        defaultValues: defaultValues,
    })
    // console.log(stockJournalForm.getValues("journalDate"))
    return (
        <Form {...stockJournalForm}>
            <div className="grid grid-cols-3 gap-8">

                <FormInputField type="text" form={stockJournalForm} name="journalNo" />
                <FormInputField type="date" form={stockJournalForm} name="journalDate" />
                <FormInputField type="text" form={stockJournalForm} name="type" />
            </div>
            <StockJournalEntries onSave={onSave} defaultValues={stockJournalForm.getValues("stockJournalEntries")} />
        </Form>
    )
}

export default StockJournal

type StockJournalEntriesProps = {
    onSave: (values: StockJournalForm) => void
    defaultValues: StockJournalEntryForm[]
}
const StockJournalEntries = ({ onSave, defaultValues }: StockJournalEntriesProps) => {

    return (
        <>
            <StockJournalEntry onSave={onSave} />
        </>
    )
}
type StockJournalEntriyProps = {
    onSave: (values: StockJournalForm) => void
}
const StockJournalEntry = ({ onSave }: StockJournalEntriyProps) => {
    const results = useQueries({
        queries: [
            {
                queryKey: ["stockItems"],
                queryFn: fetchStockItemService,
            },
            {
                queryKey: ["godowns"],
                queryFn: fetchGodownService,
            },
            {
                queryKey: ["stockUnits"],
                queryFn: fetchStockUnitService,
            },
        ],
    })

    const [stockItems, godowns, stockUnits] = results
    const stockJournalEntryForm = useForm<StockJournalEntryForm>({
        resolver: zodResolver(stockJournalEntrySchema),
        defaultValues: stockJournalEntryDefaultValues,
    })
    const handleSubmit = () => {

    }
    if (results.some((r) => r.isLoading)) return <div>Loading...</div>
    return (
        <>
            <Form {...stockJournalEntryForm}>
                <div className="grid grid-cols-5 gap-4">

                    <StockItemCombobox
                        form={stockJournalEntryForm}
                        stockItems={stockItems?.data?.data} />
                    <StockUnitCombobox
                        form={stockJournalEntryForm}
                        stockUnits={stockUnits?.data?.data} />
                    <FormInputField type="text" form={stockJournalEntryForm} name="quantity" />
                    <FormInputField type="text" form={stockJournalEntryForm} name="stockUnitId" />
                    <FormInputField type="text" form={stockJournalEntryForm} name="rate" />
                    <FormInputField type="text" form={stockJournalEntryForm} name="amount" />

                </div>
                <div>
                    <div className="border-inside-all 
                    grid grid-cols-[200px_280px_300px_150px_80px_80px_200px_1fr] 
                    bg-gray-300 text-center border-border">
                        <div className="border-r-0!  ">Godown</div>

                        <div className="grid grid-rows-2 border-0!">
                            <div className="border-b-0!  ">Batch/Lot No.</div>
                            <div className="grid grid-cols-2 items-center">
                                <div className="border-y-0! border-x-0!  ">mfg</div>
                                <div className="border-y-0! border-r-0!  ">exp</div>
                            </div>
                        </div>
                        <div className="grid grid-rows-2 border-0!">
                            <div className="border-b-0!  ">Quantity</div>
                            <div className="grid grid-cols-2 items-center">
                                <div className="border-y-0! border-x-0!  ">Actual</div>
                                <div className="border-y-0! border-r-0!  ">Billing</div>
                            </div>
                        </div>
                        <div className="border-l-0!">Rate</div>
                        <div className="border-l-0!">per</div>
                        <div className="border-l-0!">disc%</div>
                        <div className="border-l-0!">Amount</div>
                        <div className="border-l-0!">Action</div>
                    </div>
                    {
                        stockJournalEntryForm.getValues('stockItem') &&
                        <StockJournalGodownEntry onSave={onSave}
                            stockItem={stockJournalEntryForm.getValues('stockItem')!}
                            godowns={godowns?.data?.data}
                            stockUnits={stockUnits?.data?.data}
                        />
                    }
                </div>
                <Button type="submit" onSubmit={handleSubmit}>Save</Button>
            </Form>
        </>
    )
}

type StockJournalGodownEntryProps = {
    onSave: (values: StockJournalForm) => void
    stockItem: StockItem
    godowns: Godown[]
    stockUnits: StockUnit[]

}
const StockJournalGodownEntry = (props: StockJournalGodownEntryProps) => {
    const { onSave, stockItem, godowns, stockUnits } = props;

    const stockJournalGodownEntryForm = useForm<StockJournalGodownEntryForm>({
        resolver: zodResolver(stockJournalGodownEntrySchema),
        defaultValues: {
            ...stockJournalGodownEntryDefaultValues,
            stockItem: stockItem,
            rate: stockItem?.standardCost!,
            mfgDate: stockJournalGodownEntryDefaultValues.mfgDate ? new Date(stockJournalGodownEntryDefaultValues.mfgDate) : undefined,
            expDate: stockJournalGodownEntryDefaultValues.expDate ? new Date(stockJournalGodownEntryDefaultValues.expDate) : undefined
        },
    })
    const handleSubmit = () => {

    }
    return (
        <>
            <Form {...stockJournalGodownEntryForm}>
                <div className="grid grid-cols-[200px_280px_300px_150px_80px_80px_200px_1fr]  ">

                    <div className="pr-2">
                        <GodownCombobox
                            form={stockJournalGodownEntryForm}
                            godowns={godowns} />
                    </div>

                    <div className="grid grid-rows-2 border-0!">
                        <div className="border-b-0!  ">
                            <FormInputField type='text' form={stockJournalGodownEntryForm}
                                label='Batch No'
                                noLabel
                                gapClass="grid-cols-[1fr] gap-0  "
                                name="batchNo" />
                        </div>
                        <div className="grid grid-cols-2 items-center   px-1">
                            <div className="border-y-0! border-x-0! px-1 ">
                                <DateBox form={stockJournalGodownEntryForm} name="mfgDate" />

                            </div>
                            <div className="border-y-0! border-r-0!   px-1">

                                <DateBox form={stockJournalGodownEntryForm} name="expDate" />
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-rows-1 border-0!">
                        <div className="grid grid-cols-2 items-start">
                            <div className="border-y-0! border-x-0!  ">
                                <QuantityBox
                                    form={stockJournalGodownEntryForm}
                                    stockUnits={stockUnits}
                                    stockItem={stockItem}
                                    name="quantity" />

                            </div>
                            <div className="border-y-0! border-x-0!  ">

                                <FormInputField type="text" form={stockJournalGodownEntryForm}
                                    label=''
                                    gapClass="grid-cols-[0_1fr] gap-0"
                                    name="remarks" />
                            </div>


                        </div>
                    </div>
                    <div>

                        <FormInputField type="number" form={stockJournalGodownEntryForm}
                            label=''
                            gapClass="grid-cols-[0_1fr] gap-0"
                            name="rate" />
                    </div>
                    <div className="text-center">
                        {stockJournalGodownEntryForm.watch("stockItem.stockUnit.code")}
                    </div>
                    <div>

                        <FormInputField type="text" form={stockJournalGodownEntryForm}
                            label=''
                            gapClass="grid-cols-[0_1fr] gap-0"
                            name="amount" />
                    </div>
                    <div>

                        <FormInputField type="text" form={stockJournalGodownEntryForm}
                            label=''
                            gapClass="grid-cols-[0_1fr] gap-0"
                            name="stockUnitId" />
                    </div>
                    <div>

                        <Button type="submit" onSubmit={handleSubmit}>Confirm</Button>
                    </div>
                </div>

            </Form >
        </>
    )
}
type QuantityBoxProps = {
    form: UseFormReturn<StockJournalGodownEntryForm>,
    stockItem: StockItem,
    stockUnits: StockUnit
    name: keyof StockJournalGodownEntryForm
}
type ConversionFactor = {
    tag: 'base' | 'alternate',
    stockUnit: StockUnit,
    isBaseUnit: boolean,
    factor: number
    baseMultiplier: number
}
const QuantityBox = (props: QuantityBoxProps) => {
    const { form, stockItem, name, stockUnits } = props;
    const [boxValue, setBoxValue] = useState<string>("")
    // const alternateUnitValue = stockItem.alternateUnitValue;
    const conversionFactors = useMemo(() => {

        const conversionFactorsTemp: ConversionFactor[] = [];
        // console.log("stockItem:", stockItem?.stockUnit?.unitType!.toLowerCase());
        if (stockItem?.stockUnit && stockItem?.stockUnit?.unitType!.toLowerCase() === 'simple') {
            const BaseUnitData = stockUnits?.find((su: StockUnit) => su.id === stockItem.stockUnitId)
            conversionFactorsTemp.push({ tag: 'base', stockUnit: BaseUnitData!, isBaseUnit: true, factor: 1, baseMultiplier: 1 });
        }
        else {
            const primaryUnit = stockUnits.find((su: StockUnit) => su.id === stockItem.stockUnit?.primaryStockUnitId);
            conversionFactorsTemp.push({ tag: 'base', stockUnit: primaryUnit!, isBaseUnit: true, factor: 1, baseMultiplier: 1 });

            const secondaryUnit = stockUnits.find((su: StockUnit) => su.id === stockItem.stockUnit?.secondaryStockUnitId);
            const secondaryFactor = stockItem.stockUnit?.conversionFactor;
            conversionFactorsTemp.push({ tag: 'base', stockUnit: secondaryUnit!, isBaseUnit: false, factor: secondaryFactor!, baseMultiplier: secondaryFactor! });
        }

        if (stockItem.alternateStockUnitId) {
            const alternateUnit = stockUnits?.filter((su: StockUnit) => su.id !== stockItem.alternateStockUnitId);
            console.log(stockItem.baseUnitValue!, stockItem.alternateUnitValue!)
            const factor = stockItem.baseUnitValue! / stockItem.alternateUnitValue!;
            if (alternateUnit.UnitType === 'simple') {
                conversionFactorsTemp.push({ tag: 'alternate', stockUnit: alternateUnit!, isBaseUnit: false, factor: factor, baseMultiplier: factor });
            }
            else {
                const primaryUnit = stockUnits.find((su: StockUnit) => su.id === stockItem.alternateStockUnit?.primaryStockUnitId);
                const primaryFactor = factor * stockItem?.alternateStockUnit?.conversionFactor!;
                const primaryBaseMultiplier = (stockItem.alternateUnitValue! / stockItem.baseUnitValue!) / stockItem?.alternateStockUnit?.conversionFactor!;
                conversionFactorsTemp.push({ tag: 'alternate', stockUnit: primaryUnit!, isBaseUnit: false, factor: primaryFactor, baseMultiplier: primaryBaseMultiplier });

                const secondaryFactor = factor;
                const secondaryUnit = alternateUnit.find((su: StockUnit) => su.id === stockItem.alternateStockUnit?.secondaryStockUnitId);
                const secondaryBaseMultiplier = stockItem.alternateUnitValue! / stockItem.baseUnitValue!;
                conversionFactorsTemp.push({ tag: 'alternate', stockUnit: secondaryUnit!, isBaseUnit: false, factor: secondaryFactor, baseMultiplier: secondaryBaseMultiplier });
            }

        }
        return conversionFactorsTemp
    }, [stockItem.id, stockUnits])


    const parseQuantityWithUnit = (input: string): { quantity: number, unit: StockUnit | null } => {
        // Extract number and unit parts (e.g., "15 m" -> ["15", "m"])
        const match = input.trim().match(/^(\d+\.?\d*)\s*([a-zA-Z]+)?$/);

        if (!match) {
            return { quantity: 0, unit: null };
        }

        const [, quantityStr, unitStr] = match;
        const quantity = Number.parseFloat(quantityStr);

        return { quantity, unit: unitStr || null };

    };




    const handleBlurOrEnter = () => {
        const { quantity, unit: unitStr } = parseQuantityWithUnit(boxValue);

        if (quantity === 0) {
            form.setValue(name, 0, { shouldValidate: true });
            setBoxValue("");
            return;
        }

        let finalQuantity = quantity;

        // If a unit string was provided, find the matching conversion factor
        if (unitStr) {

            const normalized = unitStr.trim().toLowerCase();
            const regex = new RegExp(normalized, "i");
            const matchedConversion = conversionFactors?.find((cf: ConversionFactor) => {
                const code = cf?.stockUnit?.code ?? "";
                const name = cf?.stockUnit?.name ?? "";
                return regex.test(code) || regex.test(name);
            });
            // matchedConversion && console.log("matchedConversion:", unitStr, matchedConversion);
            if (matchedConversion) {
                // Convert to base unit using the matched conversion factor
                finalQuantity = quantity * matchedConversion.factor;
            }
        }

        form.setValue(name, finalQuantity, { shouldValidate: true });
        setBoxValue(`${finalQuantity.toFixed(basenoOfDecimalPlaces)} ${baseUnitCode}`);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleBlurOrEnter();
        }
    };
    const handleBlur = () => {
        handleBlurOrEnter();
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value;
        setBoxValue(rawValue);
    };
    const baseUnit = useMemo(() => {
        return conversionFactors?.find((cf: ConversionFactor) => (cf.tag === 'base' && cf.isBaseUnit))?.stockUnit || null;
    }, [conversionFactors]);
    const baseUnitCode = baseUnit?.code || "";
    const basenoOfDecimalPlaces = baseUnit?.noOfDecimalPlaces || 0;
    useEffect(() => {
        const value = form.watch(name);
        if (value) {
            setBoxValue(`${value} ${baseUnitCode}`);
        } else {
            setBoxValue("");
        }
    }, [form.watch(name), baseUnitCode]);
    // console.log("conversionFactors:", conversionFactors);
    return (
        <>
            <Input
                type="text"
                value={boxValue}
                onChange={handleChange}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                placeholder="e.g., 15 m, 1500 pkg"
                className="text-right focus:text-left"
            />
            <FormInputField type="hidden" form={form}
                label=''
                gapClass="grid-cols-[0_1fr] gap-0"
                name={name} />
            {/* {alternateUnitValue && <div>({alternateUnitValue})</div>} */}
            {conversionFactors.length > 1 && (
                <div className="text-sm text-gray-500 mt-1 flex flex-col justify-start items-end ">
                    {/* <pre>{JSON.stringify(conversionFactors, null, 2)}</pre> */}
                    {conversionFactors.map((cf, index) => (
                        !cf.isBaseUnit && <span key={index} className="mx-2">
                            <div className="text-xs font-bold">({form.watch(name) * cf.baseMultiplier}  {cf.stockUnit.code})</div>
                        </span>
                    ))}
                </div>
            )}

        </>
    )
}

type DateBoxProps = {
    form: UseFormReturn<StockJournalGodownEntryForm>,

    name: keyof StockJournalGodownEntryForm
}

const DateBox = (props: DateBoxProps) => {
    const { form, name } = props;
    const [displayValue, setDisplayValue] = useState<string | null>("");

    const parseAndFormatDate = (input: string): Date | null => {
        if (!input) return null;

        const now = new Date();
        const parts = input.split(/[./-]/).map(p => p.trim());

        let day = Number(parts[0]);
        let month = parts[1] ? Number(parts[1]) - 1 : now.getMonth(); // month index
        let year =
            parts[2] && parts[2].length === 2
                ? 2000 + Number(parts[2])
                : parts[2]
                    ? Number(parts[2])
                    : now.getFullYear();

        if (isNaN(day) || day < 1 || day > 31) return null;
        if (isNaN(month) || month < 0 || month > 11) return null;
        if (isNaN(year) || year < 1000) return null;

        return new Date(year, month, day);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();

            const parsed = parseAndFormatDate(displayValue!);
            if (parsed) {
                form.setValue(name, parsed, { shouldValidate: true, shouldDirty: true });
                const formatted = parsed.toLocaleDateString("en-GB").replace(/\//g, '-'); // DD/MM/YYYY
                setDisplayValue(formatted);
                const DBFormat = `${parsed.getFullYear()}-${(parsed.getMonth() + 1).toString().padStart(2, '0')}-${parsed.getDate().toString().padStart(2, '0')}`
                form.setValue(name, DBFormat, { shouldValidate: true, shouldDirty: true });
            }
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        if (e.target.value === '') {
            setDisplayValue("");
            form.setValue(name, null, { shouldValidate: true, shouldDirty: true });
            return;
        }
        setDisplayValue(e.target.value);

    };
    return (
        <>
            {/* {form.watch(name)} {displayValue} */}
            <Input
                type="text"
                placeholder="DD.MM or DD.MM.YYYY"
                value={displayValue!}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
            />
            <span className="hidden">

                <FormInputField type='date' form={form}
                    label=''
                    noLabel
                    gapClass="grid-cols-[1fr] gap-0  "
                    name={name} />
            </span>
        </>
    )
}