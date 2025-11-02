import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { useReactToPrint } from "react-to-print";
import type { IBooking } from "../../data/schema";
import { usePayment } from "@/features/modules/booking/contexts/payment-context";
import { useAuth } from "@/features/auth/contexts/AuthContext";
import { numberToWords } from "./data/actions";



interface IInvoiceFeature {
    data?: IBooking
}



function convertDateToGBFormat(date: Date) {
    const today = new Date(date);

    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = String(today.getFullYear()).slice(-2);

    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate;
}


export function InvoicesFeature({ data }: IInvoiceFeature) {


    const { payementReceipt ,totalAmount, discountedAmount, netAmount} = usePayment();
    const { user } = useAuth();

    const printRef = useRef<HTMLDivElement>(null);

    const totalStandardSellingPrice = data?.stockJournal.stockJournalEntries
        .reduce((sum, item) => sum + Number(item.stockItem.standardSellingPrice ?? 0), 0);

    const handlePrint = useReactToPrint({
        contentRef: printRef,
        pageStyle: `
        @page {
            size: A5 landscape;
            margin: 6mm;
        }
         body {
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
      font-family: "Arial", sans-serif;
      font-size: 12px;
    }

    h1, h2, h3 {
      margin: 0;
      padding: 0;
    }

    .grid {
      display: grid;
      gap: 2px;
    }

    .text-center { text-align: center; }
    .text-right { text-align: right; }

    .avoid-break {
      page-break-inside: avoid;
    }

    @media print {
    .print-footer {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
    }

    .invoice-body {
        max-height: calc(100vh - 100px); /* leave space for header/footer */
        overflow: visible !important;
    }

    button, .no-print {
     display: none !important;
    }

    .print-container {
        box-shadow: none !important;
        border: none !important;
    }
    }
        `,
    });


    return data != null ? (
        <div className="overflow-hidden relative">
            <h1 className="text-center font-semibold">Invoice</h1>

            <div ref={printRef} className="print-container relative border-2 px-2 bg-white">
                {/* HEADER */}
                <div className="border-black border-b-2 w-full py-2">
                    <img src="/invoicelogo.jpg" alt="Logo" className="h-12 w-full" />
                    {/* Optional company name, etc */}
                </div>

                {/* BODY */}
                <div className="invoice-body overflow-auto" style={{ maxHeight: '60vh' }}>
                    {/* Patient details */}
                    <div className="grid grid-cols-2 mb-1 text-sm">
                        {/* Left column */}
                        <div>
                            <div className="grid grid-cols-[110px_1fr]">
                                <h1>Patient</h1>
                                <h1>: {data?.voucherPatient.patient.name}</h1>
                            </div>
                            <div className="grid grid-cols-2">
                                <div className="grid grid-cols-[110px_1fr]">
                                    <h1>Gender</h1>
                                    <h1>: {data?.voucherPatient.patient.gender}</h1>
                                </div>
                                <div className="grid grid-cols-[60px_1fr]">
                                    <h1>Age</h1>
                                    <h1>: {data?.voucherPatient.patient.age}</h1>
                                </div>
                            </div>
                            <div className="grid grid-cols-[110px_1fr]">
                                <h1>Address</h1>
                                <h1>: {data?.voucherPatient.patient.address?.line1}</h1>
                            </div>
                            <div className="grid grid-cols-[110px_1fr]">
                                <h1>Ref. By Dr.</h1>
                                <h1>: {data?.voucherPatient.physician?.name}</h1>
                            </div>
                        </div>
                        {/* Right column */}
                        <div>
                            <div className="grid grid-cols-[140px_1fr]">
                                <h1>Booking Id</h1>
                                <h1>: {data?.voucherNo}</h1>
                            </div>
                            <div className="grid grid-cols-[140px_1fr]">
                                <h1>Booking Date</h1>
                                <h1>: {new Date(data?.voucherDate).toDateString()}</h1>
                            </div>
                            <div className="grid grid-cols-[140px_1fr]">
                                <h1>Collection Type</h1>
                                <h1>: InHouse</h1>
                            </div>
                        </div>
                    </div>

                    {/* Money Receipt / Table */}
                    <div className="my-1 font-bold text-center underline underline-offset-1">
                        Money Receipt
                    </div>
                    <div className="table-container text-[12px]">
                        {/* Table header */}
                        <div className="border-b-2 flex border-black bg-gray-100">
                            <div className="w-[5%] text-left">Sl No</div>
                            <div className="w-[28%] text-left">Test</div>
                            <div className="w-[15%] text-left">Test Date</div>
                            <div className="w-[15%] text-left">Report Date</div>
                            <div className="w-[10%] text-right">Rate</div>
                            <div className="w-[10%] text-right">Disc(%)</div>
                            <div className="w-[15%] text-right">Amount (INR)</div>
                        </div>
                        {/* Table rows */}
                        {data?.stockJournal.stockJournalEntries.map((item, index) => (
                            <div key={index} className="border-b flex border-gray-400">
                                <div className="w-[5%] px-2">{index + 1}</div>
                                <div className="w-[28%] text-[11px] px-2">{item.stockItem.name}</div>
                                <div className="w-[15%] px-2">{convertDateToGBFormat(item.testDate)}</div>
                                <div className="w-[15%] px-2">{convertDateToGBFormat(item.reportDate)}</div>
                                <div className="w-[10%] text-right px-2">{item.stockItem.standardSellingPrice}</div>
                                <div className="w-[10%] text-right px-2">0.00</div>
                                <div className="w-[15%] text-right px-2">{item.stockItem.standardSellingPrice}</div>
                            </div>
                        ))}
                    </div>

                    {/* Totals */}
                    <div className="w-full flex justify-end mt-2 text-xs">
                        <div className="w-[100%]">
                            <div className="grid grid-cols-[1fr_120px]">
                                <div className="text-right font-medium">Gross Amount</div>
                                <div className="text-right">{totalStandardSellingPrice?.toFixed(2)}</div>
                            </div>
                            {payementReceipt.map((item,index) => (
                                <div key={index} className="grid grid-cols-[1fr_120px]">
                                    <div className="text-right font-medium">Receipt ({item.date})</div>
                                    <div className="text-right">{item.amount.toFixed(2)}</div>
                                </div>
                            ))}
                            <div className="grid grid-cols-[1fr_120px]">
                                <div className="text-right font-medium">Less Discount</div>
                                <div className="text-right">{discountedAmount.toFixed(2)}</div>
                            </div>
                            <div className="grid grid-cols-[1fr_120px]">
                                <div className="text-right font-semibold">Invoice Total</div>
                                <div className="text-right">{netAmount?.toFixed(2)}</div>
                            </div>
                            <div className="grid grid-cols-[1fr_120px]">
                                <div className="text-right font-semibold">Cash Receipt</div>
                                <div className="text-right">{totalStandardSellingPrice?.toFixed(2)}</div>
                            </div>
                            <div className="w-full flex justify-between border-t-2 border-black">
                                <div className="font-semibold">
                                    {numberToWords(totalAmount)}
                                </div>
                                <div className="grid grid-cols-[1fr_120px]">
                                    <div className="text-right font-semibold">Net Receipt</div>
                                    <div className="text-right">{totalStandardSellingPrice?.toFixed(2)}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* FOOTER */}
                <div className="print-footer text-center text-[10px] mt-2">
                    <div className="font-bold">Printed By: {user?.name}</div>
                    <div className="font-semibold border-t-2 border-black">Rabindra Complex, Bamongola More, Gazole, Malda, 733124, Contact-9775991010</div>
                </div>
            </div>

            <div className="flex mt-2 no-print justify-center">
                <Button variant={'default'} onClick={handlePrint}>
                    Print Invoice
                </Button>
            </div>
        </div>
    )
        :
        <>No Invoice Generate Yet</>

}