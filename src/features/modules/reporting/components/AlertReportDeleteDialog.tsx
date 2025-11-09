import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useReportDeleteMutation } from "../data/queryOptions";
import { useState } from "react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";




interface IAlertReportDeleteDialog{
    children:any,
    jobOrderId:number
}



const AlertReportDeleteDialog: React.FC<IAlertReportDeleteDialog> = ({children,jobOrderId}) => {
    const [open,setOpen] = useState<boolean>(false);
    const {mutate} = useReportDeleteMutation();

      const queryClient = useQueryClient();


    const handleDeleteMutation = () =>{
        if(!jobOrderId){
            toast.error("Job order id not selected");
            return;
        }
        mutate(jobOrderId,{
            onSuccess:()=>{
                toast.success("Test Report Deleted successfully");
                setTimeout(() => {
                    setOpen(false);
                }, 800);
                queryClient.invalidateQueries({queryKey:["job_orders_key",jobOrderId]});
            }
        });
    }

    return (
        <>
            <AlertDialog onOpenChange={setOpen} open={open}>
                <AlertDialogTrigger>{children}</AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-red-500">Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your uploaded test report
                            and remove your data from our servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDeleteMutation} >Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}



export default AlertReportDeleteDialog;