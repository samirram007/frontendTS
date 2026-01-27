
import { Main } from '@/layouts/components/main'







import { cn } from '@/lib/utils'

import type { FreightForm, FreightListSchema, FreightSchema } from './data/schema'
import { date_format } from '@/utils/removeEmptyStrings'
import { Form } from '@/components/ui/form'
import { formSchema } from './data/schema';

import { useForm, type Resolver, type UseFormReturn } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { useFreightMutation } from './data/queryOptions'

import { useEffect, useState } from 'react'
import type { StockUnit, StockUnitList } from '../../stock_unit/data/schema'


import { lowerCase } from 'lodash';

import VoucherDispatchDetail01 from './components/voucher-dispatch-detail01'
import { voucherDispatchDefaultValues } from '../delivery_note/data/data';
import PrintFreightDialog from './components/print-freight-dialog'
import type { DeliveryPlaceList } from '../../delivery_place/data/schema'
import type { DeliveryVehicleList } from '../../delivery_vehicle/data/schema'
import type { TransporterList } from '../../transporter/data/schema'
import { useFreight } from './contexts/freight-context'
import VoucherDispatchDetail02 from './components/voucher-dispatch-detail02'




interface FreightProps {
    data: FreightListSchema
    stockUnits: StockUnitList,
    deliveryPlaces?: DeliveryPlaceList,
    deliveryVehicles?: DeliveryVehicleList,
    transporter?: TransporterList

}

export default function Freight({ data: freightListSchema, stockUnits }: FreightProps) {
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

const DeliveryNoteRecord = ({ data, rowIndex }: DeliveryNoteRecordProps) => {

    const { config } = useFreight();

    const form = useForm<FreightForm>({
        resolver: zodResolver(formSchema) as Resolver<FreightForm>,
        defaultValues: {
            deliveryNoteId: data.id,
            transporter: data.voucherDispatchDetail?.carrierName || "",
            source: data.voucherDispatchDetail?.source || data.stockJournal?.stockJournalEntries?.[0]?.stockJournalGodownEntries?.[0]?.godown?.name || "",
            destination: data.voucherDispatchDetail?.destination || "",
            distance: data.voucherDispatchDetail?.distance || 0,
            distanceUnitId: data.voucherDispatchDetail?.distanceUnitId || 2,
            weight: data.voucherDispatchDetail?.weight || data?.stockJournal?.
                stockJournalEntries?.reduce((sum, entry: any) => sum + (Number(entry.actualQuantity) || 0), 0) || 0,
            weightUnitId: data.voucherDispatchDetail?.weightUnitId || 16,
            volume: data.voucherDispatchDetail?.volume || 0,
            volumeUnitId: data.voucherDispatchDetail?.volumeUnitId || 10,
            freightBasis: data.voucherDispatchDetail?.freightBasis || "weight",
            rate: data.voucherDispatchDetail?.rate || 0,
            rateUnitId: data.voucherDispatchDetail?.rateUnitId || 16,
            freightCharges: data.voucherDispatchDetail?.freightCharges || 0,
            totalFare: data.voucherDispatchDetail?.totalFare || 0,
            dispatchSourceId: data.stockJournal?.stockJournalEntries?.[0]?.stockJournalGodownEntries?.[0]?.godownId || null,
            isEdit: false
        },
    })

    const distance = form.watch('distance')
    const volume = form.watch('volume')
    const weight = form.watch('weight')
    const freightBasis = form.watch('freightBasis')
    const rate = form.watch('rate')
    //const totalFare = form.watch('totalFare')
    // Automatically calculate totalFare when distance or rate changes



    useEffect(() => {

        if (lowerCase(freightBasis!) === 'distance') {
            const totalFare = distance! * rate

            form.setValue('totalFare', totalFare)
            form.setValue('freightCharges', totalFare)
        } else if (lowerCase(freightBasis!) === 'weight') {
            // const actualQuantity = data?.stockJournal?.
            //     stockJournalEntries?.reduce((sum, entry: any) => sum + (Number(entry.actualQuantity) || 0), 0) || 0;

            // form.setValue('weight', actualQuantity)
            const totalFare = weight! * rate

            form.setValue('totalFare', totalFare)
            form.setValue('freightCharges', totalFare)
        } else if (lowerCase(freightBasis!) === 'volume') {
            const totalFare = volume! * rate
            form.setValue('totalFare', totalFare)
            form.setValue('freightCharges', totalFare)
        }
    }, [distance, weight, volume, freightBasis, rate])


    // console.log("data: ", form.getValues())
    return (
        <Form {...form}>


            {/* <form id='user-form'
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-4 p-0.5'> */}
            <div className='grid grid-cols-[60px_120px_100px_repeat(10,1fr)]  text-left pl-2 font-semibold'>
                    <div className='text-center'>{rowIndex}</div>
                    <div>{date_format(data?.voucherDate)}</div>
                    <div>{data.voucherNo}</div>
                    <div>{data.party?.name}</div>
                    <div>{data.voucherDispatchDetail?.billOfLadingNo}</div>
                <div>{data.voucherDispatchDetail?.source}</div>
                    <div>{data.voucherDispatchDetail?.destination}</div>
                    <div>{data.voucherDispatchDetail?.carrierName}</div>
                    <div>{data.voucherDispatchDetail?.motorVehicleNo}</div>
                <div className='px-4 text-right'>

                    {
                        data.voucherDispatchDetail?.weight ? (Number(data.voucherDispatchDetail?.weight).toFixed(3))
                            :
                            isNaN(weight!) ? "-" : (weight! > 0 ? Number(weight).toFixed(3) : "-")
                    }


                </div>
                <div className='pr-4 text-right'>
                    {data.voucherDispatchDetail?.rate ? Number(data.voucherDispatchDetail?.rate).toFixed(2) : '-'}
                    {/* {isNaN(rate) ? "-" : (rate > 0 ? Number(rate).toFixed(2) : "-")} */}

                </div>
                    <div className='text-right pr-4  border-x-2'>
                    {data.voucherDispatchDetail?.totalFare ? Number(data.voucherDispatchDetail?.totalFare).toFixed(2) : '-'}
                    {/* {isNaN(totalFare) ? "-" : (totalFare > 0 ? Number(totalFare).toFixed(2) : "-")} */}

                    </div>
                    <div className='flex justify-start pl-2 gap-2'>
                    {
                        config.find(c => c.key === 'freight_method')?.value === 1 ?
                            <VoucherDispatchDetail01
                        form={form}
                        voucherDispatchDefaultValues={{ ...voucherDispatchDefaultValues, voucherId: data.voucherDispatchDetail?.voucherId, ...data.voucherDispatchDetail }} />
                            :
                            <VoucherDispatchDetail02
                                form={form}
                                voucherDispatchDefaultValues={{ ...voucherDispatchDefaultValues, voucherId: data.voucherDispatchDetail?.voucherId, ...data.voucherDispatchDetail }} />
                    }


                    {(data.voucherDispatchDetail?.totalFare && data.id) && <PopulateFreightData form={form} />}
                    </div>



                </div>
            {/* </form> */}
        </Form>
    )
}


const RecordHeader = () => {
    return (
        <div className='  border-amber-950! bg-gray-100  text-center font-bold  '>
            <div className='grid grid-cols-[60px_120px_100px_repeat(10,1fr)] text-accent-foreground border-2 text-left pl-2 font-stretch-ultra-expanded  h-full   items-center'>
                <div className='text-center'>Sl. No.</div>
                <div>Date</div>
                <div>Dl. No.</div>
                <div>Distributor</div>
                <div>Dispatch No.</div>
                <div>Source</div>
                <div>Destination</div>
                <div>Carrier Name</div>
                <div>Vehicle No.</div>
                <div className='text-right pr-4'>Weight(Mt)</div>
                <div className='text-right pr-4'>Rate(Per Mt)</div>
                <div className='text-right pr-4 border-x-2'>Total Fare</div>
                <div className='flex justify-center'>Bill</div>
            </div>

        </div>
    )
}


const RecordFooter = ({ data, stockUnits }: { data: FreightListSchema, stockUnits: StockUnitList }) => {
    const [total, setTotal] = useState({ distance: 0, rate: 0, totalFare: 0 });
    const [distanceUnit, setDistanceUnit] = useState<StockUnit | null>(null);

    useEffect(() => {
        setDistanceUnit(stockUnits.find((su) => su.id === data[0]?.voucherDispatchDetail?.distanceUnitId) || null);
    }, [data, stockUnits]);


    useEffect(() => {
        const totalDistance = data.reduce((sum, item) => sum + (Number(item.voucherDispatchDetail?.distance) || 0), 0);
        const totalRate = data.reduce((sum, item) => sum + (Number(item.voucherDispatchDetail?.rate) || 0), 0);
        const totalFare = data.reduce((sum, item) => sum + (Number(item.voucherDispatchDetail?.totalFare) || 0), 0);
        setTotal(prev => { return { ...prev, distance: totalDistance, rate: totalRate, totalFare: totalFare } });
    }, [data]);
    return (
        <div className=' border-amber-950! bg-gray-100  text-center font-bold  '>
            <div className=' grid grid-cols-[60px_120px_100px_repeat(10,1fr)] text-accent-foreground border-2 text-right   items-center pr-2 h-full justify-between'>
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

type PopulateFreightDataProps = {

    form: UseFormReturn<FreightForm>
}

const PopulateFreightData = ({ form }: PopulateFreightDataProps) => {
    const { mutate: saveFreight, isPending } = useFreightMutation()
    const [freightData, setFreightData] = useState<FreightSchema | null>(null);
    const [printDialogOpen, setPrintDialogOpen] = useState<boolean>(false);
    const getFreightData = () => {
        const formData = form.getValues();

        saveFreight(formData,
            {
                onSuccess: (data) => {
                    setFreightData?.(data?.data as FreightSchema ?? null)
                    setPrintDialogOpen(true);

                    // Navigate({ to: FreightRoute.to, })
                },
            }
        )

    }
    return (<>

        {printDialogOpen && freightData &&
            <PrintFreightDialog open={printDialogOpen} onOpenChange={setPrintDialogOpen} freightData={freightData} />}

        <Button type='button' className='focus:bg-slate-950 focus:text-zinc-50'
            variant='outline' size='sm' onClick={() => getFreightData()} disabled={isPending}>
            Freight Bill
        </Button>
    </>
    )
}