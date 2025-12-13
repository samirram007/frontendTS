import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { X } from "lucide-react";
import { useBookingDetail } from "../../context/booking-detail-context";
import { useRef, useState } from "react";
import { bookingQueryOptions } from "../../../NewBooking/data/queryOptions";
import { useTestBookingCancelMutation } from "../../data/queryOptions";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useNavigate } from "@tanstack/react-router";



interface ICancelRequestModal {
    itemId: number,
    bookingId: number
}




const CancelRequestModal: React.FC<ICancelRequestModal> = ({ itemId, bookingId }) => {
    const [open, setOpen] = useState<boolean>(false);
    const remarkRef = useRef<HTMLTextAreaElement | null>(null);
    const { mutate, isPending } = useTestBookingCancelMutation();
    const queryClient = useQueryClient();
    const { bookingDetail } = useBookingDetail();
    const navigate = useNavigate();


    const onTestCancellation = () => {
        mutate({ id: itemId, remark: remarkRef.current?.value ?? null, cancellationRemark: null }, {
            onSuccess: (data) => {
                toast.success(data.data.message);

                if (bookingDetail && bookingDetail?.stockJournal.stockJournalEntries.length > 1) {
                    const { queryKey } = bookingQueryOptions(bookingId);
                    queryClient.invalidateQueries({ queryKey });
                }
                else {
                    navigate({ to: '/transactions/booking', replace: true });
                }

                setTimeout(() => {
                    setOpen(false);
                }, 800);
            }
        })
    }



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
                            Test Booking cancellation
                        </AlertDialogDescription>
                        <div>
                            <div>
                                Are you sure you want to cancel this test request?
                            </div>
                            <div>
                                Once cancelled, this request will no longer be processed or appear in your booking list.
                            </div>

                            {bookingDetail?.stockJournal.stockJournalEntries.length === 1 && (
                                <>
                                    <div className="text-red-500 font-medium">
                                        This is the only remaining test item in this booking.
                                        Cancelling it will also void the associated booking.
                                    </div>
                                    <Label className="font-semibold mt-4 mb-2 text-black">Cancellation Reason</Label>
                                    <Textarea ref={remarkRef} placeholder="Type your cancellation reason here" />
                                </>

                            )}
                            <br />
                            <span className="text-sm text-muted-foreground">
                                This action is permanent and cannot be undone.
                            </span>
                        </div>
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
        </>
    )
}


export default CancelRequestModal;