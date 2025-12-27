import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import type { IBooking } from "../features/NewBooking/data/schema";
import { usePayment } from "../contexts/payment-context";
import BookingDetailsFeature from "../features/BookingDetails/booking-details-feature";
import { PayAndBookModal } from "../features/BookingDetails/components/PaymentModal";
import { useBookingDetail } from "../features/BookingDetails/context/booking-detail-context";


interface BookingDetailProps {
    data?: IBooking
}


const BookingDetails: React.FC<BookingDetailProps> = ({ data }) => {


    const { calculateTotalAmount } = usePayment();
    const { setBookingDetail } = useBookingDetail();

    useEffect(() => {
        if (data) {
            setBookingDetail(data);
            calculateTotalAmount(data);
        }
    }, [data]);

    return (
        <div className="py-4 px-4">
            <BookingDetailsFeature data={data} />
            <div className="mt-3 flex justify-end w-full">
                <div className="min-w-lg">
                    <PayAndBookModal
                        button={
                            <Button className={`text-center cursor-pointer !py-3 text-lg w-full`}>
                                Process Payment
                            </Button>
                        }
                    />
                </div>
            </div>
        </div>
    )
}


export default BookingDetails;