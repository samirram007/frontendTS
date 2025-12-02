import { Form } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, type Resolver } from "react-hook-form"
import deliveryNoteDefaultValues from "../data/data"
import { formSchema, type DeliveryNoteForm } from "../data/schema"
import PosBody from "./components/pos-body"
import PosFooter from "./components/pos-footer"
import PosHeader from "./components/pos-header"
import type { DeliveryNoteProps } from "./contracts"


const Pos = ({ currentRow }: DeliveryNoteProps) => {
    const isEdit = !!currentRow
    const data = { ...currentRow }
    const mainForm = useForm<DeliveryNoteForm>({
        resolver: zodResolver(formSchema) as Resolver<DeliveryNoteForm>,
        defaultValues: isEdit ?
            { ...data, isEdit: true, } :
            { ...deliveryNoteDefaultValues, isEdit: false },
    })
    // console.log("WATCH: ", mainForm.watch('stockJournal'))
    return (
        <>

            <div className="voucher-entry w-full 
            grid grid-rows-[1fr_120px] 
         h-[calc(100dvh_-_170px)]  ">
                <Form {...mainForm}>
                    <div className="max-h-full grid grid-rows-[150px_1fr] overflow-hidden">


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