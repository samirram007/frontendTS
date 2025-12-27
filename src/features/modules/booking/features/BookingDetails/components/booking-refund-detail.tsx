import { Button } from "@/components/ui/button"


interface IBookingRefund {
    totalAmount: number,
    refundAmount: number,
    discountAmount: number
}



export const BookingRefundDetail: React.FC<IBookingRefund> = ({ totalAmount, refundAmount, discountAmount }) => {
    return (
        <div className="">
            <h1 className="underline underline-offset-1 font-bold">Refund Details</h1>
            <div className="px-6 mb-4">
                <div className="grid grid-cols-[200px_1fr] items-center mb-1">
                    <div className="font-medium">Gross Amount</div>
                    <div className="text-right text-base font-bold">{totalAmount > 0 ? totalAmount.toFixed(2) : '0.00'}</div>
                </div>
                <div className="grid grid-cols-[200px_1fr]">
                    <div className="font-medium">Discounted Amount</div>
                    <div className="text-right text-base font-bold">{discountAmount > 0 ? discountAmount.toFixed(2) : '0.00'}</div>
                </div>
                <div className="grid grid-cols-[200px_1fr] items-center justify-center">
                    <div className="font-medium">Refund amount</div>
                    <div className="text-right text-base font-bold">{refundAmount > 0 ? refundAmount.toFixed(2) : '0.00'}</div>
                </div>
            </div>

            <div className="my-4 flex justify-end">
                <div className="grid grid-cols-[200px_1fr] items-center justify-center">
                    <div className="font-medium">{refundAmount.toFixed(2)}</div>
                    <Button>
                        Initiate Refund
                    </Button>
                </div>
            </div>
        </div>
    )
}