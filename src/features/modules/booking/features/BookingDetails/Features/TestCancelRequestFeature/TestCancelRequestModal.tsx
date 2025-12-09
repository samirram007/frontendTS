import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useRef, useState } from "react";
import { useTestCancellation } from "../../data/queryOptions";
import { toast } from "sonner";
import { bookingQueryOptions } from "../../../NewBooking/data/queryOptions";
import { useQueryClient } from "@tanstack/react-query";
import { TestCancellationStatus } from "../../data/schema";







export function TestCancelRequestModal({ action, bookingId, itemId }: { action: string | React.ReactNode, bookingId: number, itemId: number }) {
    const [open, setOpen] = useState<boolean>(false);
    const remarkRef = useRef<HTMLTextAreaElement | null>(null);
    const { mutate, isPending } = useTestCancellation();
    const queryClient = useQueryClient();

    const onTestCancellation = () => {
        mutate({ stockJournalEntryId: itemId, remarks: remarkRef.current?.value ?? null, status: TestCancellationStatus.CancellationRequest }, {
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
                    <AlertDialogTitle>Test Cancellation Request</AlertDialogTitle>
                    <AlertDialogDescription>
                        <div className="text-red-500 font-medium">
                            This test is being cancelled after payment has already been processed.
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
                        {isPending ? "Wait for process" : "Request Cancellation"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}