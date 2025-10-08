import type { IBooking } from "../NewBooking/data/schema";


interface BookingDetailProps {
    data?: IBooking
}



const BookingDetailsFeature: React.FC<BookingDetailProps> = ({data}) =>{
    console.log(data);
    return(
        <>
            
        </>
    )
}


export default BookingDetailsFeature;