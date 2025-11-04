import { Form } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import defaultValues from "../data/data"
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
        defaultValues: {
            ...defaultValues,
            stockJournal: {
                ...defaultValues.stockJournal,
                journalDate: new Date(defaultValues.stockJournal.journalDate)
            }
        },
    })

    return (
        <>

            <div className="w-full grid grid-rows-[1fr_100px] 
         h-[calc(100dvh_-_150px)]  ">

                <div className="max-h-full grid grid-rows-[200px_1fr] overflow-hidden">
                    <Form {...mainForm}>

                        <PosHeader form={mainForm} />
                    </Form>
                    <PosBody mainForm={mainForm} />


                </div>
                <PosFooter />
            </div>
        </>
    )
}

export default Pos