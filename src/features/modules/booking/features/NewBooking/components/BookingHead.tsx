


export default function BookingHead({ bookingDate, setBookingDate }: { bookingDate: Date, setBookingDate: (booking: Date) => void }) {
    return <div className="w-full text-sm grid grid-rows-2 gap-3">

        <div className="grid grid-cols-[120px_1fr] items-center">
            <div>
                <div className="font-light">Booking ID: </div>
            </div>
            <div className="font-semibold">12345678</div>
            <input value={'AABBB111213331'} disabled={true} type="text" id="booking_id" name="booking_id" placeholder="WA12345" className="sr-only border-0 rounded" />
        </div>



        <div className="grid grid-cols-[120px_1fr] items-center">
            <div className="font-light">Booking Date:</div>
            <div>
                <input
                    type="date"
                    id="dob"
                    value={new Date(bookingDate).toISOString().split("T")[0]}
                    onChange={(e) => {
                        setBookingDate(new Date(e.target.value));
                    }}
                    name="dob"
                    className="w-full font-semibold py-1 border-0 outline-0 rounded"
                />
            </div>
        </div>
    </div>
}