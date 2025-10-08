import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {  useState } from "react";
import { InvoicesFeature } from "./invoice-feature";

interface InvoiceModalInterface{
    button: React.ReactElement | string,
    action?: string,
}


const InvoiceFeatureModal: React.FC<InvoiceModalInterface> = ({button,action}) => {
    const [open,setOpen] = useState<boolean>(false);

    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    {button}
                </DialogTrigger>

                <DialogContent className="min-w-7xl h-screen">
                    <DialogHeader>
                        <DialogTitle>{action ?? "Invoice"}</DialogTitle>
                        <DialogDescription className="hidden">
                            Invoice
                        </DialogDescription>
                    </DialogHeader>
                    <>
                        <InvoicesFeature/>
                    </>
                </DialogContent>
            </Dialog>
        </>
    )
}


export default InvoiceFeatureModal;