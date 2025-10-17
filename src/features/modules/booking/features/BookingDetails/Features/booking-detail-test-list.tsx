import { Badge } from "@/components/ui/badge";
import type { IBooking, IStockJournalEntry } from "../../NewBooking/data/schema";
import { usePayment } from "../../../contexts/payment-context";
import { useBookingDetail } from "../context/booking-detail-context";
import { MdDeleteOutline } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { useJobOderMutation } from "../data/queryOptions";
import { type IJobOrderStoreSchema } from "../data/schema";
import { toast } from "sonner";
import { bookingQueryOptions } from "../../NewBooking/data/queryOptions";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { RefundAlertModal } from "./RefundFeature/RefundAlertModal";
import { PaymentRuleAlertModal } from "./BookingPaymentFeature/payment-rule-alert";

const formatDateForInput = (dateString: string | Date) => {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // months 0-11
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};



function CheckForProcess({item,voucherId}:{item:IStockJournalEntry,voucherId:number}){

    const {mutate} = useJobOderMutation();
    const {bookingDetail} = useBookingDetail();
    const queryClient = useQueryClient();


    const handleJobCollectSmapleOrder = () =>{
        const payload: IJobOrderStoreSchema ={
            stockJournalEntryId: item.id,
            stockItemId: item.stockItemId,
            status: "sample_collected",
            voucher_id: voucherId
        }
        mutate(payload,{
            onSuccess(){
                toast.success("Job Order updated successfully");
                if(bookingDetail?.id){
                    const {queryKey} = bookingQueryOptions(bookingDetail?.id);
                    queryClient.invalidateQueries({queryKey});
                }
                
            }
        })
    }

    return(
        <>
        {
            item.stockItem.isSampleRequired ?
            item.jobOrder?.status && ["sample_collected" , "in_process"].includes(item.jobOrder?.status) ?
                <ConfirmTheTest voucherId={voucherId} item={item} />
               :
             <Button onClick={handleJobCollectSmapleOrder} className="" variant="outline">Collect Specimen</Button>

             :
             <ConfirmTheTest voucherId={voucherId} item={item} />
        }
        
        </>
    )
}

const ConfirmTheTest = ({item,voucherId}:{item:IStockJournalEntry,voucherId:number}) =>{


    const {mutate} = useJobOderMutation();
    const {bookingDetail} = useBookingDetail();
    const queryClient = useQueryClient();
    const navigate = useNavigate();


    const handleConfirmTestSmapleOrder = () =>{
        const payload: IJobOrderStoreSchema ={
            id: item.jobOrder?.id || undefined,
            stockJournalEntryId: item.id,
            stockItemId: item.stockItemId,
            status: "in_process",
            start_date: new Date(item.testDate).toISOString().split('T')[0],
            end_date: new Date(item.reportDate).toISOString().split('T')[0],
            voucher_id: voucherId
        }
        mutate(payload,{
            onSuccess(){
                toast.success("Job Order updated successfully");
                if(bookingDetail?.id){
                    const {queryKey} = bookingQueryOptions(bookingDetail?.id);
                    queryClient.invalidateQueries({queryKey});
                }
                
            }
        })
    }

    const handleReportNavigation = () =>{
        navigate({to: `/transactions/booking/report/${item.jobOrder?.id}`})
    }


    return(
        <>
            {
                item.jobOrder?.status == "in_process" ?
                    <Button onClick={handleReportNavigation} className="" variant="outline">Under Processing</Button>
                :
                 <Button onClick={handleConfirmTestSmapleOrder} className="" variant="outline">Confirm The Test</Button>
            }
        
        </>
    )
}

export function BookingDetailList({data}:{data?:IBooking}){

    const {totalAmount} = usePayment();
    const {isMinimumPaymentDone} = useBookingDetail();


    return(
        <div className="my-4 min-h-[30vh] relative border-2 overflow-hidden border-gray-800 rounded">
                        <div className="grid grid-cols-[60px_1fr_200px_200px_150px_200px] px-3 border-b-1 font-semibold py-2 border-black">
                            <h1>Sl no.</h1>
                            <h1>Test Name</h1>
                            <h1>Test Date</h1>
                            <h1>Reporting Date</h1>
                            <h1 className="text-right pr-2">Amount</h1>
                            <h1 className="text-center">Action</h1>
                        </div>
                        <div className={`overflow-auto h-[30vh] ${data == null ? 'flex justify-center items-center' : ''}`}>
                            {
                                data  ?
                                data.stockJournal.stockJournalEntries.map((item,index)=>(
                                    <div key={index} className="text-sm px-3 border-b-[0px] grid grid-cols-[60px_1fr_200px_200px_150px_200px]  items-center">
                                        <div className="py-2 px-2">
                                            <h1>{++index}</h1>
                                        </div>
                                        <div className="py-2">
                                            <h1>{item.stockItem.name} {item.stockItem.isSampleRequired ? "Sample" : "No Sample"}</h1>
                                        </div>
                                        <div className="py-2">
                                            <input type="date"  id="test-date" defaultValue={formatDateForInput(item.testDate)}  />
                                        </div>
                                        <div className="py-2">
                                            <input type="date"  id="test-date" defaultValue={formatDateForInput(item.reportDate)}  />
                                        </div>
                                        <div className="border-x-2 h-full border-black">
                                            <h1 className="text-right py-2 pr-2">{Number(item.stockItem.standardSellingPrice).toFixed(2)}</h1>
                                        </div>
                                        <div className=" px-2 flex justify-center items-center gap-1 py-2">
                                            {isMinimumPaymentDone ?  <CheckForProcess item={item} voucherId={data.id}  /> : <PaymentRuleAlertModal 
                                                action={
                                                    <Badge className="text-black font-medium shadow-md shadow-gray-300 bg-white" variant="outline">waiting for payment</Badge>
                                                }
                                            /> }
                                            <RefundAlertModal action={
                                                <MdDeleteOutline className="cursor-pointer text-red-500" size={20} />
                                            } />
                                            
                                        </div>
                                    </div>
                                ))
                                :
                                <div>
                                    <h2>No Tests Selected</h2>
                                </div>
                            }
                        </div>
        
                        <div className="border-t-2 sticky bottom-0 left-0 w-full py-2 bg-gray-100 z-50 border-black grid grid-cols-[60px_1fr_200px_200px_150px_200px]">
                            <div className="text-right col-span-4">
                                <h3>Item Total</h3>
                            </div>
                            <div className="border-l-2 pl-2 pr-2 border-x-2` text-right px-4 ">
                                {totalAmount == 0 ? '00.00' : totalAmount?.toFixed(2)}
                            </div>
                            <div className="col-span-0"></div>
                        </div>
                      
                    </div>
    )
}