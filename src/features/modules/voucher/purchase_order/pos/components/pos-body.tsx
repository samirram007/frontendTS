import { useForm, useWatch, type Resolver } from "react-hook-form";
import type { PurchaseOrderForm } from "../../data/schema";
import { usePos } from "../../../contexts/pos-context";
import { stockJournalSchema, type StockJournalForm } from "../../../data-schema/voucher-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo } from "react";
import { isEqual } from "lodash";
import { Form } from "@/components/ui/form";
import StockJournal from "../../../components/stock-journal";

type PosBodyProps = {
    mainForm: ReturnType<typeof useForm<PurchaseOrderForm>>;
};

const PosBody = ({ mainForm: purchaseOrderForm }: PosBodyProps) => {
    const { movementType } = usePos()
    const stockJournal = purchaseOrderForm.watch("stockJournal")
    const stockJournalForm = useForm<StockJournalForm>({
        resolver: zodResolver(stockJournalSchema) as Resolver<StockJournalForm>,
        defaultValues: {
            ...stockJournal, type: movementType,
            stockJournalEntries: stockJournal?.stockJournalEntries ?? []
        }
    })

    const stockJournalEntries = useWatch({
        control: stockJournalForm.control,
        name: "stockJournalEntries",
    });
    const stockJournalTotal = useMemo(() => {
        const entries = stockJournalEntries || [];
        const totalAmount = entries.reduce((acc, entry) => {
            return acc + (Number(entry?.amount) || 0);
        }, 0);
        return { totalAmount };
    }, [stockJournalEntries]);
    useEffect(() => {
        // when parent changes, update child
        const parentValue = purchaseOrderForm.getValues("stockJournal");
        if (parentValue && !isEqual(parentValue, stockJournalForm.getValues())) {
            stockJournalForm.reset(parentValue);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [purchaseOrderForm.watch("stockJournal")]);

    useEffect(() => {
        // when child changes, update parent
        const subscription = stockJournalForm.watch((value) => {
            const currentParent = purchaseOrderForm.getValues("stockJournal");
            if (!isEqual(currentParent, value)) {
                purchaseOrderForm.setValue("stockJournal", value as StockJournalForm, {
                    shouldValidate: false,
                });
            }
        });
        return () => subscription.unsubscribe();
    }, [purchaseOrderForm, stockJournalForm]);

    if (purchaseOrderForm.watch("transactionLedger.id") === undefined || purchaseOrderForm.watch("partyLedger.id") === undefined) {
        return <StockJournalUnloadedView />
    }

    console.log(purchaseOrderForm.watch());



    return (
        <>
            <div className="flex flex-col w-full gap-0   items-start overflow-y-scroll px-2  ">
                <div className="grid grid-cols-1 w-full gap-2   items-start overflow-y-scroll px-2  ">
                    <Form {...stockJournalForm}>
                        <StockJournal stockJournalForm={stockJournalForm} isPurchaseOrder={purchaseOrderForm.watch("voucherTypeId") == 5001} />
                    </Form>
                </div>
                {stockJournalTotal && stockJournalTotal.totalAmount > 0 && (
                    <div className="w-full flex justify-end  font-bold">
                        <div className="grid grid-cols-[1fr_200px_120px] gap-4 text-right ">
                            <div>Item Total: </div>
                            <div className="pr-4">{stockJournalTotal.totalAmount.toFixed(2)}</div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )

}

export default PosBody;

const StockJournalUnloadedView = () => {
    return (
        <div className="flex flex-col w-full gap-0   items-start overflow-y-scroll px-2  ">
            <div className="grid grid-cols-1 w-full gap-2   items-start overflow-y-scroll px-2  ">
                <div className="">
                    <div className="border-inside-all 
                    grid grid-rows-1 grid-cols-[1fr_300px_150px_80px_80px_200px_120px] 
                    bg-gray-300 text-center border-border">

                        <div className="border-r-0!  ">Particulars</div>


                        <div className="grid grid-rows-2 border-0!">
                            <div className="border-b-0!  ">Quantity</div>
                            <div className="grid grid-cols-2 items-center">
                                <div className="border-y-0! border-x-0!  ">Actual</div>
                                <div className="border-y-0! border-r-0!  ">Billing</div>
                            </div>
                        </div>
                        <div className="border-l-0!">Rate</div>
                        <div className="border-l-0!">per</div>
                        <div className="border-l-0!">disc%</div>
                        <div className="border-l-0!">Amount</div>
                        <div className="border-l-0!">Action</div>

                    </div>
                </div>
                <div className="text-center text-gray-500 py-20">
                    Please select both Party A/c and Purchase Ledger to add Stock Journal Entries.
                </div>


            </div>
        </div>
    )
}