import { FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

import { useQuery } from "@tanstack/react-query"

import type { UseFormReturn } from "react-hook-form"
import { fetchSaleLedgersService } from "../../data/api"
import type { DeliveryNoteForm } from "../../data/schema"
import { SaleLedgerCombobox } from './sale_ledger-combo-box'



type FormProps = {
    form: UseFormReturn<DeliveryNoteForm>;
};
const SaleLedgerForm = (props: FormProps) => {
    const { form } = props as FormProps;
    const { data: saleLedgers, isLoading } = useQuery({
        queryKey: ["accountLedgers", "sale"],
        queryFn: () => fetchSaleLedgersService(),
    })
    // console.log(saleLedgers?.data)
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
                name={'transactionLedger.id'}
                render={() => (
                    <FormItem className='grid grid-rows-1 gap-1'>
                        <div className="grid grid-cols-[140px_1fr] justify-start items-center ">

                            <FormLabel className=' text-right'>
                                Sale Ledger
                            </FormLabel>
                            <div className="w-8/12 grid grid-cols-[auto_1fr] gap-2 items-center  ">
                                <div className="text-right" >:</div>
                                <SaleLedgerCombobox form={form} saleLedgers={saleLedgers?.data} />

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

export default SaleLedgerForm