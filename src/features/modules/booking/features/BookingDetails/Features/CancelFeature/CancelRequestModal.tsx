import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { X } from "lucide-react";



interface ICancelRequestModal {
    open: boolean,
    setOpen: (open: boolean) => void,
    onTestCancel: (id: number) => void;
    isPending: boolean,
    itemId: number
}



const CancelRequestModal: React.FC<ICancelRequestModal> = ({ open, setOpen, onTestCancel, isPending, itemId }) => {

    return (
        <>
            <AlertDialog onOpenChange={setOpen} open={open}>
                <AlertDialogTrigger asChild>
                    <X className="cursor-pointer text-red-500 hover:text-red-600 transition" size={20} />
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Cancel Test Request?</AlertDialogTitle>
                        <AlertDialogDescription>
                            <p> Are you sure you want to cancel this test request?{" "}</p>
                            <p>Once cancelled, the request will no longer be processed or visible in your pending list.</p>
                            <br />
                            <span className="text-sm text-muted-foreground">
                                This action cannot be undone.
                            </span>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Keep Request</AlertDialogCancel>
                        <AlertDialogAction onClick={(e) => {
                            e.preventDefault();
                            onTestCancel(itemId);
                        }} className="bg-red-600 hover:bg-red-700 text-white">
                            {isPending ? "Wait for process" : "Cancel Test"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}


export default CancelRequestModal;