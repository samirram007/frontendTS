import { Badge } from "@/components/ui/badge";
import type { IBooking } from "../../NewBooking/data/schema";
import { usePayment } from "../../../contexts/payment-context";
import { useBookingDetail } from "../context/booking-detail-context";
import { MdDeleteOutline } from "react-icons/md";

const formatDateForInput = (dateString: string | Date) => {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // months 0-11
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

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
                                            <h1>{item.stockItem.name}</h1>
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
                                            {isMinimumPaymentDone ?  <Badge variant="outline">Ready for process</Badge> : <Badge className="bg-amber-600 text-white" variant="outline">waiting for payment</Badge>}
                                            <MdDeleteOutline className="cursor-pointer text-red-500" size={20} />
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