import type { IBooking } from "../NewBooking/data/schema";
import { BookingDetailPayment } from "./Features/booking-detail-payment";
import { BookingDetailList } from "./Features/booking-detail-test-list";
import BookingDetailsHeader from "./Features/booking-details-header";


interface BookingDetailProps {
    data?: IBooking
}



const BookingDetailsFeature: React.FC<BookingDetailProps> = ({data}) =>{
    return(
        <>
            <BookingDetailsHeader data={data} />
            <BookingDetailList data={data}/>
            <BookingDetailPayment data={data} />
        </>
    )
}


export default BookingDetailsFeature;