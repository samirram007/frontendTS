import { usePayment } from "@/features/modules/booking/contexts/payment-context";
import { ErrorToast } from "@/features/modules/booking/utils/error-response";
import { useState } from "react";

export default function BookingAmountDetails(){

    const {totalAmount,netAmount,discountAmount,discountedAmount} = usePayment();
    const [dueAmount,setDueAmount] = useState<number>(0);
    const [recievingAmount,setRecievingAmount] = useState<string>("");
    const [amountToBePaid,setAmountToBePaid] = useState<number>(netAmount);
    const [discountDetail,_setDiscountDetail] = useState<string>("");


    const handlePaymentChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setRecievingAmount(e.target.value);
        if(e.target.value == ''){
            setRecievingAmount('');
            setDueAmount(0)
            setAmountToBePaid(discountedAmount);
            return;
        }
        if(Number(e.target.value) > netAmount){
            setRecievingAmount('');
            setDueAmount(0);
            setAmountToBePaid(netAmount);
            ErrorToast.launchErrorToast("Amount limit exceded");
            return;
        }

        const remainingAmountToBePaid = netAmount - Number(e.target.value);
        console.log(remainingAmountToBePaid);
        setDueAmount(remainingAmountToBePaid);
        setAmountToBePaid(Number(e.target.value));
    }


    return(
        <>
            <div className="mb-3 px-2">
                <h1 className="font-bold underline underline-offset-2">Payment Details</h1>
            </div>
            <div className="px-6 grid grid-rows-1 gap-4">
                <div className="grid grid-cols-[200px_1fr]">
                    <div className="font-medium">Total Amount</div>
                    <div className="text-right  font-semibold">{totalAmount > 0 ? totalAmount.toFixed(2) :  '0.00'}</div>
                </div>
                {
                    discountDetail != '' && (
                        <>
                            <div className="grid grid-cols-[200px_1fr]">
                                <div className="font-medium">Discount Amount</div>
                                <div className="text-right  font-semibold">{discountAmount.toFixed(2) ?? '0.00'}</div>
                            </div>
                            <div className="grid grid-cols-[200px_1fr]">
                                <div className="font-medium">Discounted Amount</div>
                                <div className="text-right  font-semibold">{discountedAmount > 0 ? discountedAmount.toFixed(2) :  '0.00'}</div>
                            </div>
                        </>
                    )
                }
                
                <div className="grid grid-cols-[180px_1fr]">
                    <div className="font-medium">Receiving Amount</div>
                    <div className="text-right border-[1px] rounded border-gray-700 font-semibold">
                        <input type="number" value={recievingAmount} onChange={(e)=> handlePaymentChange(e)} className="border-0 text-right px-1 py-2 pr-3 placeholder:text-[11px] outline-0 ring-0 h-full w-full" placeholder="Enter recieving amount" />
                    </div>
                </div>
                <div className="grid grid-cols-[200px_1fr]">
                    <div className="font-medium">Due Amount ({new Date().toLocaleDateString([],{day:'2-digit',month:'2-digit',year:'2-digit'})}) </div>
                    <div className="text-right  font-semibold">{dueAmount > 0 ? dueAmount.toFixed(2) :  '0.00'}</div>
                </div>
                <div className="grid grid-cols-[200px_1fr] border-t-2 border-b-2 py-2 border-dashed border-gray-500">
                    <div className="font-medium">Amount Paid</div>
                    <div className="text-right  font-semibold">{amountToBePaid > 0 ? amountToBePaid.toFixed(2) :  '0.00'}</div>
                </div>
            </div>
        </>
      
    )
}
