import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { useReactToPrint } from "react-to-print";
import type { IBooking } from "../../data/schema";
import { usePayment } from "@/features/modules/booking/contexts/payment-context";

const companyName = import.meta.env.VITE_APP_PATHO_CENTER_NAME;


interface IInvoiceFeature{
    data?: IBooking
}


export function InvoicesFeature({data}:IInvoiceFeature){

    const {payementReceipt} = usePayment();
    
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

    table {
      border-collapse: collapse;
      width: 100%;
      font-size: 12px;
    }

    th, td {
      border: 1px solid #000;
      padding: 4px 6px;
      text-align: left;
    }

    th {
      background-color: #f5f5f5 !important;
      font-weight: bold;
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
    .print-footer {
        position: absolute;
        bottom: 4mm;
        left: 0;
        width: 100%;
        text-align: center;
        font-size: 10px;
        font-style: italic;
        color: #444;
    }

    @media print {
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
        <div>
            <h1 className="text-center font-semibold">Invoice</h1>

            <div ref={printRef} className="print-container  border-2 relative px-2 bg-white">
                <div className="border-black border-b-2 mb-2">
                    <h1 className="font-bold text-lg text-center">{companyName}</h1>
                    <h2 className="font-bold text-sm text-center">Contact No:{' '}<span className="font-normal">{data.voucherPatient.patient.contactNo}</span></h2>
                </div>
                <div className="grid grid-cols-2 mb-1 text-base">
                    <div>
                        <div className="grid grid-cols-[110px_1fr]">
                            <h1>Patient</h1>
                            <h1>:{' '}{data?.voucherPatient.patient.name}</h1>
                        </div>
                        <div className="grid grid-cols-2">
                            <div className="grid grid-cols-[110px_1fr]">
                                <h1>Gender</h1>
                                <h1>:{' '}{data?.voucherPatient.patient.gender}</h1>
                            </div>
                            <div className="grid grid-cols-[60px_1fr]">
                                <h1>Age</h1>
                                <h1>:{' '}{data?.voucherPatient.patient.age}</h1>
                            </div>
                        </div>
                        <div className="grid grid-cols-[110px_1fr]">
                            <h1>Address</h1>
                            <h1>:{' '}{data?.voucherPatient.address?.line1}</h1>
                        </div>
                        <div className="grid grid-cols-[110px_1fr]">
                            <h1>Ref. By Dr.</h1>
                            <h1>:{' '}{data?.voucherPatient.physician?.name}</h1>
                        </div>
                    </div>
                    <div>
                        <div className="grid grid-cols-[140px_1fr]">
                            <h1>Booking Id</h1>
                            <h1>:{' '}{data?.voucherNo}</h1>
                        </div>
                        <div className="grid grid-cols-[140px_1fr]">
                            <h1>Booking Date</h1>
                            <h1>:{' '}{new Date(data?.voucherDate).toDateString()}</h1>
                        </div>
                        <div className="grid grid-cols-[140px_1fr]">
                            <h1>Collection Type</h1>
                            <h1>:{' '}InHouse</h1>
                        </div>
                    </div>
                </div>
                <div className="my-1 font-bold text-center underline underline-offset-1">Money Receipt</div>
                <div className="my-6 avoid-break">
                    <table className="w-full border-collapse text-xs">
                        <thead>
                            <tr className="border-b-2 border-black bg-gray-100">
                                <th className="w-[8%] text-left px-1">Sl No</th>
                                <th className="w-[25%] text-left px-1">Test</th>
                                <th className="w-[15%] text-left px-1">Test Date</th>
                                <th className="w-[15%] text-left px-1">Report Date</th>
                                <th className="w-[10%] text-right px-1">Rate</th>
                                <th className="w-[10%] text-right px-1">Disc(%)</th>
                                <th className="w-[15%] text-right px-1">Amount (INR)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.stockJournal.stockJournalEntries.map((item, index) => (
                                <tr key={index} className="border-b border-gray-400">
                                <td className="px-2 py-1">{index + 1}</td>
                                <td className="px-2 py-1">{item.stockItem.name}</td>
                                <td className="px-2 py-1">{new Date().toDateString()}</td>
                                <td className="px-2 py-1">{new Date().toDateString()}</td>
                                <td className="text-right px-2 py-1">{item.stockItem.standardSellingPrice}</td>
                                <td className="text-right px-2 py-1">0.00</td>
                                <td className="text-right px-2 py-1">{item.stockItem.standardSellingPrice}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
             <div className="w-full mt-4 flex justify-end avoid-break">
            <table className="w-[40%] text-sm">
                <tbody>
                <tr>
                    <td className="py-1 px-2 font-medium text-right">Gross Amount:</td>
                    <td className="py-1 px-2 text-right">{totalStandardSellingPrice?.toFixed(2)}</td>
                </tr>
                {
                    payementReceipt.length >0
                    && 
                    payementReceipt.map((item)=>(
                        <tr>
                            <td className="py-1 px-2 font-medium text-right">Receipt ({item.date})</td>
                            <td className="py-1 px-2 text-right">{item.amount.toFixed(2)}</td>
                        </tr>
                    ))
                }
                <tr>
                    <td className="py-1 px-2 font-medium text-right">Less Discount:</td>
                    <td className="py-1 px-2 text-right">0.00</td>
                </tr>
                <tr>
                    <td className="py-1 px-2 font-semibold border-t border-black text-right">Invoice Total:</td>
                    <td className="py-1 px-2 text-right border-t border-black">{totalStandardSellingPrice?.toFixed(2)}</td>
                </tr>
                <tr>
                    <td className="py-1 px-2 font-medium text-right">Cash Receipt:</td>
                    <td className="py-1 px-2 text-right">{totalStandardSellingPrice?.toFixed(2)}</td>
                </tr>
                </tbody>
            </table>
            </div>
                <div className="w-full border-t-2 py-4 border-black grid grid-cols-2">
                    <div className="">Rupees One thousand three hundred twenty one</div>
                    <div className="w-full flex justify-end">
                        <div className="w-[350px] space-y-1">
                            <div className="grid grid-cols-[140px_1fr]">
                                <h1>Net Receipt:</h1>
                                <h1 className="text-right">{totalStandardSellingPrice?.toFixed(1)}</h1>
                            </div>
                        </div>
                    </div>
                   
                </div>
                <div className="print-footer">
                    <h1>Printed By: Priyanshu Chourasia</h1>
                </div>
            </div>

            <div className="flex no-print justify-center mt-10">
                <Button onClick={handlePrint}>
                    Print Invoice
                </Button>
            </div>
        </div>
    )
    :
    <>No Invoice Generate Yet</>

}