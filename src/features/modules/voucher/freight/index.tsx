
import { Main } from '@/layouts/components/main'







import { cn } from '@/lib/utils'

import type { FreightForm, FreightListSchema, FreightSchema } from './data/schema'
import { date_format } from '@/utils/removeEmptyStrings'
import { Form } from '@/components/ui/form'
import { formSchema } from './data/schema';

import { useForm, type Resolver, type UseFormReturn } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import FormInputField from '@/components/form-input-field'
import { Button } from '@/components/ui/button'
import { useFreightMutation } from './data/queryOptions'

import { useEffect, useMemo, useState } from 'react'
import type { StockUnit, StockUnitList } from '../../stock_unit/data/schema'

import { Input } from '@/components/ui/input'
import { lowerCase } from 'lodash';

import VoucherDispatchDetail from './components/voucher-dispatch-detail'
import { voucherDispatchDefaultValues } from '../delivery_note/data/data';
import PrintFreightDialog from './components/print-freight-dialog'



interface FreightProps {
    data: FreightListSchema
    stockUnits: StockUnitList
}

export default function Freight({ data: freightListSchema, stockUnits }: FreightProps & { stockUnits: StockUnitList }) {
    return (

        <Main className='min-h-full! min-w-full '>
            <div className='mb-2 flex flex-wrap items-center justify-between space-y-2'>
                <div>
                    <h2 className='text-2xl font-bold tracking-tight'>Freight</h2>
                    <p className='text-muted-foreground'>
                        Check freight summary.
                    </p>
                </div>
                {/* <PrimaryButtons /> */}
            </div>
            <div className='-mx-4 min-h-full flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12'>
                {freightListSchema.length === 0 ? (
                    <div className='text-center text-gray-500'>No data available.</div>
                ) : (
                        <RecordView
                            data={freightListSchema} stockUnits={stockUnits} />
                )}
            </div>
        </Main>


    )
}

const RecordView = ({ data, stockUnits }: FreightProps) => {

    return <div className='w-full min-h-full  grid grid-rows-[auto_1fr]'>
        <RecordHeader />
        <div className='border-2 min-h-full'>
            {data.map((item, index) => (
                <div key={index} className={cn
                    ('w-full text-center ', index % 2 === 0 ? 'bg-white' : 'bg-gray-100')
                }>
                    <DeliveryNoteRecord data={item} stockUnits={stockUnits} rowIndex={index + 1} />

                </div>
            ))}
        </div>
        <RecordFooter data={data} stockUnits={stockUnits} />
    </div>
}
type DeliveryNoteRecordProps = {
    data: FreightSchema
    stockUnits: StockUnitList
    rowIndex?: number
}

const DeliveryNoteRecord = ({ data, stockUnits, rowIndex }: DeliveryNoteRecordProps) => {
    const { mutate: saveFreight, isPending } = useFreightMutation()
    const [freightData, setFreightData] = useState<FreightSchema | null>(null);
    const [printDialogOpen, setPrintDialogOpen] = useState<boolean>(false);


    const form = useForm<FreightForm>({
        resolver: zodResolver(formSchema) as Resolver<FreightForm>,
        defaultValues: {
            ...data,
            deliveryNoteId: data.id,
            distance: data.voucherDispatchDetail?.distance || 0,
            rate: data.voucherDispatchDetail?.rate || 0,
            freightCharges: data.voucherDispatchDetail?.freightCharges || 0,
            totalFare: data.voucherDispatchDetail?.totalFare || 0,
            distanceUnitId: data.voucherDispatchDetail?.distanceUnitId || 2,
            rateUnitId: data.voucherDispatchDetail?.rateUnitId || 2,
            isEdit: false
        },
    })
    const distance = form.watch('distance')
    const rate = form.watch('rate')
    const totalFare = form.watch('totalFare')
    // Automatically calculate totalFare when distance or rate changes


    const onSubmit = (values: FreightForm) => {

        // form.reset()
        saveFreight(values,
            {
                onSuccess: (data) => {
                    setFreightData?.(data?.data as FreightSchema ?? null)
                    setPrintDialogOpen(true);

                    // Navigate({ to: FreightRoute.to, })
                },
            }
        )

    }
    useEffect(() => {
        const totalFare = distance * rate

        form.setValue('totalFare', totalFare)
        form.setValue('freightCharges', totalFare)
    }, [distance, rate])
    return (
        <Form {...form}>


            <form id='user-form'
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-4 p-0.5'>
                <div className='grid grid-cols-[60px_120px_100px_repeat(9,1fr)]  text-left pl-2 font-semibold'>
                    <div className='text-center'>{rowIndex}</div>
                    <div>{date_format(data?.voucherDate)}</div>
                    <div>{data.voucherNo}</div>
                    <div>{data.party?.name}</div>
                    <div>{data.voucherDispatchDetail?.billOfLadingNo}</div>
                    <div>{data.voucherDispatchDetail?.destination}</div>
                    <div>{data.voucherDispatchDetail?.carrierName}</div>
                    <div>{data.voucherDispatchDetail?.motorVehicleNo}</div>
                    <div className='px-2'><DistanceBox form={form} name='distance' stockUnits={stockUnits} /></div>
                    <div className='px-2'><RateBox form={form} name='rate' stockUnits={stockUnits} /></div>
                    <div className='text-right pr-4  border-x-2'>
                        {isNaN(totalFare) ? "-" : (totalFare > 0 ? Number(totalFare).toFixed(2) : "-")}
                        {/* <FormInputField type='text' form={form} name='totalFare' noLabel /> */}
                    </div>
                    <div className='flex justify-start pl-2 gap-2'>
                        <VoucherDispatchDetail voucherDispatchDefaultValues={data.voucherDispatchDetail || voucherDispatchDefaultValues} />
                        {(totalFare > 0) && (
                            <>
                                {printDialogOpen && freightData && <PrintFreightDialog open={printDialogOpen} onOpenChange={setPrintDialogOpen} freightData={freightData} />}

                                <Button type='submit' className='focus:bg-slate-950 focus:text-zinc-50' variant='outline' size='sm' disabled={isPending}>
                                    <span className='sr-only'>Save</span>
                                    Freight Bill
                                </Button>
                            </>
                        )}
                    </div>



                </div>
            </form>
        </Form>
    )
}


const RecordHeader = () => {
    return (
        <div className='  border-amber-950! bg-gray-100  text-center font-bold  '>
            <div className='grid grid-cols-[60px_120px_100px_repeat(9,1fr)] text-accent-foreground border-2 text-left pl-2 font-stretch-ultra-expanded  h-full   items-center'>
                <div className='text-center'>Sl. No.</div>
                <div>Date</div>
                <div>Dl. No.</div>
                <div>Distributor</div>
                <div>Dispatch No.</div>
                <div>Destination</div>
                <div>Carrier Name</div>
                <div>Vehicle No.</div>
                <div className='text-right pr-4'>Distance(Km)</div>
                <div className='text-right pr-4'>Rate(Per Km)</div>
                <div className='text-right pr-4 border-x-2'>Total Fare</div>
                <div className='flex justify-center'>Bill</div>
            </div>

        </div>
    )
}


const RecordFooter = ({ data, stockUnits }: { data: FreightListSchema, stockUnits: StockUnitList }) => {
    const [total, setTotal] = useState({ distance: 0, rate: 0, totalFare: 0 });
    const [distanceUnit, setDistanceUnit] = useState<StockUnit | null>(null);
    const [rateUnit, setRateUnit] = useState<StockUnit | null>(null);
    console.log(rateUnit)
    useEffect(() => {
        setDistanceUnit(stockUnits.find((su) => su.id === data[0]?.voucherDispatchDetail?.distanceUnitId) || null);
        setRateUnit(stockUnits.find((su) => su.id === data[0]?.voucherDispatchDetail?.rateUnitId) || null);
    }, [data, stockUnits]);
    useEffect(() => {
        const totalDistance = data.reduce((sum, item) => sum + (Number(item.voucherDispatchDetail?.distance) || 0), 0);
        const totalRate = data.reduce((sum, item) => sum + (Number(item.voucherDispatchDetail?.rate) || 0), 0);
        const totalFare = data.reduce((sum, item) => sum + (Number(item.voucherDispatchDetail?.totalFare) || 0), 0);
        setTotal(prev => { return { ...prev, distance: totalDistance, rate: totalRate, totalFare: totalFare } });
    }, [data]);
    return (
        <div className=' border-amber-950! bg-gray-100  text-center font-bold  '>
            <div className=' grid grid-cols-[60px_120px_100px_repeat(9,1fr)] text-accent-foreground border-2 text-right   items-center pr-2 h-full justify-between'>
                <div className='col-span-4 text-left pl-4'>Total Records: {data.length}</div>

                <div className='col-span-3'></div>
                <div>Total:  </div>
                <div className='pl-6 text-left'>{isNaN(total.distance) ? "-" :
                    (total.distance > 0 ? Number(total.distance).toFixed(2) + " " + (distanceUnit?.code ?? "") : "-")}</div>
                <div>-</div>
                <div className='pr-2'>{isNaN(total.totalFare) ? "-" : (total.totalFare > 0 ? Number(total.totalFare).toFixed(2) : "-")}</div>
                <div></div>

            </div>

        </div>
    )
}
type Boxprops = {
    form: UseFormReturn<FreightForm>
    name: keyof FreightForm
    stockUnits: StockUnitList

}

const DistanceBox = (props: Boxprops) => {
    const { form, name, stockUnits } = props;
    const distanceUnits = useMemo(() => {
        return stockUnits.filter((su) => su.unitType === 'simple' && lowerCase(su.quantityType!) === 'length');
    }, [stockUnits]);
    const distanceUnitId = form.watch('distanceUnitId');
    const distanceUnit = useMemo(() => {
        return distanceUnits.find((su) => su.id === distanceUnitId);
    }, [distanceUnitId, distanceUnits]);

    const [boxValue, setBoxValue] = useState<string>("")



    // const baseUnit = useMemo(() => {
    //     return conversionFactors?.find((cf: ConversionFactor) => (cf.tag === 'base' && cf.isBaseUnit))?.stockUnit || null;
    // }, [conversionFactors]);
    const baseUnitCode = distanceUnit?.code || '';
    const basenoOfDecimalPlaces = distanceUnit?.noOfDecimalPlaces;


    const parseQuantityWithUnit = (input: string): { quantity: number, unit: StockUnit | null } => {
        // Extract number and unit parts (e.g., "15 m" -> ["15", "m"])
        const match = input.trim().match(/^(\d+\.?\d*)\s*([a-zA-Z]+)?$/);

        if (!match) {
            return { quantity: 0, unit: null };
        }
        const [, quantityStr, unitStr] = match;

        const quantity = Number.parseFloat(quantityStr);

        return { quantity, unit: unitStr ?? distanceUnit?.code };

    };




    const handleBlurOrEnter = () => {
        const { quantity } = parseQuantityWithUnit(boxValue);

        if (quantity === 0) {
            form.setValue(name, 0, { shouldValidate: true });
            setBoxValue("");
            return;
        }

        let finalQuantity = quantity;

        // If a unit string was provided, find the matching conversion factor


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

    const handleOnFocus = () => {
        const value = Number(form.getValues(name))?.toFixed(basenoOfDecimalPlaces)
        setBoxValue(Number(value) > 0 ? value?.toString() : '');
    }


    useEffect(() => {
        const value = form.watch(name);


        if (value) {
            const boxValueStr = `${Number(value).toFixed(basenoOfDecimalPlaces)} ${baseUnitCode}`
            setBoxValue(boxValueStr);
        } else {
            setBoxValue("");
        }
    }, [form.watch(name), baseUnitCode]);
    return (
        <>
            <Input
                type="text"

                value={boxValue}
                onFocus={handleOnFocus}
                onChange={handleChange}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                placeholder="e.g., 15 km"
                className="value-box flex justify-end items-end"
            />
            <FormInputField type="hidden" form={form}
                label=''
                gapClass="grid-cols-[0_1fr] gap-0"
                name={name} />



        </>
    )

}


const RateBox = (props: Boxprops) => {
    const { form, name, stockUnits } = props;
    const rateUnits = useMemo(() => {
        return stockUnits.filter((su) => su.unitType === 'simple' && lowerCase(su.quantityType!) === 'length');
    }, [stockUnits]);
    const rateUnitId = form.watch('rateUnitId');
    const rateUnit = useMemo(() => {
        return rateUnits.find((su) => su.id === rateUnitId);
    }, [rateUnitId, rateUnits]);

    const [boxValue, setBoxValue] = useState<string>("")



    // const baseUnit = useMemo(() => {
    //     return conversionFactors?.find((cf: ConversionFactor) => (cf.tag === 'base' && cf.isBaseUnit))?.stockUnit || null;
    // }, [conversionFactors]);
    const baseUnitCode = rateUnit?.code || '';
    const basenoOfDecimalPlaces = 2;


    const parseQuantityWithUnit = (input: string): { quantity: number, unit: StockUnit | null } => {
        // Extract number and unit parts (e.g., "15 m" -> ["15", "m"])
        const match = input.trim().match(/^(\d+\.?\d*)\s*([a-zA-Z]+)?$/);

        if (!match) {
            return { quantity: 0, unit: null };
        }
        const [, quantityStr, unitStr] = match;

        const quantity = Number.parseFloat(quantityStr);

        return { quantity, unit: unitStr ?? rateUnit?.code };

    };




    const handleBlurOrEnter = () => {
        const { quantity } = parseQuantityWithUnit(boxValue);

        if (quantity === 0) {
            form.setValue(name, 0, { shouldValidate: true });
            setBoxValue("");
            return;
        }

        let finalQuantity = quantity;

        // If a unit string was provided, find the matching conversion factor


        form.setValue(name, finalQuantity, { shouldValidate: true });
        setBoxValue(`${finalQuantity.toFixed(basenoOfDecimalPlaces)}/${baseUnitCode}`);


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

    const handleOnFocus = () => {
        const value = Number(form.getValues(name))?.toFixed(basenoOfDecimalPlaces)
        setBoxValue(Number(value) > 0 ? value?.toString() : '');
    }


    useEffect(() => {
        const value = form.watch(name);


        if (value) {
            const boxValueStr = `${Number(value).toFixed(basenoOfDecimalPlaces)}/${baseUnitCode}`
            setBoxValue(boxValueStr);
        } else {
            setBoxValue("");
        }
    }, [form.watch(name), baseUnitCode]);
    return (
        <>
            <Input
                type="text"  

                value={boxValue}
                onFocus={handleOnFocus}
                onChange={handleChange}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                placeholder="e.g., 10/km"
                className="value-box flex justify-end items-end"
            />
            <FormInputField type="hidden" form={form}
                label=''
                gapClass="grid-cols-[0_1fr] gap-0"
                name={name} />



        </>
    )

}