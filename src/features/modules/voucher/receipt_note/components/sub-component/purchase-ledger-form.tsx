import { FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

import { useQuery } from "@tanstack/react-query"

import type { UseFormReturn } from "react-hook-form"
import { fetchPurchaseLedgersService } from "../../data/api"
import type { ReceiptNoteForm } from "../../data/schema"
import { PurchaseLedgerCombobox } from './purchase_ledger-combo-box'



type FormProps = {
    form: UseFormReturn<ReceiptNoteForm>;
};
const PurchaseLedgerForm = (props: FormProps) => {
    const { form } = props as FormProps;
    const { data: purchaseLedgers, isLoading } = useQuery({
        queryKey: ["accountLedgers", "purchase"],
        queryFn: () => fetchPurchaseLedgersService(),
    })
    console.log(purchaseLedgers?.data)
    // const handleValueChange = (value: string) => {
    //     form.setValue('party.id', Number(value))

    // }
    if (isLoading) {
        return <div>Loading...</div>
    }
    return (
        <>
            <FormField
                control={form.control}
                name={'purchaseLedgerId'}
                render={({ field }) => (
                    <FormItem className='grid grid-rows-1 gap-1'>
                        <div className="grid grid-cols-[140px_1fr] justify-start items-center ">

                            <FormLabel className=' text-right'>
                                Purchase Ledger
                            </FormLabel>
                            <div className="w-8/12 grid grid-cols-[auto_1fr] gap-2 items-center  ">
                                <div className="text-right" >:</div>
                                <PurchaseLedgerCombobox form={form} purchaseLedgers={purchaseLedgers?.data} />

                            </div>
                            <FormMessage className=' col-start-3' />
                        </div>
                        <div className="grid grid-cols-[160px_1fr] items-center justify-start ">
                            <div></div>
                            <div className="italic text-sm">Current Balance : 50000 cr</div>
                        </div>
                    </FormItem>
                )}
            />
        </>

    )
}

export default PurchaseLedgerForm