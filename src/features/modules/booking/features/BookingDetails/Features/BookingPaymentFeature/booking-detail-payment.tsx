import { usePayment } from "@/features/modules/booking/contexts/payment-context";
import type { IBooking } from "../../../NewBooking/data/schema";
import { useBookingDetail } from "../../context/booking-detail-context";
import InvoiceFeatureModal from "../../../NewBooking/features/InvoiceFeature/invoice-feature-modal";



export function BookingDetailPayment({data}:{data?:IBooking}){
    const {totalAmount,netAmount,dueAmount,payementReceipt,discountedAmount} = usePayment();
    const {isFullPaymentDone} = useBookingDetail();


    return(
        <>
        <div className="bg-gray-100 grid grid-cols-[1fr_300px_205px] py-3">
            <div className="">
                <div className="px-4">
                    <div className="font-bold">Invoices:</div>
                    <InvoiceFeatureModal
                        button={
                        <span className="text-blue-500 underline underline-offset-1">Payment Invoice</span>
                        }
                        data={data}
                    />
                </div>
            </div>
            <div className="">
                <div className="grid grid-cols-2">
                    <div className="text-right">Gross</div>
                    <div className="text-right">{totalAmount.toFixed(2)}</div>
                </div>
                {
                    discountedAmount != 0
                    &&
                    <div className="grid grid-cols-2">
                        <div className="text-right">Discount</div>
                        <div className="text-right">-{discountedAmount.toFixed(2)}</div>
                    </div>
                }
                {
                    payementReceipt.length > 0 &&
                    payementReceipt.map((item,index)=>(
                        <div key={index} className="grid grid-cols-2">
                            <div className="text-right">Receipt ({item.date})</div>
                            <div className="text-right">{item.amount.toFixed(2)}</div>
                        </div>
                    ))
                   
                }
                {
                    !isFullPaymentDone &&
                    (
                        <>
                            {
                            dueAmount != 0 &&
                            <div className="grid grid-cols-2">
                                <div className="text-right">Dues</div>
                                <div className="text-right">{dueAmount.toFixed(2)}</div>
                            </div>
                            }

                            <div className="grid grid-cols-2">
                                <div className="text-right">Due Receivable</div>
                                <div className="text-right">{netAmount.toFixed(2)}</div>
                            </div>
                        </>
                    )
                }
             
            </div>
            <div className=""></div>
        </div>

        </>
        
    )
}