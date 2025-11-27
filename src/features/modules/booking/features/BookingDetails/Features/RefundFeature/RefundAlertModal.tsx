import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useRef, useState } from "react";
import { useTestBookingRefundRequestMutation } from "../../data/queryOptions";
import { toast } from "sonner";
import { bookingQueryOptions } from "../../../NewBooking/data/queryOptions";
import { useQueryClient } from "@tanstack/react-query";







export function RefundAlertModal({ action, bookingId, itemId }: { action: string | React.ReactNode, bookingId: number, itemId: number }) {
    const [open, setOpen] = useState<boolean>(false);
    const remarkRef = useRef<HTMLTextAreaElement | null>(null);
    const { mutate, isPending } = useTestBookingRefundRequestMutation();
    const queryClient = useQueryClient();

    const onTestCancellation = () => {
        mutate({ id: itemId, remark: remarkRef.current?.value ?? null }, {
            onSuccess: (data) => {
                toast.success(data.data.message);

                const { queryKey } = bookingQueryOptions(bookingId);
                queryClient.invalidateQueries({ queryKey });
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
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your selected
                        test.
                        <div className="text-red-500 font-medium">
                            The test is being cancelled after payment has already been processed.
                            Kindly provide the reason for cancellation, such as incorrect test selection, customer request, duplicate booking, or operational limitation.
                        </div>
                        <Label className="font-semibold mt-4 mb-2 text-black">Cancellation Reason</Label>
                        <Textarea ref={remarkRef} placeholder="Type your cancellation reason here" />
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Keep Request</AlertDialogCancel>
                    <AlertDialogAction onClick={(e) => {
                        e.preventDefault();
                        onTestCancellation();
                    }} className="bg-red-600 hover:bg-red-700 text-white">
                        {isPending ? "Wait for process" : "Cancel Test"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}