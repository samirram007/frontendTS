import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import PaymentSelect from "./PaymentSelect"
import { Button } from "@/components/ui/button";
import BookingAmountDetails from "./booking-amount-details";
import PaymentMethodSelected from "./payment-method-select";
import type { IBooking } from "../../NewBooking/data/schema";
import { PaymentTypeSchema } from "../../NewBooking/features/PaymentFeature/data/schema";
import { paymentDetailVoucher, useBookingPaymentMutation, useGetPaymentDetailVoucher } from "../data/queryOptions";
import { usePayment } from "../../../contexts/payment-context";
import type { IBookingPaymentSchema } from "../data/schema";
import { useBookingDetail } from "../context/booking-detail-context";
import { ErrorToast } from "../../../utils/error-response";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { bookingQueryOptions } from "../../NewBooking/data/queryOptions";
import { toast } from "sonner";
import { BookingRefundDetail } from "./booking-refund-detail";








function PaymentNullScreen() {
    return (
        <div className="w-full h-full flex justify-center items-center">
            <h1>No Payment method selected</h1>
        </div>
    )
}

function createPayload(amount: number, data?: IBooking | null, transactionNo?: string | null): IBookingPaymentSchema | null {
    const CASH_LEDGER = 1000001;
    const BANK_LEDGER = 1000002;
    if (data) {
        if (transactionNo) {
            const paymentPayload: IBookingPaymentSchema = {
                voucherId: data.id,
                voucherTypeId: 1001,
                amount: amount,
                patientId: data.voucherPatient.patientId,
                paymentMode: BANK_LEDGER,
                transactionNo: transactionNo
            };
            return paymentPayload;
        }
        else {
            const paymentPayload: IBookingPaymentSchema = {
                voucherId: data.id,
                voucherTypeId: 1003,
                amount: amount,
                patientId: data.voucherPatient.patientId,
                paymentMode: CASH_LEDGER,
            };
            return paymentPayload;
        }
    }
    return null;
}

interface PayAndBookInterface {
    button: any,
}





export const PayAndBookModal: React.FC<PayAndBookInterface> = ({ button }) => {

    // states
    const [open, setOpen] = useState<boolean>(false);
    const [receivingAmount, setReceivingAmount] = useState<string>("");
    const [fullPaymentDone, setFullPaymentDone] = useState<boolean>(true);
    const [isRefund, setIsRefund] = useState<boolean>(false);
    const [totalAmount, setTotalAmount] = useState<number>(0);
    const [refundAmount, setRefundAmount] = useState<number>(0);
    const [discountAmount, setDiscountAmount] = useState<number>(0);
    const [amountPaid, setAmountPaid] = useState<number>(0);
    const [remainingAmount, setRemainingAmount] = useState<number>(0);

    const { paymentMethod, setPaymentMethod, transactionNo } = usePayment();
    const { bookingDetail } = useBookingDetail();
    const { mutate, isPending } = useBookingPaymentMutation();

    const { data, isSuccess } = useGetPaymentDetailVoucher(bookingDetail?.id ?? 0);

    const { setBookingDetail } = useBookingDetail();
    const queryClient = useQueryClient();

    const handleTransaction = () => {
        const payload = createPayload(Number(receivingAmount), bookingDetail, transactionNo);
        if (payload == null) {
            return ErrorToast.launchErrorToast("Please select all options for payment");
        }
        mutate(payload, {
            onSuccess: (data) => {
                setBookingDetail(data.data.data);
                const { queryKey } = bookingQueryOptions(data.data.data.id);
                queryClient.invalidateQueries({ queryKey });
                const { queryKey: paymentKey } = paymentDetailVoucher(data.data.data.id);
                queryClient.invalidateQueries({ queryKey: paymentKey })
                setReceivingAmount('');
                toast.success("Payment done successfully");
            },
        });
    }



    useEffect(() => {
        if (isSuccess) {
            const totalAmount = Number(data.data.data.voucherEntries?.at(-1)?.debit);
            setTotalAmount(totalAmount);
            const amountPaid = data.data.data.voucherReferences?.reduce((acc, ref) => {
                const entries = ref.voucher?.voucherEntries ?? []

                if (entries[0].accountLedgerId === 3000005) {
                    return acc;
                }

                const voucherTotal = entries.reduce(
                    (sum, e) => sum + Number(e.debit),
                    0
                )
                return acc + voucherTotal
            }, 0) ?? 0
            setAmountPaid(amountPaid);
            const remainingAmount = totalAmount - amountPaid;
            setRemainingAmount(remainingAmount);

            const refundAmount = data.data.data.voucherReferences?.reduce((acc, ref) => {
                const entries = ref.voucher?.voucherEntries ?? []

                if (entries[0].accountLedgerId != 3000005) {
                    return acc;
                }
                const total = Number(entries[entries.length - 1].credit);
                return acc + total

            }, 0) ?? 0;

            setRefundAmount(refundAmount);

            const refundDiscountAmount = data.data.data.voucherReferences?.reduce((acc, ref) => {
                const entries = ref.voucher?.voucherEntries ?? []

                if (entries[0].accountLedgerId != 3000005) {
                    return acc;
                }
                const total = Number(entries[1].credit);
                return acc + total

            }, 0) ?? 0;

            setDiscountAmount(refundDiscountAmount);

            if (refundAmount > 0) {
                setIsRefund(true);
            } else {
                setIsRefund(false);
            }

            if (remainingAmount === 0) {
                setFullPaymentDone(true);
            } else if (remainingAmount > 0) {
                setFullPaymentDone(false);
            }
        }
    }, [isSuccess, data]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setOpen(false);
        }, 360000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <Dialog open={open} onOpenChange={(value) => {
                setOpen(value);
                setPaymentMethod(PaymentTypeSchema.CASH);
            }}>
                <DialogTrigger asChild>
                    {button}
                </DialogTrigger>
                <DialogContent className="sm:max-w-8/12 min-h-6/12">
                    <DialogHeader>
                        <DialogTitle>Please process your payment</DialogTitle>
                    </DialogHeader>
                    <div className={`grid ${isRefund ? "grid-cols-3" : "grid-cols-2"}`}>
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
                            <BookingAmountDetails
                                totalAmount={totalAmount}
                                amountPaid={amountPaid}
                                remainingAmount={remainingAmount}
                                refundAmount={refundAmount}
                            />
                            {
                                !fullPaymentDone && (
                                    <div className="my-4 flex justify-end items-center">
                                        <div>
                                            <input
                                                onChange={(e) => setReceivingAmount(e.target.value)}
                                                value={receivingAmount}
                                                type="text"
                                                className="w-28 px-2 py-1 rounded-md"
                                                placeholder="Enter amount"
                                            />
                                        </div>
                                    </div>
                                )
                            }

                        </div>
                        {
                            isRefund && (
                                <div>
                                    <BookingRefundDetail
                                        totalAmount={totalAmount}
                                        refundAmount={refundAmount}
                                        discountAmount={discountAmount}
                                    />
                                </div>
                            )
                        }

                    </div>
                    <div className="justify-end flex">
                        {
                            !fullPaymentDone &&
                            <Button disabled={isPending} onClick={handleTransaction} className="!bg-green-500 cursor-pointer">
                                {isPending ? "Payment Accepting..." : "Accept Payment"}
                            </Button>
                        }

                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}