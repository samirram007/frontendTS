import type { IBooking } from "../NewBooking/data/schema";
import { BookingDetailList } from "./Features/booking-detail-test-list";
import BookingDetailsHeader from "./components/booking-details-header";
import { BookingDetailPayment } from "./Features/BookingPaymentFeature/booking-detail-payment";


interface BookingDetailProps {
    data?: IBooking
}



const BookingDetailsFeature: React.FC<BookingDetailProps> = ({ data }) => {


    return (
        <>
            <BookingDetailsHeader data={data} />
            <BookingDetailList booking={data} />
            <BookingDetailPayment data={data} />
        </>
    )
}


export default BookingDetailsFeature;