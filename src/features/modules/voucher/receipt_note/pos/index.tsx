import { Form } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import receiptNoteDefaultValues from "../data/data"
import { formSchema, type ReceiptNote, type ReceiptNoteForm } from "../data/schema"
import PosBody from "./components/pos-body"
import PosFooter from "./components/pos-footer"
import PosHeader from "./components/pos-header"

export interface ReceiptNoteProps {
    currentRow?: ReceiptNote
}

const Pos = ({ currentRow }: ReceiptNoteProps) => {
    const isEdit = !!currentRow
    const data = { ...currentRow } 
    const mainForm = useForm<ReceiptNoteForm>({
        resolver: zodResolver(formSchema),
        defaultValues: isEdit ?
            { ...data, isEdit: true, } :
            { ...receiptNoteDefaultValues, isEdit: false },
    })
    // console.log("WATCH: ", mainForm.watch('stockJournal'))
    return (
        <>

            <div className="voucher-entry w-full grid grid-rows-[1fr_100px] 
         h-[calc(100dvh_-_150px)]  ">
                <Form {...mainForm}>
                <div className="max-h-full grid grid-rows-[200px_1fr] overflow-hidden">


                        <PosHeader />

                        <PosBody />


                </div>


                    <PosFooter />
                </Form>
            </div>
        </>
    )
}

export default Pos