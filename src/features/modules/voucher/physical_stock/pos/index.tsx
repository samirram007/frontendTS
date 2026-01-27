import { Form } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, type Resolver } from "react-hook-form"
import physicalStockDefaultValues from "../data/data"
import { formSchema, type PhysicalStockForm } from "../data/schema"
import PosBody from "./components/pos-body"
import PosFooter from "./components/pos-footer"
import PosHeader from "./components/pos-header"
import type { PhysicalStockProps } from "./contracts"
import { usePos } from "../../contexts/pos-context"
import { useEffect } from "react"


const Pos = ({ currentRow }: PhysicalStockProps) => {
    const { setMovementType } = usePos()
    const isEdit = !!currentRow
    const data = { ...currentRow }
    const mainForm = useForm<PhysicalStockForm>({
        resolver: zodResolver(formSchema) as Resolver<PhysicalStockForm>,
        defaultValues: isEdit ?
            { ...data, isEdit: true, } :
            { ...physicalStockDefaultValues, isEdit: false },
    })
    useEffect(() => {
        const movementTypeValue = isEdit ? (data?.stockJournal?.stockJournalEntries?.[0]?.movementType || "out") : "out"
        setMovementType?.(movementTypeValue)
    }, [isEdit, data, setMovementType])
    // console.log("WATCH: ", mainForm.watch('stockJournal'))
    return (
        <>
            <div className="voucher-entry w-full grid grid-rows-[1fr_120px] h-[calc(100dvh-170px)]">
                <Form {...mainForm}>
                    <div className="max-h-full grid grid-rows-[150px_1fr] overflow-hidden">
                        <PosHeader mainForm={mainForm} />
                        <PosBody mainForm={mainForm} />
                    </div>
                    <PosFooter mainForm={mainForm} />
                </Form>
            </div>
        </>
    )
}

export default Pos