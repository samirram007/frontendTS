import type { IBooking } from "../../NewBooking/data/schema";
import { usePayment } from "../../../contexts/payment-context";
import InvoiceFeatureModal from "../../NewBooking/features/InvoiceFeature/invoice-feature-modal";
import { useBookingDetail } from "../context/booking-detail-context";



export function BookingDetailPayment({data}:{data?:IBooking}){
    const {totalAmount,netAmount,dueAmount,payementReceipt} = usePayment();
    const {isFullPaymentDone} = useBookingDetail();

    return(
        <>
            <div className=" sticky  left-0 w-full py-2 bg-gray-100 z-50 grid grid-cols-[1fr_120px_200px_200px_150px_200px]">
                <div className="px-4">
                    <div className="font-bold">Invoices:</div>
                    <InvoiceFeatureModal
                        button={
                        <span className="text-blue-500 underline underline-offset-1">Payment Invoice</span>
                        }
                        data={data}
                    />
                </div>
                <div className="text-right flex flex-col gap-3 col-span-3">
                    <div className="font-medium">
                        Gross
                    </div>
                    {
                        payementReceipt.length > 0
                        && 
                        payementReceipt.map((item)=>(
                            <h3>Receipt ({item.date})</h3>
                        ))
                    }
                    {
                        !isFullPaymentDone &&
                        (
                            <>
                                <div>
                                    <h3>Dues</h3>
                                </div>
                                <div className="font-medium">
                                    Due Receivable
                                </div>
                            </>
                        )
                    }
                    
                </div>
                <div className="flex flex-col gap-3 pl-2 pr-2  text-right px-4 ">
                    <div className=" font-medium text-right">
                        {totalAmount == 0 ? '0.00' : totalAmount?.toFixed(2)}
                    </div>
                    {
                        payementReceipt.length > 0
                        && 
                        payementReceipt.map((item)=>(
                            <h3>{item.amount.toFixed(2)}</h3>
                        ))
                    }

                    {/* if isFullPayment is done these boxes will not be shown there will Status Payment done successfully */}

                    {
                        !isFullPaymentDone &&
                        (
                            <>
                                <div className=" font-medium text-right">
                                    {dueAmount == 0 ? '0.00' : dueAmount.toFixed(2)}
                                </div>
                                <div className=" font-bold text-right">
                                    {netAmount?.toFixed(2)}
                                </div>
                            </>

                        )
                    }
                </div>
                <div className="col-span-0">
                </div>
            </div>
            <div className="w-full text-center text-lg font-semibold">No Dues</div>
        </>
        
    )
}