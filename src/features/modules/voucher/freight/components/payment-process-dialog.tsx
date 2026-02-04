

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import type { Row } from "@tanstack/react-table";
import type { FreightVoucherSchema } from "../data/schema";



interface PaymentProcessProps<TData> {
    row: Row<TData>
}




export default function PaymentProcessDialog<TData>({ row }: PaymentProcessProps<TData>) {
    const voucher = row.original as FreightVoucherSchema;

    const hasPayment = voucher;
    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Button>{voucher.paymentStatus}</Button>
                </DialogTrigger>

                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Payment</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-2">
                        <p>Payable amount:</p>
                        <input
                            type="number"
                            className="border p-2 w-full rounded"
                            placeholder="Enter amount"
                        />
                    </div>

                    {/* {hasPayment ? (
                        <div className="space-y-2">
                            <p className="font-semibold">Previous Payments:</p>
                            {voucher.paymentReferences.map((ref: any) => (
                                <div key={ref.id} className="border p-2 rounded">
                                    Voucher: {ref.referenceVoucher?.voucherNo}
                                    <br />
                                    Amount: {ref.referenceVoucher?.amount}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="space-y-2">
                            <p>Payable amount:</p>
                            <input
                                type="number"
                                className="border p-2 w-full rounded"
                                placeholder="Enter amount"
                            />
                        </div>
                    )} */}
                </DialogContent>
            </Dialog>
        </>
    )
}