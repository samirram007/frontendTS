
import { useNavigate } from "@tanstack/react-router"
import { useFormContext, type UseFormReturn } from "react-hook-form"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import type { ReceiptNote } from '../data/schema'
import { type ReceiptNoteForm } from '../data/schema'
import { StockJournal } from "./stock-journal"


export interface ReceiptNoteProps {
    currentRow?: ReceiptNote
}

interface FormProps {
    form?: UseFormReturn<ReceiptNoteForm>
}
const FormAction = ({ currentRow }: ReceiptNoteProps) => {
    const isEdit = !!currentRow
    const navigate = useNavigate()

    const methods = useFormContext<ReceiptNoteForm>()




    return (

        <>
            <VoucherHeader />
            <BodyComponent />


            <Button type="submit">Save....</Button>

        </>



    )
}
export default FormAction




const formatDateForInput = (date: Date) => {
    const d = new Date(date)
    const year = d.getFullYear()
    const month = String(d.getMonth() + 1).padStart(2, "0") // months 0-11
    const day = String(d.getDate()).padStart(2, "0")
    return `${year}-${month}-${day}`
}
const VoucherHeader = () => {
    // const form = useFormContextReceiptNote()
    const methods = useFormContext<ReceiptNoteForm>()
    const { watch } = useFormContext<ReceiptNoteForm>()
    const voucherDate = watch("voucherDate")
    const inputValue = voucherDate
        ? formatDateForInput(new Date(voucherDate))
        : formatDateForInput(new Date()) // today in local timezone
    const dayName = voucherDate
        ? new Date(voucherDate).toLocaleDateString("en-US", { weekday: "long" })
        : ""
    return (
        <div className="grid grid-rows-1 ">
            <div className="grid grid-cols-[350px_1fr_200px] border-amber-300 border-0">

                <div>
                    <div className="grid grid-cols-[120px_200px] gap-2">
                        <div className="bg-red-400 text-gray-100 px-2">Receipt Note</div>
                        <div>No: {methods.getValues('voucherNo')}</div>

                    </div>
                    <div className="grid grid-cols-[40px_200px] gap-2">
                        <div>Ref. : </div>
                        <div>#1236</div>
                    </div>

                </div>
                <div></div>
                <div className="grid grid-rows-2 justify-end ">


                    <Input
                        type="date"
                        {...methods.register("voucherDate", {
                            setValueAs: (value) => (value ? new Date(value) : null), // store as Date
                        })}
                        value={inputValue}
                        onChange={(e) => {
                            if (e.target.value) {
                                methods.setValue("voucherDate", new Date(e.target.value))
                            }
                        }}
                    />
                    <div className="text-right text-sm font-bold">{dayName}</div>

                </div>
            </div>
            <div>
                <div className="grid grid-cols-[140px_1fr] justify-start ">
                    <div>Party's A/c Name</div>
                    <div>: Samir Ram</div>
                </div>
                <div className="grid grid-cols-[140px_1fr] justify-start ">
                    <div>Current Balance</div>
                    <div>: 50000 cr</div>
                </div>
            </div>
        </div>
    )
}

const BodyComponent = () => {
    const { register } = useFormContext<ReceiptNoteForm>()
    return (
        <div className="bg-violet-400/20">
            {/* <StockJournalEntries /> */}
            <StockJournal />
            {/* <pre>

                {JSON.stringify(register)}
            </pre> */}
        </div>
    )
}



const FooterComponent = () => {
    return (
        <div className="bg-red-300/20 grid grid-rows-[30px_1fr]">
            <div className="text-right">
                Total: 50000
            </div>
            <div className="grid grid-cols-2">
                <div>
                    <div className="text-sm">Narration:</div>
                    <div contentEditable className="narration caret-accent caret-underscore caret-unde justify-self-end bg-black text-gray-100 w-full h-full text-sm  font-semibold  "></div>
                </div>
                <div className="narration"></div>
            </div>
        </div>

    )
}