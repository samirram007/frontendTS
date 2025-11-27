import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import PaymentSelect from "./PaymentSelect"
import { Button } from "@/components/ui/button";
import BookingAmountDetails from "./booking-amount-details";
import PaymentMethodSelected from "./payment-method-select";
import type { IBooking } from "../../NewBooking/data/schema";
import { PaymentTypeSchema } from "../../NewBooking/features/PaymentFeature/data/schema";
import { useBookingPaymentMutation } from "../data/queryOptions";
import { usePayment } from "../../../contexts/payment-context";
import type { IBookingPaymentSchema } from "../data/schema";
import { useBookingDetail } from "../context/booking-detail-context";
import { ErrorToast } from "../../../utils/error-response";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { bookingQueryOptions } from "../../NewBooking/data/queryOptions";
import { toast } from "sonner";








function PaymentNullScreen() {
    return (
        <div className="w-full h-full flex justify-center items-center">
            <h1>No Payment method selected</h1>
        </div>
    )
}

function createPayload(amount: number, payMethod: PaymentTypeSchema | null, data?: IBooking | null): IBookingPaymentSchema | null {
    const CASH_LEDGER = 1000001;
    const BANK_LEDGER = 1000002;
    if (data) {
        const paymentPayload: IBookingPaymentSchema = {
            voucherId: data.id,
            amount: amount,
            patientId: data.voucherPatient.patientId,
            paymentMode: payMethod === "CASH" ? CASH_LEDGER : BANK_LEDGER
        };
        return paymentPayload;
    }
    return null;
}

interface PayAndBookInterface {
    button: any,
}





export const PayAndBookModal: React.FC<PayAndBookInterface> = ({ button }) => {

    const { paymentMethod, setPaymentMethod, receivingAmount, setReceivingAmount } = usePayment();
    const [open, setOpen] = useState<boolean>(false);
    const { bookingDetail } = useBookingDetail();
    const { mutate, isPending } = useBookingPaymentMutation();
    const { setBookingDetail } = useBookingDetail();
    const queryClient = useQueryClient();

    const handleTransaction = () => {
        const payload = createPayload(Number(receivingAmount), paymentMethod, bookingDetail);
        if (payload == null) {
            return ErrorToast.launchErrorToast("Please select all options for payment");
        }
        mutate(payload, {
            onSuccess: (data) => {
                setBookingDetail(data.data.data);
                const { queryKey } = bookingQueryOptions(data.data.data.id);
                queryClient.invalidateQueries({ queryKey });
                setReceivingAmount('');
                toast.success("Payment done successfully");
                setTimeout(() => {
                    setOpen(false);
                }, 900);
            },
        });
    }

    return (
        <>
            <Dialog open={open} onOpenChange={(value) => {
                setOpen(value);
                setPaymentMethod(PaymentTypeSchema.CASH);
            }}>
                <DialogTrigger asChild>
                    {button}
                </DialogTrigger>
                <DialogContent className="sm:max-w-6/12 min-h-5/12">
                    <DialogHeader>
                        <DialogTitle>Please Select your payment Method!</DialogTitle>
                    </DialogHeader>
                    <div className="grid grid-cols-2">
                        <div className="pr-4s">
                            <h1 className="text-app-base pl-1 font-medium">Select Mode</h1>
                            <PaymentSelect className="w-full text-app-small" />
                            <div className={`min-h-[20vh] py-4 ${paymentMethod == null || paymentMethod == PaymentTypeSchema.CASH ? 'flex justify-center items-center' : ''}`}>
                                {
                                    paymentMethod == null ?
                                        <PaymentNullScreen />
                                        :
                                        <PaymentMethodSelected />
                                }
                            </div>
                        </div>
                        <div>
                            <BookingAmountDetails />
                        </div>
                    </div>
                    <div className="justify-end flex">
                        <Button disabled={isPending} onClick={handleTransaction} className="!bg-green-500 cursor-pointer">
                            {isPending ? "Payment Accepting..." : "Accept Payment"}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}