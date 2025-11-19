import { FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

import { useQuery } from "@tanstack/react-query"

import { cn } from "@/lib/utils"
import { useFormContext } from "react-hook-form"
import { fetchStockInHandLedgersService } from "../../data/api"
import type { ReceiptNoteForm } from "../../data/schema"
import { TransactionLedgerCombobox } from './transaction-ledger-combo-box'
import VoucherDispatchDetail from "./voucher-dispatch-detail"



type FormProps = {

    tabIndex?: number;
};
const TransactionLedgerForm = (props: FormProps) => {
    const { tabIndex } = props as FormProps;
    const form = useFormContext<ReceiptNoteForm>()
    const { data: transactionLedgers, isLoading } = useQuery({
        queryKey: ["accountLedgers", "stock_in_hand"],
        queryFn: () => fetchStockInHandLedgersService(),
    })

    if (isLoading) {
        return <div>Loading...</div>
    }
    console.log(tabIndex)
    return (
        <>
            <FormField
                control={form.control}
                name={'transactionLedger.id'}
                render={() => (
                    <FormItem className='grid grid-rows-1 gap-1 '>
                        <div className="grid grid-cols-[140px_1fr] justify-start items-center ">

                            <FormLabel className=' text-right'>
                                Stock Ledger
                            </FormLabel>
                            <div className={cn(form.getValues('transactionLedger.id') ? "w-8/12" : "w-10/12", "grid grid-cols-[auto_1fr_100px] gap-2 items-center  ")}>
                                <div className="text-right" >:</div>
                                <TransactionLedgerCombobox form={form} transactionLedgers={transactionLedgers?.data} />

                                {
                                    form.getValues('transactionLedger.id') &&

                                    <VoucherDispatchDetail />
                                }
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

export default TransactionLedgerForm