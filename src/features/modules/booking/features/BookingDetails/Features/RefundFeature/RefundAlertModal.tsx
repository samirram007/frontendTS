import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useRef, useState } from "react";
import { useTestBookingRefundRequestMutation } from "../../data/queryOptions";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";







export function RefundAlertModal({ action, bookingNo, cancelRemark, itemId }: { action: string | React.ReactNode, bookingNo: string | null, cancelRemark: string, itemId: number }) {
    const [open, setOpen] = useState<boolean>(false);
    const remarkRef = useRef<HTMLTextAreaElement | null>(null);
    const { mutate, isPending } = useTestBookingRefundRequestMutation();
    const queryClient = useQueryClient();

    console.log("remark", cancelRemark);

    const onTestCancellation = () => {
        mutate({ id: itemId, remark: remarkRef.current?.value ?? null, cancellationRemark: cancelRemark ?? null }, {
            onSuccess: (data) => {
                toast.success(data.data.message);
                queryClient.invalidateQueries({ queryKey: ['cancelled-booking', bookingNo] })
                setTimeout(() => {
                    setOpen(false);
                }, 800);
            }
        })
    }



    return (
        <AlertDialog onOpenChange={setOpen} open={open}>
            <AlertDialogTrigger asChild>
                {action}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Request Approved</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your selected
                        test.
                        <span className="text-red-500 font-medium">
                            The test is being cancelled after payment has already been processed.
                            Kindly provide the reason for cancellation, such as incorrect test selection, customer request, duplicate booking, or operational limitation.
                        </span>
                        <Label className="font-semibold mt-4 mb-2 text-black">Cancellation Reason</Label>
                        <Textarea ref={remarkRef} placeholder="Type your cancellation reason here" />
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={(e) => {
                        e.preventDefault();
                        onTestCancellation();
                    }} className="bg-blue-600 hover:bg-blue-700 text-white">
                        {isPending ? "Wait for process" : "Confirm"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}