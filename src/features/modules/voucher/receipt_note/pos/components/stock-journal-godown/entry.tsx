import FormInputField from "@/components/form-input-field"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import type { Godown } from "@/features/modules/godown/data/schema"
import type { StockItem } from "@/features/modules/stock_item/data/schema"
import type { StockUnit } from "@/features/modules/stock_unit/data/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useMemo, useState } from "react"
import { useForm, type UseFormReturn } from "react-hook-form"
import { MdAdd, MdKeyboardReturn } from 'react-icons/md'
import { stockJournalGodownEntryDefaultValues } from "../../../data/data"
import { stockJournalGodownEntrySchema, type StockJournalEntryForm, type StockJournalGodownEntryForm } from "../../../data/schema"


type StockJournalGodownEntryGatewayProps = {
    stockJournalEntryForm: UseFormReturn<StockJournalEntryForm>
    onSave: (data: StockJournalGodownEntryForm[]) => void
    stockItem: StockItem
    godowns: Godown[]
    stockUnits: StockUnit[]

}
type StockJournalGodownEntryProps = {
    stockJournalEntryForm: UseFormReturn<StockJournalEntryForm>
    onSave: (StockJournalGodownEntryForm[]) => void
    stockItem: StockItem
    godowns: Godown[]
    stockUnits: StockUnit[]
    entryOpen: boolean
    setEntryOpen: React.Dispatch<React.SetStateAction<boolean>>
    // handleCompleteGodownEntry: () => void

}
const StockJournalGodownEntryGateway = (props: StockJournalGodownEntryGatewayProps) => {
    const { onSave, stockJournalEntryForm } = props;

    const [entryOpen, setEntryOpen] = useState<boolean>(true);

    const toggleEntry = () => {
        setEntryOpen(!entryOpen);
    }
    const handleCompleteGodownEntry = () => {

        const stockJournalGodownEntries = stockJournalEntryForm.getValues("stockJournalGodownEntries") || [];
        if (stockJournalGodownEntries.length > 0) {
            // Aggregate totals
            const totals = stockJournalGodownEntries.reduce(
                (acc, entry: any) => {
                    const actualQty = Number(entry.actualQuantity) || 0;
                    const billingQty = Number(entry.billingQuantity) || 0;
                    const rate = Number(entry.rate) || 0;
                    const amount = Number(entry.amount) || 0;
                    const discount = Number(entry.discount) || 0;
                    const discountPercentage = Number(entry.discountPercentage) || 0;

                    acc.actualQuantity += actualQty;
                    acc.billingQuantity += billingQty;
                    acc.totalRateWeighted += rate * billingQty; // for weighted average rate
                    acc.totalAmount += amount;
                    acc.discount += discount;
                    acc.discountPercentage += discountPercentage;

                    return acc;
                },
                {
                    actualQuantity: 0,
                    billingQuantity: 0,
                    totalRateWeighted: 0,
                    totalAmount: 0,
                    discount: 0,
                    discountPercentage: 0,
                }
            );

            // Compute weighted average rate (based on billing quantity)
            const avgRate =
                totals.billingQuantity > 0
                    ? totals.totalRateWeighted / totals.billingQuantity
                    : 0;

            // Update form only once
            stockJournalEntryForm.setValue("actualQuantity", totals.actualQuantity, { shouldValidate: true });
            stockJournalEntryForm.setValue("billingQuantity", totals.billingQuantity, { shouldValidate: true });
            stockJournalEntryForm.setValue("rate", avgRate, { shouldValidate: true });
            stockJournalEntryForm.setValue("amount", totals.totalAmount, { shouldValidate: true });
            stockJournalEntryForm.setValue("discount", totals.discount, { shouldValidate: true });
            stockJournalEntryForm.setValue("discountPercentage", totals.discountPercentage, { shouldValidate: true });
        }
        onSave(stockJournalGodownEntries as StockJournalGodownEntryForm[]);
        // props.stockJournalEntryForm.reset();
        // props.stockJournalEntryForm.clearErrors();
        setEntryOpen(false);
    }
    if (!entryOpen) {
        return <div>
            <Button onClick={toggleEntry}><MdAdd /> Godown Entry</Button>
            <Button onClick={handleCompleteGodownEntry} className="ml-4  focus:bg-black focus:text-white">
                <MdKeyboardReturn /> Re-calculate
            </Button>

        </div>
    } else {
        return (
            <>
                <div className="border-inside-all 
                    grid grid-rows-1 grid-cols-[1fr_280px_300px_150px_80px_80px_200px_120px] 
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
                {/* <StockJournalGodownEntry
                    entryOpen={entryOpen}
                    setEntryOpen={setEntryOpen}
                    stockItem={stockItem}
                    godowns={godowns}
                    stockUnits={stockUnits}

                    stockJournalEntryForm={props.stockJournalEntryForm}
                /> */}
            </>
        )
    }
}

const StockJournalGodownEntry = (props: StockJournalGodownEntryProps) => {
    const { setEntryOpen, stockItem, stockUnits, stockJournalEntryForm } = props;

    const stockJournalGodownEntryForm = useForm<StockJournalGodownEntryForm>({
        resolver: zodResolver(stockJournalGodownEntrySchema),
        defaultValues: {
            ...stockJournalGodownEntryDefaultValues,
            stockItem: stockItem,
            rate: stockItem?.standardCost!,
            mfgDate: stockJournalGodownEntryDefaultValues.mfgDate ? new Date(stockJournalGodownEntryDefaultValues.mfgDate) : undefined,
            expDate: stockJournalGodownEntryDefaultValues.expDate ? new Date(stockJournalGodownEntryDefaultValues.expDate) : undefined,
            rateUnit: stockItem?.stockUnit!,
            // rateUnitRatio: stockJournalEntryForm.getValues("rateUnitRatio"),

        },
    })
    // const actualQuantity = stockJournalGodownEntryForm.watch("actualQuantity");
    const rateUnitRatio = stockJournalEntryForm.watch("rateUnitRatio") ?? 1;
    // const actualQuantity = stockJournalGodownEntryForm.watch("actualQuantity") ?? 1;
    // stockJournalGodownEntryForm.setValue("billingQuantity", actualQuantity * rateUnitRatio, { shouldValidate: true });
    const billingQuantity = stockJournalGodownEntryForm.watch("billingQuantity") ?? 1;
    const rate = stockJournalGodownEntryForm.watch("rate") ?? 1;
    const discountPercentage = stockJournalGodownEntryForm.watch("discountPercentage") ?? 0;
    stockJournalGodownEntryForm.setValue("discount", (Number(rateUnitRatio ?? 0) * Number(billingQuantity ?? 0) * Number(rate ?? 0)) * (Number(discountPercentage ?? 0) / 100), { shouldValidate: true });
    // const rateUnit = stockJournalEntryForm.watch("rateUnit") ?? null;


    stockJournalGodownEntryForm.setValue("amount", (
        (Number(rateUnitRatio ?? 0) * Number(billingQuantity ?? 0) * Number(rate ?? 0))
        - Number(stockJournalGodownEntryForm.getValues("discount"))
    ), { shouldValidate: true });
    // const amount = stockJournalEntryForm.watch("amount") ?? 1;

    const handleSubmit = () => {
        //  alert("Adding Item to Stock Journal Entry")
        const stockJournalGodownEntries = stockJournalEntryForm.getValues("stockJournalGodownEntries") || [];
        stockJournalEntryForm.setValue("stockJournalGodownEntries",
            [...stockJournalGodownEntries, ...stockJournalGodownEntryForm.getValues()! ? [stockJournalGodownEntryForm.getValues()!] : []]);


        // handleCompleteGodownEntry()
        setEntryOpen(false);

    }
    // stockJournalGodownEntryForm.setValue('amount', Number(rateUnitRatio ?? 0) * Number(billingQuantity ?? 0) *
    //     Number(rate ?? 0), { shouldValidate: true });


    return (
        <>
            <Form {...stockJournalGodownEntryForm}>
                <div className="grid grid-cols-[1fr_280px_300px_150px_80px_80px_200px_120px]  ">

                    <div className="pr-2">
                        {/* <GodownCombobox
                            form={stockJournalGodownEntryForm}
                            godowns={godowns} /> */}
                    </div>

                    <div className="grid grid-rows-3    border-0!">
                        <div className="border-b-0! w-full  ">
                            <FormInputField type='text' form={stockJournalGodownEntryForm}
                                label='Batch No'
                                noLabel
                                gapClass="grid-cols-[1fr] gap-0  "
                                name="batchNo" />
                        </div>
                        <div className="flex flex-col justify-start">

                            <div className="grid grid-cols-2 items-center justify-start   px-1">
                                <div className="border-y-0! border-x-0! px-1 ">
                                    <DateBox form={stockJournalGodownEntryForm} name="mfgDate" />

                                </div>
                                <div className="border-y-0! border-r-0!   px-1">

                                    <DateBox form={stockJournalGodownEntryForm} name="expDate" />
                                </div>
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
                                    name="actualQuantity" />

                            </div>
                            <div className="border-y-0! border-x-0!  ">

                                <BillingQuantityBox
                                    form={stockJournalGodownEntryForm}
                                    stockUnits={stockUnits}
                                    stockItem={stockItem}
                                    name="billingQuantity" />
                            </div>


                        </div>
                    </div>
                    <div>

                        <RateBox form={stockJournalGodownEntryForm}
                            stockJournalEntryForm={stockJournalEntryForm}
                            stockUnits={stockUnits}
                            stockItem={stockItem}
                            name="rate" />

                    </div>
                    <div className="text-center">
                        {stockJournalGodownEntryForm.watch("rateUnit.code")}
                    </div>
                    <div>

                        <FormInputField type="number" form={stockJournalGodownEntryForm}
                            label=''
                            disabled
                            noLabel
                            gapClass="grid-cols-[0_1fr] gap-0"
                            name="discountPercentage" />
                    </div>
                    <div>
                        {/* {stockJournalEntryForm.watch("amount")?.toFixed(2) ?? '-----'} */}
                        <Input type="number" {...stockJournalGodownEntryForm.register("amount")}

                            name="amount"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleSubmit();
                                }
                                return;
                            }}
                            onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                                e.preventDefault();
                                // handleSubmit();
                            }}

                        />
                    </div>
                    <div className="flex flex-row gap-4 px-4">

                        <Button type="button" className="h-6 focus:bg-black focus:text-white"
                            onClick={handleSubmit}>
                            <MdKeyboardReturn />
                        </Button>
                    </div>
                </div>

            </Form >
        </>
    )
}
export default StockJournalGodownEntryGateway









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
                const formatted = parsed.toLocaleDateString("en-GB").replace(/\//g, '-'); // DD-MM-YYYY
                setDisplayValue(formatted);
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
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        e.preventDefault();

        const parsed = parseAndFormatDate(displayValue!);
        if (parsed) {
            form.setValue(name, parsed, { shouldValidate: true, shouldDirty: true });
            const formatted = parsed.toLocaleDateString("en-GB").replace(/\//g, '-'); // DD-MM-YYYY
            setDisplayValue(formatted);
        }
    };
    return (
        <>
            {/* {form.watch(name)} {displayValue} */}
            <Input
                type="text"
                placeholder="__-__-____"
                value={displayValue!}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                onBlur={handleBlur}
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





type RateBoxProps = {
    form: UseFormReturn<StockJournalGodownEntryForm>,
    stockJournalEntryForm: UseFormReturn<StockJournalEntryForm>,
    stockItem: StockItem,
    stockUnits: StockUnit
    name: keyof StockJournalGodownEntryForm
}
const RateBox = (props: RateBoxProps) => {
    const { form, stockItem, name, stockUnits, stockJournalEntryForm } = props;
    const [boxValue, setBoxValue] = useState<string>("")
    // const alternateUnitValue = stockItem.alternateUnitValue;
    const conversionFactors = useMemo(() => {

        const conversionFactorsTemp: ConversionFactor[] = [];

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
            const alternateUnit = stockUnits?.find((su: StockUnit) => su.id === stockItem.alternateStockUnitId);

            const factor = stockItem.baseUnitValue! / stockItem.alternateUnitValue!;
            if (alternateUnit?.unitType === 'simple') {
                conversionFactorsTemp.push({ tag: 'alternate', stockUnit: alternateUnit!, isBaseUnit: false, factor: factor, baseMultiplier: factor });
            }
            else {
                const primaryUnit = stockUnits.find((su: StockUnit) => su.id === stockItem.alternateStockUnit?.primaryStockUnitId);
                const primaryFactor = factor * stockItem?.alternateStockUnit?.conversionFactor!;
                const primaryBaseMultiplier = (stockItem.alternateUnitValue! / stockItem.baseUnitValue!) / stockItem?.alternateStockUnit?.conversionFactor!;
                conversionFactorsTemp.push({ tag: 'alternate', stockUnit: primaryUnit!, isBaseUnit: false, factor: primaryFactor, baseMultiplier: primaryBaseMultiplier });

                const secondaryFactor = factor;
                const secondaryUnit = stockUnits.find((su: StockUnit) => su.id === stockItem.alternateStockUnit?.secondaryStockUnitId);
                const secondaryBaseMultiplier = stockItem.alternateUnitValue! / stockItem.baseUnitValue!;
                conversionFactorsTemp.push({ tag: 'alternate', stockUnit: secondaryUnit!, isBaseUnit: false, factor: secondaryFactor, baseMultiplier: secondaryBaseMultiplier });
            }

        }
        return conversionFactorsTemp
    }, [stockItem.id, stockUnits])


    const parseRateWithPerUnit = (input: string): { rate: number, unit: StockUnit | null } => {
        // Extract number and unit parts (e.g., "15 m" -> ["15", "m"])
        const match = input.trim().match(/^\s*(\d+(?:\.\d+)?)?\s*(?:\/|\bper\b)?\s*([\w\- ]+)?\s*$/i);

        if (!match) {
            return { rate: 0, unit: null };
        }

        const [, rateStr, unitStr] = match;
        const rate = Number.parseFloat(rateStr);

        return { rate, unit: unitStr || null };

    };




    const handleBlurOrEnter = () => {
        const { rate, unit: unitStr } = parseRateWithPerUnit(boxValue);

        if (rate === 0) {
            form.setValue(name, 0, { shouldValidate: true });
            form.setValue('rateUnit', null);
            setBoxValue("");
            return;
        }

        let finalRate = rate;

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
            const baseRateUnit = conversionFactors?.find((cf: ConversionFactor) => cf.tag === 'base' && cf.isBaseUnit);

            if (matchedConversion) {
                conversionFactors?.map((cf: ConversionFactor) => {

                    if (cf.stockUnit.id === baseRateUnit?.stockUnit.id) {
                        cf.rateUnitRatio = 1
                    }
                    else if (cf.stockUnit.id === matchedConversion.stockUnit.id) {
                        cf.rateUnitRatio = matchedConversion.baseMultiplier / (baseRateUnit ? baseRateUnit.factor : 1)
                    }
                    else {
                        cf.stockUnit.id === 'base' && (
                            cf.rateUnitRatio = cf.baseMultiplier * (baseRateUnit ? baseRateUnit.factor : 1) / (matchedConversion.baseMultiplier)
                        );
                        cf.stockUnit.id !== 'base' && (
                            cf.rateUnitRatio = cf.baseMultiplier * (baseRateUnit ? baseRateUnit.factor : 1) / (matchedConversion.factor)
                        );
                    }

                });

            }

            form.setValue('rateUnit', matchedConversion?.stockUnit! || stockItem?.stockUnit!);
            const baseRateUnitRatio = conversionFactors?.find((cf: ConversionFactor) => cf.tag === 'base' && cf.isBaseUnit)?.rateUnitRatio || 1;
            stockJournalEntryForm.setValue('rateUnitRatio', baseRateUnitRatio || null);
        }

        form.setValue(name, finalRate, { shouldValidate: true });
        setBoxValue(!isNaN(finalRate) ? finalRate.toFixed(2) : '1.00');
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
        setBoxValue(rawValue ?? '');
    };
    const baseUnit = useMemo(() => {
        return conversionFactors?.find((cf: ConversionFactor) => (cf.tag === 'base' && cf.isBaseUnit))?.stockUnit || null;
    }, [conversionFactors]);
    const baseUnitCode = baseUnit?.code || "";
    // const basenoOfDecimalPlaces = baseUnit?.noOfDecimalPlaces || 0;
    useEffect(() => {
        const value = form.watch(name);
        if (value) {
            setBoxValue(value);
        } else {
            setBoxValue("");
        }
    }, [form.watch(name), baseUnitCode]);

    return (
        <>
            <Input
                type="text"
                value={boxValue}
                onChange={handleChange}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                placeholder="- - -/MTS"
                className="text-right focus:text-left"
            />
            <div className="hidden">

                <FormInputField type="hidden" form={form}
                    label=''
                    gapClass="grid-cols-[0_1fr] gap-0"
                    name={name} />
                {/* {alternateUnitValue && <div>({alternateUnitValue})</div>} */}
                {conversionFactors.length > 1 && (
                    <div className="text-sm text-gray-500 mt-1 flex flex-col justify-start items-end ">

                        {conversionFactors.map((cf, index) => (
                            <span key={index} className="mx-2">
                                <div className="text-xs font-bold">({form.watch(name) * cf.rateUnitRatio!}  {cf.stockUnit.code})</div>
                            </span>
                        ))}
                    </div>
                )}
            </div>

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
    rateUnitRatio?: number
}
const QuantityBox = (props: QuantityBoxProps) => {
    const { form, stockItem, name, stockUnits } = props;
    const [boxValue, setBoxValue] = useState<string>("")
    // const alternateUnitValue = stockItem.alternateUnitValue;
    const conversionFactors = useMemo(() => {

        const conversionFactorsTemp: ConversionFactor[] = [];

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
            const alternateUnit = stockUnits?.find((su: StockUnit) => su.id === stockItem.alternateStockUnitId);

            const factor = stockItem.baseUnitValue! / stockItem.alternateUnitValue!;
            if (alternateUnit?.unitType === 'simple') {
                conversionFactorsTemp.push({ tag: 'alternate', stockUnit: alternateUnit!, isBaseUnit: false, factor: factor, baseMultiplier: factor });
            }
            else {
                const primaryUnit = stockUnits.find((su: StockUnit) => su.id === stockItem.alternateStockUnit?.primaryStockUnitId);
                const primaryFactor = factor * stockItem?.alternateStockUnit?.conversionFactor!;
                const primaryBaseMultiplier = (stockItem.alternateUnitValue! / stockItem.baseUnitValue!) / stockItem?.alternateStockUnit?.conversionFactor!;
                conversionFactorsTemp.push({ tag: 'alternate', stockUnit: primaryUnit!, isBaseUnit: false, factor: primaryFactor, baseMultiplier: primaryBaseMultiplier });

                const secondaryFactor = factor;
                const secondaryUnit = stockUnits.find((su: StockUnit) => su.id === stockItem.alternateStockUnit?.secondaryStockUnitId);
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
            form.setValue('billingQuantity', 0, { shouldValidate: true });
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

            if (matchedConversion) {
                // Convert to base unit using the matched conversion factor
                finalQuantity = quantity * matchedConversion.factor;
            }
        }

        form.setValue(name, finalQuantity, { shouldValidate: true });
        form.setValue('billingQuantity', finalQuantity, { shouldValidate: true });
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

                    {conversionFactors.map((cf, index) => (
                        !cf.isBaseUnit && <span key={index} className="mx-2">
                            <div className="text-xs font-bold">({(form.watch(name) * cf.baseMultiplier).toFixed(2)}  {cf.stockUnit.code})</div>
                        </span>
                    ))}
                </div>
            )}

        </>
    )
}

const BillingQuantityBox = (props: QuantityBoxProps) => {
    const { form, stockItem, name, stockUnits } = props;
    const [boxValue, setBoxValue] = useState<string>("")
    // const alternateUnitValue = stockItem.alternateUnitValue;
    const conversionFactors = useMemo(() => {

        const conversionFactorsTemp: ConversionFactor[] = [];

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
            const alternateUnit = stockUnits?.find((su: StockUnit) => su.id === stockItem.alternateStockUnitId);

            const factor = stockItem.baseUnitValue! / stockItem.alternateUnitValue!;
            if (alternateUnit?.unitType === 'simple') {
                conversionFactorsTemp.push({ tag: 'alternate', stockUnit: alternateUnit!, isBaseUnit: false, factor: factor, baseMultiplier: factor });
            }
            else {
                const primaryUnit = stockUnits.find((su: StockUnit) => su.id === stockItem.alternateStockUnit?.primaryStockUnitId);
                const primaryFactor = factor * stockItem?.alternateStockUnit?.conversionFactor!;
                const primaryBaseMultiplier = (stockItem.alternateUnitValue! / stockItem.baseUnitValue!) / stockItem?.alternateStockUnit?.conversionFactor!;
                conversionFactorsTemp.push({ tag: 'alternate', stockUnit: primaryUnit!, isBaseUnit: false, factor: primaryFactor, baseMultiplier: primaryBaseMultiplier });

                const secondaryFactor = factor;
                const secondaryUnit = stockUnits.find((su: StockUnit) => su.id === stockItem.alternateStockUnit?.secondaryStockUnitId);
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

                    {conversionFactors.map((cf, index) => (
                        !cf.isBaseUnit && <span key={index} className="mx-2">
                            <div className="text-xs font-bold">({(form.watch(name) * cf.baseMultiplier).toFixed(2)}  {cf.stockUnit.code})</div>
                        </span>
                    ))}
                </div>
            )}

        </>
    )
}
