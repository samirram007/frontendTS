// import { ErrorToast } from "@/features/modules/booking/utils/error-response";
import { usePayment } from "../../../contexts/payment-context";

const formatDate = (dateString: string | Date) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0'); // dd
    const monthShort = date.toLocaleString('en-GB', { month: 'short' }); // MMM
    const year = date.getFullYear().toString().slice(-2); // yy
    return `${day}-${monthShort}-${year}`;
};

interface IBookingAmountDetailInterface {
    refundAmount: number;
    totalAmount: number,
    remainingAmount: number,
    amountPaid: number
}

export default function BookingAmountDetails({ totalAmount, refundAmount, amountPaid, remainingAmount }: IBookingAmountDetailInterface) {
    const { payementReceipt } = usePayment();




    return (
        <>
            <div className="mb-3 px-2">
                <h1 className="font-bold underline underline-offset-2">Payment Details</h1>
            </div>
            <div className="px-6 mb-4">
                <div className="grid grid-cols-[200px_1fr] items-center mb-1">
                    <div className="font-medium">Net Payable</div>
                    <div className="text-right text-base font-bold">{totalAmount > 0 ? totalAmount.toFixed(2) : '0.00'}</div>
                </div>
                <div className="grid grid-cols-[200px_1fr]">
                    <div className="font-medium">Amount paid till date</div>
                    <div className="text-right text-base font-bold">{amountPaid > 0 ? amountPaid.toFixed(2) : '0.00'}</div>
                </div>
                <div className="grid grid-cols-[200px_1fr] items-center justify-center">
                    <div className="font-medium">Outstanding amount</div>
                    <div className="text-right text-base font-bold">{remainingAmount > 0 ? remainingAmount.toFixed(2) : '0.00'}</div>
                </div>
                {
                    refundAmount != 0 &&
                    (
                        <div className="grid grid-cols-[200px_1fr] items-center justify-center">
                            <div className="font-medium">Refund amount</div>
                            <div className="text-right text-base font-bold">{refundAmount > 0 ? refundAmount.toFixed(2) : '0.00'}</div>
                        </div>
                    )
                }
            </div>

            <div className="px-6 grid grid-rows-1 gap-3">

                {
                    payementReceipt.length > 0
                    &&
                    <div className="space-y-2">
                        {
                            payementReceipt.map((item, index) => (
                                <div key={index} className="grid grid-cols-[200px_1fr]">
                                    <div>Receipt ({formatDate(item.date)})</div>
                                    <div className="text-right font-semibold">(-){item.amount.toFixed(2)}</div>
                                </div>
                            ))
                        }
                    </div>
                }
                {/* {
                    dueAmount != 0
                    &&
                    <div className="grid grid-cols-[200px_1fr]">
                        <div className="font-medium">Due as on ({formatDate(new Date())}) </div>
                        <div className="text-right  font-semibold">{dueAmount > 0 ? dueAmount.toFixed(2) : '0.00'}</div>
                    </div>
                }
                {
                    !isFullPaymentDone &&
                    (
                        <div className="grid grid-cols-[180px_1fr]">
                            <div className="font-medium">Receiving Amount</div>
                            <div className="text-right border-[1px] rounded border-gray-700 font-semibold">
                                <input type="number" value={receivingAmount} onChange={(e) => handlePaymentChange(e)} className="border-0 text-right px-1 py-2 pr-3 placeholder:text-[11px] outline-0 ring-0 h-full w-full" placeholder="Enter recieving amount" />
                            </div>
                        </div>
                    )
                } */}
            </div>
        </>

    )
}
