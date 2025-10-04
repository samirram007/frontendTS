// import { Link } from "@tanstack/react-router";
// import { ArrowLeft } from "lucide-react";

import NewBookingFeature from "../features/NewBooking/NewBookingFeature";


function BookingHead(){
  return <div className="w-full text-sm grid grid-rows-2 gap-3">

        <div className="grid grid-cols-[120px_1fr] items-center">
          <div>
            <div className="font-light">Booking ID: </div>
          </div>
          <div className="font-semibold">12345678</div>
          <input value={'AABBB111213331'} disabled={true} type="text" id="booking_id" name="booking_id" placeholder="WA12345" className="sr-only border-0 rounded"/>
        </div>



          <div className="grid grid-cols-[120px_1fr] items-center">
            <div className="font-light">Booking Date:</div>
            <div>
              <input
                type="date"
                id="dob"
                onChange={(e)=> console.log(e.target.value)}
                value={new Date().toISOString().split("T")[0]}
                name="dob"
                className="w-full font-semibold py-1 border-0 outline-0 rounded"
              />
            </div>
          </div>
  </div>
}

function BookingHeadRight(){
  return(
    <div className="text-right">
      Recent Booking
    </div>
  )
}




const NewBooking = () => {
    return (
        <div className="text-sm py-5">
            {/* <div className="grid mb-4 grid-cols-[100px_1fr]">
                <Link to={'/transactions/booking'} className="font-semibold flex flex-wrap underline underline-offset-2 gap-1 items-center text-blue-500">
                    <ArrowLeft size={17} />
                    Go Back
                </Link>
                <div className="text-xl text-center text-dark items-center justify-center font-semibold">Test Booking</div>
            </div> */}

            <div className="grid mb-8 w-full border-b-1 border-gray-300 pb-3 grid-cols-[300px_1fr] gap-6">
                <BookingHead/>
                <BookingHeadRight/>
            </div>
            
            {/* This component includes all patient search to lab tests search to select to bill the patient */}
            <NewBookingFeature/>
        </div>
    )
}


export default NewBooking;