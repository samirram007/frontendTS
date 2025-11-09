import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import DepartmentSlipDetail from "./department-slip-detail";
import { useState } from "react";
import type { IDepartmentSlipData } from "../../data/schema";


interface DepartmentSlipInterface{
    button: React.ReactElement | string,
    action?: string,
    data?: IDepartmentSlipData
}


const DepartmentSlip: React.FC<DepartmentSlipInterface> = ({button,action,data}) =>{
    const [open,setOpen] = useState<boolean>(false);
    return(
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
                        <DepartmentSlipDetail data={data}/>
                    </>
                </DialogContent>
            </Dialog>
        </>
    )
}



export default DepartmentSlip;