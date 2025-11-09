import { usePayment } from "@/features/modules/booking/contexts/payment-context";
import type { IBooking,  } from "../../../NewBooking/data/schema";
import { useBookingDetail } from "../../context/booking-detail-context";
import InvoiceFeatureModal from "../../../NewBooking/features/InvoiceFeature/invoice-feature-modal";
import DepartmentSlip from "../DepartmentSlip";
import { useEffect, useState } from "react";
import type { IDepartmentData, IDepartmentSlipData } from "../../data/schema";
import { formatDateMonthYearForInput } from "@/features/modules/booking/utils/date-utils";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";



export function BookingDetailPayment({data}:{data?:IBooking}){
    const {totalAmount,netAmount,dueAmount,payementReceipt,discountedAmount} = usePayment();
    const {isFullPaymentDone} = useBookingDetail();
    const [departmentSlipData,setDepartmentSlipData] = useState<IDepartmentSlipData[]>([]);


    useEffect(() => {
        if (!data?.stockJournal?.stockJournalEntries) return;

        const entries = data.stockJournal.stockJournalEntries;

        const categories = Array.from(new Set(entries.map((item) => item.stockItem?.stockCategoryId))).filter(Boolean);

        const result: IDepartmentSlipData[] = categories.map((catId) => {
            const bookings = entries.filter((item) => item.stockItem?.stockCategoryId === catId);

            const departmentData: IDepartmentData[] = bookings.map((book) => ({
                stockItem: book.stockItem,
                stockCategory: book.stockItem.stockCategory,
                voucherNo: data.voucherNo,
                testDate: book.testDate,
                reportDate: book.reportDate,
                voucherDate: data.voucherDate,
                voucherPatient: data.voucherPatient,
            }));

            return {
            categoryName: bookings[0]?.stockItem?.stockCategory?.name ?? "Unknown Category",
            data: departmentData,
            };
        });

        setDepartmentSlipData(result);


    }, [data]);

    console.log("deparment slip data",departmentSlipData);


    return(
        <>
        <div className="bg-gray-100 grid grid-cols-[1fr_300px_205px] py-3">
            <div className="">
                <div className="px-4 mb-4">
                    <div className="font-bold mb-2">Invoices:</div>
                    <InvoiceFeatureModal
                        button={
                            <Button className="border-2 border-gray-300 hover:bg-gray-300 cursor-pointer bg-gray-100">
                                <Printer size={22} className="text-gray-700" /><span className="text-gray-600 ">Payment Invoice</span>
                            </Button>
                        
                        }
                        data={data}
                    />
                </div>
                <div className="px-4">
                    <div className="font-bold mb-2">Department Slip(s):</div>
                    <div className="flex items-center gap-5">
                        {
                            departmentSlipData && departmentSlipData.map((department,index)=>(
                                <div key={index}>
                                    <DepartmentSlip
                                        button={
                                        <Button className="border-2 border-gray-300 hover:bg-gray-300 cursor-pointer bg-gray-100">
                                <Printer size={22} className="text-gray-700" /><span className="text-gray-600 ">{department.categoryName} Slip</span>
                            </Button>
                                        }
                                        data={department}
                                    />
                                </div>
                                
                            ))
                        }
                    </div>
               
                    
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
                            <div className="text-right">Receipt ({formatDateMonthYearForInput(item.date)})</div>
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