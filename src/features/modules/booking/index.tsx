import { useContext } from "react";
import { PathoContext } from "./contexts/PathoContext";
import { DatePicker } from "./components/DatePicker";
import CreateBooking from "./components/create-booking";
import { BookingTable } from "./components/BookingTables";


const BookingModule = () => {

    const {searchBooking,setSearchBooking} = useContext(PathoContext);

  return (
    <div>
        <div className="mb-6">
            <h1 className="font-semibold text-lg">Booking</h1>
        </div>
        <div className="grid mb-7 grid-cols-1 justify-center items-center sm:grid-cols-2">
            <div className="w-full flex-col sm:flex gap-3">
                <div className="w-full">
                    <input type="search" value={searchBooking} onChange={(e)=> setSearchBooking(e.target.value)} name="" id="" className="outline-none border-2 border-gray-600 px-2 py-1 w-full rounded-md" placeholder="Search by patient id or booking id" />
                </div>
                <div className="flex gap-2">
                    <DatePicker placeholder="Start Date" />
                    <DatePicker placeholder="End Date" />
                </div>
            </div>
            <div className="flex justify-end">
                <CreateBooking/>
            </div>
        </div>
        <div>
            <div>
                <h2 className="font-medium">Today's Booking</h2>
            </div>
            <BookingTable/>
        </div>
    </div>
  )
}

export default BookingModule;