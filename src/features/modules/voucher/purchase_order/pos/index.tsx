import { useForm, type Resolver } from "react-hook-form";
import { usePos } from "../../contexts/pos-context";
import type { PurchaseOrderProps } from "./contracts";
import { formSchema, type PurchaseOrderForm } from "../data/schema";
import purchaseOrderDefaultValues from "../data/data";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Form } from "@/components/ui/form";
import PosBody from "./components/pos-body";
import PosFooter from "./components/pos-footer";
import PosHeader from "./components/pos-header";

const Pos = ({ currentRow }: PurchaseOrderProps) => {
    const { setMovementType } = usePos()
    const isEdit = !!currentRow
    const data = { ...currentRow }
    const mainForm = useForm<PurchaseOrderForm>({
        resolver: zodResolver(formSchema) as Resolver<PurchaseOrderForm>,
        defaultValues: isEdit ?
            { ...data, isEdit: true, } :
            { ...purchaseOrderDefaultValues, isEdit: false },
    })
    useEffect(() => {
        const movementTypeValue = isEdit ? (data?.stockJournal?.stockJournalEntries?.[0]?.movementType || "out") : "out"
        setMovementType?.(movementTypeValue)
    }, [isEdit, data, setMovementType])    

    return (
        <>
            <div className="voucher-entry w-full 
            grid grid-rows-[1fr_120px] 
         h-[calc(100dvh-170px)]  ">
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

export default Pos;