import { BedStatus } from "./bed-status-func";

export function RoomInfo({ room, key }: { room: any, key: any }) {
    return (
        <>
            <div key={key} className="w-[400px] px-4 hover:border-gray-500 transition-all ease-out duration-200 relative border-2 py-2  rounded-sm border-gray-300">
                <div className=" mb-2 font-semibold">
                    <div>{room.roomName} <span className="font-normal">(Total: {room.totalBeds})</span></div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                    <div>
                        <div className="flex gap-4 relative flex-wrap">
                            {
                                room?.beds.map((bed: any, index: any) => (
                                    <div key={index} className="text-center">
                                        <BedStatus status={bed.currentStatus} bedNo={bed.bedNo} />
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div>
                        <div className="grid grid-cols-[1fr_10px_70px]">
                            <h1 className="font-semibold">Bed Occupied </h1>
                            <span>:</span>
                            <h3>{room.bedOccupied}</h3>
                        </div>
                        <div className="grid grid-cols-[1fr_10px_70px]">
                            <h1 className="font-semibold">Bed Booked </h1>
                            <span>:</span>
                            <h3>{room.bedBooked}</h3>
                        </div>
                        <div className="grid grid-cols-[1fr_10px_70px]">
                            <h1 className="font-semibold">Bed Available </h1>
                            <span>:</span>
                            <h3>{room.bedAvailable}</h3>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}