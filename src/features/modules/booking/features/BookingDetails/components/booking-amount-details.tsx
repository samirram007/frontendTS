import { ErrorToast } from "@/features/modules/booking/utils/error-response";
import { useState } from "react";
import { usePayment } from "../../../contexts/payment-context";
import { useBookingDetail } from "../context/booking-detail-context";

const formatDate = (dateString: string | Date) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0'); // dd
  const monthShort = date.toLocaleString('en-GB', { month: 'short' }); // MMM
  const year = date.getFullYear().toString().slice(-2); // yy
  return `${day}-${monthShort}-${year}`;
};

export default function BookingAmountDetails(){

    const {totalAmount,discountAmount,discountedAmount,dueAmount,receivingAmount,setReceivingAmount,payementReceipt} = usePayment();
    const {isFullPaymentDone} = useBookingDetail();
   
    const [discountDetail,_setDiscountDetail] = useState<string>("");


    // const handlePaymentChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    //     setRecievingAmount(e.target.value);
    //     if(e.target.value == ''){
    //         setRecievingAmount('');
    //         setDueAmount(0)
    //         setAmountToBePaid(discountedAmount);
    //         return;
    //     }
    //     if(Number(e.target.value) > totalAmount){
    //         setRecievingAmount('');
    //         setDueAmount(0);
    //         setAmountToBePaid(netAmount);
    //         ErrorToast.launchErrorToast("Amount limit exceded");
    //         return;
    //     }

    //     const remainingAmountToBePaid = netAmount - Number(e.target.value);
    //     console.log(remainingAmountToBePaid);
    //     setDueAmount(remainingAmountToBePaid);
    //     setAmountToBePaid(Number(e.target.value));
    // }
    const handlePaymentChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setReceivingAmount(e.target.value);
        if(e.target.value == ''){
            setReceivingAmount('');
            return;
        }
        
        if(dueAmount == 0 && Number(e.target.value) > totalAmount){
            setReceivingAmount('');
            ErrorToast.launchErrorToast("Amount limit exceded");
            return;
        }
        console.log(e.target.value,dueAmount);
        
        if(dueAmount != 0 && Number(e.target.value) > dueAmount){
            setReceivingAmount('');
            ErrorToast.launchErrorToast("Amount limit exceded");
            return;
        }
    }



    return(
        <>
            <div className="mb-3 px-2">
                <h1 className="font-bold underline underline-offset-2">Payment Details</h1>
            </div>
            <div className="px-6 grid grid-rows-1 gap-4">
                <div className="grid grid-cols-[200px_1fr]">
                    <div className="font-medium">Net Payable</div>
                    <div className="text-right text-base font-bold">{totalAmount > 0 ? totalAmount.toFixed(2) :  '0.00'}</div>
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

                {
                    payementReceipt.length > 0
                    &&
                    <div className="space-y-2">
                        {
                            payementReceipt.map((item,index)=>(
                                <div key={index} className="grid grid-cols-[200px_1fr]">
                                    <div>Receipt ({formatDate(item.date)})</div>
                                    <div className="text-right font-semibold">(-){item.amount.toFixed(2)}</div>
                                </div>
                            ))
                        }
                    </div>
                }
                {
                    dueAmount != 0 
                    &&
                    <div className="grid grid-cols-[200px_1fr]">
                        <div className="font-medium">Due as on ({formatDate(new Date())}) </div>
                        <div className="text-right  font-semibold">{dueAmount > 0 ? dueAmount.toFixed(2) :  '0.00'}</div>
                    </div>
                }
                {
                    !isFullPaymentDone &&
                    (
                        <div className="grid grid-cols-[180px_1fr]">
                            <div className="font-medium">Receiving Amount</div>
                            <div className="text-right border-[1px] rounded border-gray-700 font-semibold">
                                <input type="number" value={receivingAmount} onChange={(e)=> handlePaymentChange(e)} className="border-0 text-right px-1 py-2 pr-3 placeholder:text-[11px] outline-0 ring-0 h-full w-full" placeholder="Enter recieving amount" />
                            </div>
                        </div>
                    )
                }
                
               
                
                
                {/* <div className="grid grid-cols-[200px_1fr] border-t-2 border-b-2 py-2 border-dashed border-gray-500">
                    <div className="font-medium">Amount Paid</div>
                    <div className="text-right  font-semibold">{Number(receivingAmount) > 0 ? Number(receivingAmount).toFixed(2) :  '0.00'}</div>
                </div> */}
            </div>
        </>
      
    )
}
