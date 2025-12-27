import type { ITestCancellation } from "../data/schema";







const RefundHeader = ({ data }: { data?: ITestCancellation }) => {

    return (
        <>
            <div className="w-full grid grid-cols-2 pb-5 border-b-1 my-6 border-gray-400">
                {/* Booking ID and date */}
                <div className="flex flex-col gap-4">
                    <div className="grid grid-cols-[120px_1fr]">
                        <div className="font-semibold">Booking</div>
                        <div className="font-bold">{data?.bookingNo}</div>
                    </div>
                    <div className="grid grid-cols-[120px_1fr]">
                        <div className="font-semibold">Booking Date</div>
                        <div>
                            <input
                                type="date"
                                id="dob"
                                disabled
                                onChange={(e) => console.log(e.target.value)}
                                value={new Date(data?.bookingDate || new Date()).toISOString().split("T")[0]}
                                name="dob"
                                className="w-fit font-semibold py-1 border-0 outline-0 rounded"
                            />
                        </div>
                    </div>
                </div>

                {/* Recent Bokoing */}
                <div>
                    <div className="flex justify-end gap-4 items-center">
                        <div className="font-semibold text-base">{data?.patientName}</div>
                        <div className="border-1 border-gray-400 h-6" />
                        <div className="text-gray-900 font-medium">{data?.patientAge}</div>
                        <div className="border-1 border-gray-400 h-6" />
                        <div className="text-gray-900 font-medium">{data?.patientGender}</div>
                        <div className="border-1 border-gray-400 h-6" />
                        <div className="text-gray-900 font-medium">{data?.patientContact}</div>
                    </div>
                    <div className="flex justify-end mt-3 items-center  gap-3">
                        <div className="font-bold">
                            Physician:
                        </div>
                        <div className="font-semibold">
                            <span className="text-gray-900 font-medium">{data?.physicianName}</span>
                        </div>
                    </div>
                    <div className="flex justify-end items-center gap-3">
                        <div className="font-bold">
                            Referred By:
                        </div>
                        <div className="font-semibold">
                            <span className="text-gray-900 font-medium">{data?.agentName}</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export default RefundHeader;