import { useContext, useState } from "react";
// import { ViewAndEditBooking } from "../features/ViewAndEditBooking/ViewAndEditBooking";
import type { ITestItem } from "../data/schema";
import { MdDeleteOutline } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { PathoContext } from "../contexts/PathoContext";
import { AlertAppDialog } from "../shared/components/AlertAppDialog";
// import BookingHeader from "../components/BookingHeader/BookingHeader";
import BookingDetailsHeader from "../features/BookingDetails/Features/booking-details-header";
import { InvoicesFeature } from "../features/NewBooking/features/InvoiceFeature/invoice-feature";
import type { IBooking } from "../features/NewBooking/data/schema";
import { useBookingTest } from "../features/NewBooking/context/new-booking-context";
import { PayAndBookModal } from "../features/NewBooking/features/PaymentFeature/components/PaymentModal";


function TestListView({data}:{data?:IBooking}){
    const {totalAmount} = useContext(PathoContext);
    const [tests,setTests]= useState<ITestItem[]>([]);


    const handleMinusTest = (e:number) =>{
        console.log("Test",e);
    }



    return(
        <div className="my-12 min-h-[30vh] relative border-2 overflow-hidden border-gray-800 rounded">
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
                                            <input type="date"  id="test-date" defaultValue={new Date().toISOString().split('T')[0]}  />
                                        </div>
                                        <div className="py-2">
                                            <input type="date"  id="test-date" defaultValue={new Date().toISOString().split('T')[0]}  />
                                        </div>
                                        <div className="border-x-2 h-full border-black">
                                            <h1 className="text-right py-2 pr-2">{Number(item.stockItem.standardSellingPrice).toFixed(2)}</h1>
                                        </div>
                                        <div className=" px-2 justify-center items-center gap-1 py-2">
                                            {/* <AlertAppDialog name={
                                                <MdDeleteOutline className="cursor-pointer text-red-500" size={20}/>
                                                }
                                                title="Are you absolutely sure?" description="The action cannot be undone"
                                                cancelText="Cancel" submitText="Submit" onSubmit={()=> handleMinusTest(item.id)}
                                            /> */}
                                            {
                                                // Collect Specimen will only work when payment is done
                                              
                                                    // <div className="bg-blue-600 w-full text-center cursor-pointer rounded py-3 px-1.5 text-white text-app-small">Confirm Test</div>
                                                <div className="bg-blue-500 text-center cursor-pointer rounded py-3 px-1.5 text-white text-app-small">Collect Sepcimen</div>
                                            }
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
                                <h3>Amount</h3>
                            </div>
                            <div className="border-l-2 pl-2 pr-2 border-x-2` text-right px-4 ">
                                {totalAmount == 0 ? '00.00' : totalAmount.toFixed(2)}
                            </div>
                            <div className="col-span-0"></div>
                        </div>
                      
                    </div>
    )
}


function TestView({data}:{data?:IBooking}){
    return (
        <div>
            {/* <div className="grid grid-cols-2">
                <div className="grid grid-rows-1 gap-4 text-app-base">
                    <div className="grid grid-cols-[140px_1fr] gap-4">
                        <div className="font-bold">Patient Name:</div>
                        <div className="text-black">{data?.voucherPatient.patient.name}</div>
                    </div>
                </div>
                <div className="grid grid-cols-[80px_1fr]">
                    <div className="font-bold">Discount:</div>
                    <div>Flat 500</div>
                </div>
            </div> */}
            <TestListView data={data}/>
        </div>
      
        
    )
}


function PatientView({data}:{data?:IBooking}){


    return(
         <div className=" text-app-base py-3 px-4">
          <div className="flex items-center gap-2">
            <div className="font-semibold text-lg">Patient Details</div>
          </div>
          <div className="flex justify-between mb-2 gap-3">
            <div className="flex flex-row items-center h-10 w-full gap-3">
              <div className="w-full text-center font-semibold text-lg"><span className="text-gray-900 text-app-base font-medium">{data?.voucherPatient.patient.name}</span></div>
            </div>
          </div>
          <div className="flex justify-center h-9 items-center gap-3">
              <div>
                <span className="text-gray-900 font-medium">{data?.voucherPatient.patient.age}</span>
              </div>
              <div className="border-1 border-black h-full"/>
              <div>
                <span className="text-gray-900 font-medium">{data?.voucherPatient.patient.gender}</span>
              </div>
              <div className="border-1 border-black h-full"/>
              <div>
                <span className="text-gray-900 font-medium">{data?.voucherPatient.patient.contactNo}</span>
              </div>
          </div>
          <div className="flex my-6 py-2 flex-col">
            <div className="flex items-center mb-2 gap-3">
              <div>
                Physician:
              </div>
              <div className="font-semibold">
                <span className="text-gray-900 font-medium">{data?.voucherPatient.physician?.name}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div>
                Referred By:
              </div>
              <div className="font-semibold">
                <span className="text-gray-900 font-medium">{data?.voucherPatient.agent?.name}</span>
              </div>
            </div>
          </div>
        </div>
    )
}


function DiscountView(){
    const [discountAmount,_setDiscountAmount] = useState<number>(0);
    const [discountedAmount,_setDiscountedAmount] = useState<number>(0);
    return(
        <div>
            <div className="grid py-2 grid-cols-2 text-app-base">
                <div className="font-medium">
                Discount Amount
                </div>
                <div className="px-4 font-medium text-right">
                {Number(discountAmount) == 0 ? '0.00' : Number(discountAmount).toFixed(2)}
                </div>
            </div>

            <div className="grid py-2 grid-cols-2 text-app-base">
                <div className="font-medium">
                Discounted Amount
                </div>
                <div className="px-4 font-medium text-right">
                {Number(discountedAmount) == 0 ? '0.00' : Number(discountedAmount).toFixed(2)}
                </div>
            </div>
        </div>
    )
}

function PaymentView(){

    const [totalAmount,_setTotalAmount] = useState<number>(0);
    const [netAmount,_setNetAmount] = useState<number>(0);
    const [dueAmount,_setDueAmount] = useState<number>(0);

    return(
        <div className="px-1">
            <div className="grid py-2 grid-cols-2 text-app-base">
                <div className="font-medium">
                Total Amount
                </div>
                <div className="px-4 font-medium text-right">
                {totalAmount == 0 ? '0.00' : totalAmount.toFixed(2)}
                </div>
            </div>
                <DiscountView/>
            <div className="grid py-2 grid-cols-2 text-app-base">
                <div>
                <h3>Dues</h3>
                </div>
                <div className="px-4 font-medium text-right">
                    {dueAmount == 0 ? '0.00' : dueAmount.toFixed(2)}
                </div>
            </div>

            <div className="grid py-2 mt-3 text-app-base border-t-1 border-b-1 border-dashed border-gray-500 grid-cols-2">
                <div className="font-medium">
                Net Amount
                </div>
                <div className="px-4 font-bold text-right">
                {netAmount.toFixed(2)}
                </div>
            </div>

            
        </div>
    )
}

function PatientBillingDetail({data}:{data?:IBooking}){
    return(
        <div>
            <PatientView data={data}/>
            <PaymentView/>
            <div className="mt-6  w-full">
                <Button  className={`text-center cursor-pointer !py-3 text-lg w-full`}>
                    Pay & Book
                </Button>
            </div>
        </div>
    )
}

interface BookingDetailProps {
    data?: IBooking
}


const BookingDetails:React.FC<BookingDetailProps> = ({data}) => {
    return(
        <div className="py-4 px-4">
            <BookingDetailsHeader data={data} />
             <TestView data={data}/>
            <div className="py-3 pt-10 px-1 gap-4 grid grid-cols-[1fr_430px]">
               
                {/* <PatientBillingDetail data={data}/> */}
            </div>
              <PaymentView/>
            <div className="mt-0 w-full">
                <PayAndBookModal
                    button={
                        <Button  className={`text-center cursor-pointer !py-3 text-lg w-full`}>
                            Pay & Book
                        </Button>
                    }
                />
                
            </div>
            <InvoicesFeature/>
        </div>
    )
}


export default BookingDetails;