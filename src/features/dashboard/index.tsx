import { Main } from "@/layouts/components/main";
import { Bed, Brain, Info, LayoutDashboard, Pill, Stethoscope, Syringe, Tablets, User2 } from "lucide-react";
import BedAllotment from "./data/beatAllotment.json";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import StoreRoom from "./data/storeroom.json";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BedAllocationActionBoard from "./features/BedAllocationFeature";



function BedStatus({ status, bedNo }: { status: string, bedNo: string }) {
    const BED_SIZE = 33;
    if (status === "occupied") {
        return <div>
            <Bed size={BED_SIZE} stroke="red" />
            <div className="text-red-600 font-semibold">{bedNo}</div>
        </div>
    }
    else if (status === "available") {
        return <div>
            <Bed size={BED_SIZE} stroke="green" />
            <div className="text-green-600 font-semibold">{bedNo}</div>
        </div>
    } else if (status === "booked") {
        return <div>
            <Bed size={BED_SIZE} stroke="#2563eb" />
            <div className="text-blue-600 font-semibold">{bedNo}</div>
        </div>
    }
}

function DoctorStatus({ status }: { status: string }) {
    const BED_SIZE = 33;
    if (status === "in_consultation") {
        return <User2 size={BED_SIZE} stroke="#D1D5DB" fill="red" />
    }
    else if (status === "available") {
        return <User2 size={BED_SIZE} stroke="#D1D5DB" fill="green" />
    } else if (status === "on_call") {
        return <User2 size={BED_SIZE} stroke="#D1D5DB" fill="#2563eb" />
    }
}






function StoreItems({ item }: { item: string }) {
    if (item === "Injectables") {
        return <Syringe />
    } else if (item === "Emergency Drugs") {
        return <Pill />
    } else if (item === "Consumables") {
        return <Tablets />
    } else if (item === "Neuro-Specific") {
        return <Brain />
    }
}


function RoomInfo({ room, key }: { room: any, key: any }) {
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



function ActionBoardOverview() {
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
                                        <div key={index} className="my-2 border-b-2 rounded-sm border-gray-400 px-2 py-3 hover:border-zinc-300 transition-all duration-300 ease-out">
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
                            <div key={index} className="py-2 px-2">
                                <div className="flex justify-between items-center">
                                    <h1 className="font-bold">{store.section} <span className="font-normal">(Total: {store.summary.totalItems})</span></h1>
                                    <div className="flex justify-between gap-3 items-center">
                                        <div className="font-bold">Last Updated: <span className="font-normal">{new Date(store.summary.lastUpdatedAt).toLocaleTimeString()}</span></div>
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





export default function Dashboard() {


    return (
        <>
            <Main>
                <div className='my-4 flex items-center justify-between space-y-2'>
                    <h1 className='text-2xl font-bold tracking-tight'>Action Board</h1>
                    <div className='flex items-center space-x-2'>
                        {/* <Button>Download</Button> */}
                    </div>
                </div>
                <Tabs
                    orientation='vertical'
                    defaultValue='overview'
                    className='space-y-4'
                >
                    <div className='w-full overflow-x-auto pb-2'>
                        <TabsList>
                            <TabsTrigger value='overview'>
                                <LayoutDashboard />
                                <span>Overview</span>
                            </TabsTrigger>
                            <TabsTrigger value='doctors'>
                                <Stethoscope />
                                <span>Doctors</span>
                            </TabsTrigger>
                            <TabsTrigger value='bedAllocation' >
                                <Bed />
                                <span>Bed Allocations</span>
                            </TabsTrigger>
                            <TabsTrigger value='notifications' >
                                Calendar
                            </TabsTrigger>
                        </TabsList>
                    </div>
                    <TabsContent value='overview' className='space-y-4'>
                        <ActionBoardOverview />
                    </TabsContent>
                    <TabsContent value='doctors' className='space-y-4'>

                    </TabsContent>
                    <TabsContent value='bedAllocation' className='space-y-4'>
                        <BedAllocationActionBoard />
                    </TabsContent>
                </Tabs>


            </Main>
        </>
    )
}