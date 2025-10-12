import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { DatePicker } from "../components/DatePicker";
import { Search } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { BookingListTable } from "../features/BookingList/booking-table/page";





const Booking = () =>{
    return(
        <div>
            <div className="w-full grid grid-cols-[1fr_20vw] my-4 py-2 px-2 border-[1px] border-gray-300 rounded">
                <div className="flex gap-2">
                    <label htmlFor="search-patient" className="w-full cursor-pointer flex border-[1px] px-1 pr-2 focus-within::border-2 focus-within:border-blue-500 rounded items-center gap-2">
                        <input type="search" 
                            autoComplete="off" 
                            className="w-full outline-none border-r-2 h-full border-0 shadow-none px-2 text-sm placeholder:text-[11px]" 
                            placeholder="Search Patient....." 
                        />
                        <Search size={17} onClick={() => console.log("hello")} className="cursor-pointer" />
                    </label>
                    
                    <div className="flex gap-2">
                        <DatePicker placeholder="Select start date"/>
                        <DatePicker placeholder="Select end date"/>
                    </div>
                </div>
                <div className="flex justify-end">
                    <Link to="/transactions/booking/create-booking">
                        <Button className="!bg-blue-500 text-white">
                            Create Booking
                        </Button>
                    </Link>
                    
                </div>
            </div>
            <Separator className="border-1 border-gray-500" />
            <BookingListTable/>
        </div>
    )
}


export default Booking;