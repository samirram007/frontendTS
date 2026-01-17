
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import BedAllotment from "../data/beatAllotment.json";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import StoreRoom from "../data/storeroom.json";
import { StoreItems } from "./store-items";
import { DoctorStatus } from "./doctor-status";
import { RoomInfo } from "./room-info";



export function ActionBoardOverview() {
    return (
        <>
            <div className="grid grid-cols-1 gap-2 mb-2">
                {
                    BedAllotment.map((item, index) => (
                        <div key={index} >
                            <div className="w-full py-2 px-2 border-2 rounded-sm border-gray-400 hover:border-gray-400 hover:cursor-pointer">
                                <div className="flex justify-between items-center">
                                    <h1 className="font-bold">{item.section}</h1>
                                    <div className="flex items-center gap-5">
                                        <div className="text-xs flex items-center gap-1">
                                            <div className="font-semibold">
                                                Last Updated At:
                                            </div>
                                            <div>
                                                {new Date(item.lastUpdatedAt).toLocaleTimeString()}
                                            </div>

                                        </div>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button variant="outline">
                                                    <Info color="#2563eb" className="24" />
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>More info</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </div>
                                </div>
                                {
                                    item.floors?.map((floor, index) => (
                                        <div key={index} className="my-2 border-b-2 text-sm rounded-sm border-gray-400 px-2 py-3 hover:border-zinc-300 transition-all duration-300 ease-out">
                                            <div className="mb-2">
                                                <h2 className="font-semibold underline underline-offset-1">{floor.code} <span className="font-normal">({floor.floorName})</span></h2>
                                            </div>
                                            <div className="flex justify-between gap-2">
                                                {
                                                    floor.zones && floor.zones.map((zone, idx) => (
                                                        <div key={idx} className=" w-full p-2 ">
                                                            <div>
                                                                <h1 className="font-semibold mb-1.5 underline underline-offset-1">{zone.zoneName}</h1>
                                                            </div>
                                                            <div className="flex gap-2 flex-wrap px-2">
                                                                {
                                                                    zone.rooms.map((room, idx) => (
                                                                        <div key={idx} className="border-2 w-[260px] p-3 rounded-sm border-gray-400 hover:border-gray-600">
                                                                            <div className="font-semibold mb-1">{room.roomId}</div>
                                                                            <div>
                                                                                {
                                                                                    room.assignedEmployees.map((emp, index) => (
                                                                                        <div key={index}>
                                                                                            <div className={`flex gap-3`}>
                                                                                                <DoctorStatus status={emp.status} />
                                                                                                <div className="text-xs">
                                                                                                    <div>{emp.name}</div>
                                                                                                    <div>{emp.designation}</div>
                                                                                                    <div>{emp.availability.shift}</div>
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
                                                        </div>
                                                    ))
                                                }
                                                {floor.rooms && (
                                                    <div className="flex gap-2 justify-between overflow-hidden flex-wrap w-full">
                                                        {floor.rooms.map((room, idx) => (
                                                            <RoomInfo key={idx} room={room} />
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))
                                }

                            </div>
                        </div>
                    ))
                }
            </div>
            <div className="grid grid-cols-2 gap-2 overflow-hidden">
                <div className="w-full border-2 border-gray-500 rounded-sm">
                    {
                        StoreRoom.map((store, index) => (
                            <div key={index} className="py-2 px-2 text-sm">
                                <div className="flex justify-between items-center">
                                    <h1 className="font-bold">{store.section} <span className="font-normal">(Total: {store.summary.totalItems})</span></h1>
                                    <div className="flex justify-between gap-3 items-center">
                                        <div className="font-bold text-xs">Last Updated: <span className="font-normal">{new Date(store.summary.lastUpdatedAt).toLocaleTimeString()}</span></div>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button variant="outline">
                                                    <Info color="#2563eb" className="24" />
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>More info</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </div>

                                </div>
                                <div className="grid grid-cols-[170px_1fr] my-8">
                                    <div className="flex gap-1 flex-col">
                                        <div className="gap-2 flex items-center">
                                            <h1 className="font-bold">Low Stock:</h1>
                                            <h3>{store.summary.lowStockItems}</h3>
                                        </div>
                                        <div className="gap-2 flex items-center">
                                            <h1 className="font-bold">Out Of Stock:</h1>
                                            <h3>{store.summary.outOfStockItems}</h3>
                                        </div>
                                        <div className="gap-2 flex items-center">
                                            <h1 className="font-bold">Near Expiry:</h1>
                                            <h3>{store.summary.nearExpiryItems}</h3>
                                        </div>
                                        <div className="gap-2 flex items-center">
                                            <h1 className="font-bold">Expired Items:</h1>
                                            <h3>{store.summary.expiredItems}</h3>
                                        </div>
                                        <div className="gap-2 flex items-center">
                                            <h1 className="font-bold">Critical Shortages:</h1>
                                            <h3>{store.summary.criticalShortages}</h3>
                                        </div>
                                    </div>
                                    <div className="flex gap-1.5 flex-wrap">
                                        {
                                            store.summary.categorySnapshot.map((item, index) => (
                                                <div key={index} className=" border-2 border-gray-200 hover:border-gray-500 w-52 py-2 rounded-sm">
                                                    <div className="flex w-full px-2 py-2 justify-between items-center">
                                                        <h3 className="text-xs font-bold">{item.category}</h3>
                                                        <StoreItems item={item.category} />
                                                    </div>
                                                    <div className="flex justify-between items-center px-2">
                                                        <h2 className="text-xs">Low Stock</h2>
                                                        <h3>{item.lowStock}</h3>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>

                            </div>
                        ))
                    }
                </div>
                <div className="w-full border-gray-500">

                </div>
            </div>
        </>
    )
}
