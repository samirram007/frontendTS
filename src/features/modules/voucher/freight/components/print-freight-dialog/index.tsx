import { Button } from "@/components/ui/button";
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Dialog } from "@radix-ui/react-dialog"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useRef } from "react";
import type { FreightSchema } from "../../data/schema";
import { date_format } from '../../../../../../utils/removeEmptyStrings';
//import type { boolean } from "zod";
import { numberToWords } from "@/utils/helper";


type Props = {
    open: boolean
    onOpenChange: (open: boolean) => void
    freightData: FreightSchema

}

const PrintFreightDialog = (props: Props) => {
    const printRef = useRef<HTMLDivElement>(null);
    const { open, onOpenChange, freightData } = props;

    const handleOnClick = () => {
        // onOpenChange(false);
        if (printRef.current) {
            const printContent = printRef.current.innerHTML;
            //const originalContent = document.body.innerHTML;

            document.body.innerHTML = printContent;
            // new window for printing

            window.print();
            // document.body.innerHTML = originalContent;

            window.location.reload();
        }


    }
    return (
        <Dialog open={open}
            onOpenChange={(state) => { onOpenChange(state) }} >
            <DialogTrigger asChild>

                <div className=' ' title='Print Freight'  ></div>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[64rem]'>
                <DialogHeader className='text-left border-b-2 pb-2'>
                    <VisuallyHidden>
                        <DialogTitle>Freight Receipt</DialogTitle>
                    </VisuallyHidden>
                    <DialogDescription>
                        <div onClick={() => onOpenChange(false)}>
                            Print Freight Receipt
                        </div>
                    </DialogDescription>
                </DialogHeader>
                <div ref={printRef} className='mx-auto max-h-[750px] w-[900px] 
                h-full grid  grid-rows-[auto_1fr_150px]
                 text-xl font-monospace  ' >

                    <div className="x-header">


                        <div className="text-center text-4xl">{freightData?.company?.name}</div>
                        <div className="text-center font-semibold underline underline-offset-4 decoration-2 decoration-blue-700">Freight Receipt</div>
                        <div className="grid grid-cols-2">
                            <div>
                                <span>Voucher No:</span> <span className="underline decoration-dotted underline-offset-4 "> {freightData?.voucherNo}</span>
                            </div>
                            <div className="flex justify-end">
                                Voucher Date: <span className="underline decoration-dotted underline-offset-4 "> {date_format(freightData?.voucherDate)}</span>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 ">
                            <div className="flex gap-2">
                                <span>Dl. No.:</span> <span className="underline decoration-dotted underline-offset-4 "> {freightData?.referenceNo}</span>
                            </div>
                            <div className="flex justify-end gap-2">
                                <span>Dl. Date:</span> <span className="underline decoration-dotted underline-offset-4 "> {date_format(freightData?.referenceDate!)}</span>
                            </div>
                        </div>
                    </div>
                    <div className="x-body mt-16 grid grid-cols-[1fr_200px] gap-6">
                        <div className="grid  gap-4">

                            <div className="grid grid-cols-[auto_1fr] items-start  gap-4">

                                <div>Received with thanks from</div>
                                <div className="border-b-2 border-y-zinc-400 border-dotted text-xl">
                                    <span className="px-4"></span>{freightData?.partyLedger?.name}</div>

                            </div>
                            <div className="grid grid-cols-1 gap-4 border-dotted">

                                <div className="italic space-y-8 underline decoration-2 decoration-dotted text-justify underline-offset-8">{freightData?.remarks}</div>
                            </div>
                            <div>

                                <div className="border-b-2 border-zinc-900 border-dotted italic"><span>Rupees </span> {numberToWords(freightData?.amount!)}</div>
                            </div>
                            <div className="text-right">
                                Total:
                            </div>
                        </div>
                        <div>
                            <div className="grid grid-cols-1 border-gray-900! border-2 text-center">
                                <div className="border-gray-900 border-b-2 text-center">Amount</div>
                                <div className="grid grid-cols-[1fr_60px]">
                                    <div className="border-gray-900 border-r-2">Rs.</div>
                                    <div className="border-2 text-center">P.</div>
                                </div>
                                <div className="h-26 grid grid-cols-[1fr_60px]   border-gray-900 border-t-2   text-left">
                                    <div className="pl-2 border-gray-900  border-r-2"> {freightData?.amount?.toFixed(0)}</div>
                                    <div className="text-center">
                                        {((freightData?.amount ?? 0) % 1).toFixed(2).split('.')[1]}
                                    </div>

                                </div>
                                <div className="grid grid-cols-[1fr_60px]   border-gray-900 border-t-2   text-right">
                                    <div className="text-left pl-2 border-gray-900 border-r-2">
                                        {freightData?.amount?.toFixed(0)}
                                    </div>
                                    <div className="text-center ">
                                        {((freightData?.amount ?? 0) % 1).toFixed(2).split('.')[1]}
                                    </div>

                                </div>
                            </div>


                        </div>
                    </div>
                    <div className="x-footer h-12 mt-12 grid grid-cols-2">

                        <div className="flex flex-row items-end gap-6">
                            <div className="w-12 h-12 border-2 border-zinc-900"></div>
                            <div className="h-full text-left flex flex-col justify-end">
                                <div className="text-xl">Distributor Signature</div>
                                <div className="h-full text-xs   font-bold">Signature of Drawer</div>
                            </div>
                        </div>
                        <div className="h-full text-xs text-right font-bold flex justify-end items-end">For {freightData?.company?.name}</div>
                    </div>

                </div>
                <DialogFooter>
                    <Button onClick={handleOnClick} className="h-8 focus:bg-black focus:text-white" >

                        Print
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog >
    )
}

export default PrintFreightDialog