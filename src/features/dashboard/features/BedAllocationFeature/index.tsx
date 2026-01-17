import { useState } from "react";
import type { IFloorInfo } from "../../data/schema";
import BedAllocationData from "./data/bedAllocation.json";
import { BedStatus } from "./components/bed-allocation-bed-status";

export default function BedAllocationActionBoard() {

    const [bedAllocationInfo, _setBedAllocationInfo] = useState<IFloorInfo>(BedAllocationData[0] as any);

    console.log(bedAllocationInfo, "info");

    return (
        <div className="">
            <div className="mb-4">
                <div className="font-bold text-base">{bedAllocationInfo.section}</div>
            </div>
            {
                bedAllocationInfo.floors.map((floor, index) => (
                    <div key={index} className="border-2 border-black/20 rounded-sm gap-2 mb-3 py-3 px-2">
                        <div className="underline underline-offset-1 font-semibold">
                            <div>{floor.floorName} <span>({floor.floorType})</span></div>
                        </div>
                        <div>
                            {
                                floor.rooms.map((room, index) => (
                                    <div key={index} className="grid grid-cols-2 mb-3 border-2 border-black/20 gap-2 px-2 py-2 rounded-sm">
                                        <div className="w-full">
                                            <div className="font-semibold mb-2">{room.roomName} <span className="font-normal">({room.roomId})</span></div>
                                            <div className="flex gap-3">
                                                {
                                                    room.beds.map((bed, idx) => (
                                                        <div key={idx} className="border-2 w-[200px] border-black rounded-sm py-2 px-2">
                                                            <BedStatus bed={bed} />
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h1>Total Beds: </h1>
                                                <h3>{room.totalBeds}</h3>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                ))
            }
        </div>
    )
}