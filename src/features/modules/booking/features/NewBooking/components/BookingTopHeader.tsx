import BookingHead from "./BookingHead";
import BookingHeadRight from "./BookingHeadRight";




export default function BookingHeader({ bookingDate, setBookingDate }: { bookingDate: Date, setBookingDate: (booking: Date) => void }) {
    return (
        <>
            <div className="grid mb-8 w-full border-b-1  pb-3 grid-cols-[300px_1fr] px-4 gap-3  border-gray-300">
                <BookingHead bookingDate={bookingDate} setBookingDate={setBookingDate} />
                <BookingHeadRight />
            </div>
        </>
    )
}