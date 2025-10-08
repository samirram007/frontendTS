import { Link } from "@tanstack/react-router"
import { ArrowLeft } from "lucide-react"



function ViewNavbar(){
    return(
        <div className="py-6 flex items-center gap-6">
            <Link to="/" className="font-semibold flex flex-wrap underline underline-offset-2 gap-1 items-center text-blue-500">
                <ArrowLeft size={17} />
                Go Back
            </Link>
            <div  className="!bg-green-600 py-1 px-4 rounded shadow-sm text-white">
                New Booking
            </div>
        </div>
    )
}


export const BookingHeader = () =>{
    return(
        <div className="border-b-2 pb-4 border-gray-400">
            <ViewNavbar/>
            <div className="grid grid-cols-2">
                <div className="w-full grid grid-rows-2 gap-3">
                {/* Booking ID */}
                <div className="grid grid-cols-[120px_1fr] items-center">
                    <div>
                        <h1 className="font-light">Booking ID: </h1>
                    </div>
                    <div className="font-semibold">12345678</div>
                    <input value={'AABBB111213331'} disabled={true} type="text" id="booking_id" name="booking_id" placeholder="WA12345" className="sr-only border-0 rounded"/>
                </div>
                {/* Booking Date */}
                <div className="grid grid-cols-[120px_1fr] items-center">
                    <div className="font-light">Booking Date:</div>
                    <div>
                    <input
                        type="date"
                        id="dob"
                        onChange={(e)=> console.log(e.target.value)}
                        value={new Date().toISOString().split("T")[0]}
                        name="dob"
                        className="w-fit font-semibold py-1 border-0 outline-0 rounded"
                    />
                    </div>
            </div>
                </div>
                <div>
                    <h1 className="font-semibold text-lg">Reports</h1>
                    <div className="px-2 py-2 flex gap-3">
                        <h1 className="text-blue-500 cursor-pointer text-app-base">Blood Report</h1>
                        <h1 className="text-blue-500 cursor-pointer text-app-base">Liver Report</h1>
                        <h1 className="text-blue-500 cursor-pointer text-app-base">Kidney Report</h1>
                    </div>
                </div>
            </div>
            
        </div>
    )
}