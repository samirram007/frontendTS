'use client'

import { Button } from '@/components/ui/button'
import {
    Form
} from '@/components/ui/form'


import FormInputField from '@/components/form-input-field'
import { Dialog, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Route as StockItemRoute } from '@/routes/_authenticated/masters/inventory/_layout/stock_item/_layout'
import { lowerCase } from '@/utils/removeEmptyStrings'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useStockItemMutation } from '../data/queryOptions'
import { formSchema, type StockItem, type StockItemForm } from '../data/schema'
import StockCategoryDropdown from './dropdown/stock_category-dropdown'
import StockGroupDropdown from './dropdown/stock_group-dropdown'
import StockUnitDropdown from './dropdown/stock_unit-dropdown'
import TypeOfSupplySelect from './dropdown/type_of_supply-select'
import UqcDropdown from './dropdown/uqc-dropdown'

interface Props {
    currentRow?: StockItem
}

export function FormAction({ currentRow }: Props) {
    const isEdit = !!currentRow
    const navigate = useNavigate();

    const { mutate: saveStockItem, isPending } = useStockItemMutation()

    const form = useForm<StockItemForm>({
        resolver: zodResolver(formSchema),
        defaultValues: isEdit
            ? { ...currentRow, isEdit }
            : {
                name: '',
                code: '',
                printName: '',
                sku: '',
                articleNo: '',
                partNo: '',
                status: 'active',
                description: '',
                stockGroupId: undefined,
                stockCategoryId: undefined,
                stockUnitId: undefined,
                alternateStockUnitId: undefined,
                baseUnitValue: undefined,
                alternateUnitValue: undefined,
                uqcId: undefined,
                typeOfSupply: undefined,
                isNegativeSalesAllow: false,
                isMaintainBatch: false,
                isMaintainSerial: false,
                isExpiryItem: false,
                isFinishGoods: false,
                isRawMaterial: false,
                isUnfinishedGoods: false,
                costingMethod: undefined,
                pricingMethod: undefined,
                reorderLevel: undefined,
                minimumStock: undefined,
                maximumStock: undefined,
                hasBom: false,
                isSalesAsNewManufacture: false,
                isPurchaseAsConsumed: false,
                isRejectionAsScrap: false,
                isGstApplicable: true,
                rateOfDuty: undefined,
                hsnSacCode: '',
                isGstInclusive: false,
                gstType: undefined,
                brandId: undefined,
                mrp: undefined,
                standardCost: undefined,
                icon: '',

                isEdit,
            },
    })

    const config = [{
        key: 'alternate_units',
        value: true
    }]

    const moduleName = "StockItem"
    const onSubmit = (values: StockItemForm) => {
        form.reset()
        saveStockItem(
            currentRow ? { ...values, id: currentRow.id! } : values,
            {
                onSuccess: () => {
                    navigate({ to: StockItemRoute.to, })
                },
            }
        )

    }


    return (


        <Dialog>
            <DialogHeader className='text-left'>
                <DialogTitle>{isEdit ? 'Edit ' : 'Add New '} {moduleName}</DialogTitle>
                <DialogDescription>
                    {isEdit ? `Update the ${lowerCase(moduleName)} here. `
                        : `Create new ${lowerCase(moduleName)} here. `}
                    Click save when you&apos;re done.
                </DialogDescription>
            </DialogHeader>

            <div className=' h-full w-full overflow-y-auto py-1 pr-4 '>
                <Form {...form}>
                    <form
                        id='user-form'
                        onSubmit={form.handleSubmit(onSubmit)}
                        className='space-y-4 p-0.5'
                    >
                        <div className="grid grid-cols-[1fr_20rem] gap-8 space-y-8 ">
                            <div className=" space-y-4 pr-20">


                                <FormInputField type='text' form={form} name='name' label='Name' />
                                <FormInputField type='text' form={form} name='code' label='Code' />
                                <FormInputField type='text' form={form} name='printName' label='Print Name' />
                            </div>
                            <div className=" space-y-4">
                                <FormInputField type='text' form={form} name='articleNo' label='Article No' />
                                <FormInputField type='text' form={form} name='partNo' label='Part No' />
                                <FormInputField type='text' form={form} name='sku' label='SKU' />
                            </div>
                        </div>
                        <div className=" grid grid-cols-[1fr_20rem] gap-8  space-y-2  ">
                            <FormInputField type='textarea' form={form} name='description' label='Description' />
                            <div className="col-span-1  md:col-span-1 space-y-4">

                            </div>
                        </div>
                        <div className=" grid grid-cols-[1fr_20rem_20rem] gap-8 border-t-2 border-solid border-gray-700  ">
                            <div className='space-y-4 pt-4'>
                                <StockGroupDropdown form={form} />
                                <StockCategoryDropdown form={form} />
                                <StockUnitDropdown form={form} config={config} />

                                <FormInputField type='text' form={form} name='alternateUnitRatio' label='Alternate Unit Ratio' />
                                <FormInputField type='text' form={form} name='invoiceStockUnitId' label='Invoice Stock Unit' />
                                <FormInputField type='text' form={form} name='invoiceConversionFactor' label='Invoice Conversion Factor' />
                                <FormInputField type='text' form={form} name='noOfDecimalPlaces' label='No Of Decimal Places' />

                                <FormInputField type='checkbox' form={form} name='isMaintainBatch' label='Is Maintain Batch' />
                                <FormInputField type='checkbox' form={form} name='isMaintainSerial' label='Is Maintain Serial' />
                            </div>
                            <div className='space-y-4 border-x-2 border-solid border-gray-700 px-4'>
                                <div>Tax Information</div>

                                <FormInputField type='checkbox' form={form} name='isGstApplicable' label='Is Gst Applicable' />
                                <FormInputField type='text' form={form} name='rateOfDuty' label='Rate Of Duty' />
                                <FormInputField type='text' form={form} name='hsnSacCode' label='Hsn Sac' />
                                <FormInputField type='checkbox' form={form} name='isGstInclusive' label='Gst Inclusive' />
                            </div>
                            <div className='space-y-4'>
                                <div>Behaviour</div>
                                <UqcDropdown form={form} />
                                <TypeOfSupplySelect form={form} />
                                <FormInputField type='checkbox' form={form} name='isNegativeSalesAllow' label='Is Negative Sales Allow' />

                                <FormInputField type='checkbox' form={form} name='isExpiryItem' label='Is Expiry Item' />
                                <FormInputField type='checkbox' form={form} name='isFinishGoods' label='Is Finish Goods' />
                                <FormInputField type='checkbox' form={form} name='isRawMaterial' label='Is Raw Material' />
                                <FormInputField type='checkbox' form={form} name='isUnfinishedGoods' label='Is Unfinished Goods' />
                                <FormInputField type='text' form={form} name='costingMethod' label='Costing Method' />
                                <FormInputField type='text' form={form} name='pricingMethod' label='Pricing Method' />
                                <FormInputField type='text' form={form} name='reorderLevel' label='Reorder Level' />
                                <FormInputField type='text' form={form} name='minimumStock' label='Minimum Stock' />
                                <FormInputField type='text' form={form} name='maximumStock' label='Maximum Stock' />
                                <FormInputField type='checkbox' form={form} name='hasBom' label='Has Bom' />
                                <FormInputField type='checkbox' form={form} name='isSalesAsNewManufacture' label='Is Sales As New Manufacture' />
                                <FormInputField type='checkbox' form={form} name='isPurchaseAsConsumed' label='Is Purchase As Consumed' />
                                <FormInputField type='checkbox' form={form} name='isRejectionAsScrap' label='Is Rejection As Scrap' />
                            </div>

                        </div>




                        <FormInputField type='checkbox' form={form} name='isGstApplicable' label='Is Gst Applicable' />
                        <FormInputField type='text' form={form} name='rateOfDuty' label='Rate Of Duty' />
                        <FormInputField type='text' form={form} name='hsnSacCode' label='Hsn Sac Code' />
                        <FormInputField type='checkbox' form={form} name='isGstInclusive' label='Is Gst Inclusive' />
                        <FormInputField type='text' form={form} name='gstType' label='Gst Type' />
                        <FormInputField type='text' form={form} name='brandId' label='Brand ID' />
                        <FormInputField type='text' form={form} name='mrp' label='Mrp' />
                        <FormInputField type='text' form={form} name='standardCost' label='Standard Cost' />
                        <FormInputField type='text' form={form} name='icon' label='Icon' />
                        <FormInputField type='checkbox' form={form} name='status' label='Status' options={[
                            { label: 'Active', value: 'active' },
                            { label: 'Inactive', value: 'inactive' },
                        ]} />










                    </form>
                </Form>
            </div>
            <DialogFooter>
                <Button type='submit' form='user-form' disabled={isPending}>
                    {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {isPending ? "Saving..." : "Save changes"}
                </Button>
            </DialogFooter>
        </Dialog>
    )
}