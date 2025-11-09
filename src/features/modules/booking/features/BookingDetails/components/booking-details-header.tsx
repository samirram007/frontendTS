import type React from "react";
import type { IBooking } from "../../NewBooking/data/schema";



interface IBookingDetails{
    data?: IBooking
}


const BookingDetailsHeader: React.FC<IBookingDetails> = ({data}) =>{
    return(
        <div className="w-full grid grid-cols-2 pb-5 border-b-1 border-gray-400">
            {/* Booking ID and date */}
            <div className="flex flex-col gap-4">
                <div className="grid grid-cols-[120px_1fr]">
                    <div className="font-semibold">Booking</div>
                    <div className="font-bold">{data?.voucherNo}</div>
                </div>
                <div className="grid grid-cols-[120px_1fr]">
                    <div className="font-semibold">Booking Date</div>
                    <div>
                        <input
                            type="date"
                            id="dob"
                            disabled
                            onChange={(e)=> console.log(e.target.value)}
                            value={new Date(data?.voucherDate || new Date()).toISOString().split("T")[0]}
                            name="dob"
                            className="w-fit font-semibold py-1 border-0 outline-0 rounded"
                        />
                    </div>
                </div>
            </div>

            {/* Recent Bokoing */}
            <div>
                <div className="flex justify-end gap-4 items-center">
                    <div className="font-semibold text-base">{data?.voucherPatient.patient.name}</div>
                    <div className="border-1 border-gray-400 h-6"/>
                    <div className="text-gray-900 font-medium">{data?.voucherPatient.patient.age}</div>
                    <div className="border-1 border-gray-400 h-6"/>
                    <div className="text-gray-900 font-medium">{data?.voucherPatient.patient.gender}</div>
                    <div className="border-1 border-gray-400 h-6"/>
                    <div className="text-gray-900 font-medium">{data?.voucherPatient.patient.contactNo}</div>
                </div>
                <div className="flex justify-end mt-3 items-center  gap-3">
                    <div className="font-bold">
                        Physician:
                    </div>
                    <div className="font-semibold">
                        <span className="text-gray-900 font-medium">{data?.voucherPatient.physician?.name}</span>
                    </div>
                </div>
                <div className="flex justify-end items-center gap-3">
                    <div className="font-bold">
                        Referred By:
                    </div>
                    <div className="font-semibold">
                        <span className="text-gray-900 font-medium">{data?.voucherPatient.agent?.name}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookingDetailsHeader;