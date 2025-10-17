import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {  useState } from "react";
import { InvoicesFeature } from "./invoice-feature";
import type { IBooking } from "../../data/schema";

interface InvoiceModalInterface{
    button: React.ReactElement | string,
    action?: string,
    data?: IBooking
}


const InvoiceFeatureModal: React.FC<InvoiceModalInterface> = ({button,action, data}) => {
    const [open,setOpen] = useState<boolean>(false);

    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    {button}
                </DialogTrigger>

                <DialogContent className="min-w-[800px] max-w-[95vw] max-h-[100vh] overflow-auto">
                    <DialogHeader className="!h-12 hidden">
                        <DialogTitle>{action ?? "Invoice"}</DialogTitle>
                        <DialogDescription className="hidden">
                            Invoice
                        </DialogDescription>
                    </DialogHeader>
                    <>
                        <InvoicesFeature data={data}/>
                    </>
                </DialogContent>
            </Dialog>
        </>
    )
}


export default InvoiceFeatureModal;