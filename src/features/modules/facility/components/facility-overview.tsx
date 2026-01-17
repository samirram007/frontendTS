import { useState } from "react"
import type { IFacilityInterface } from "../data/schema";
import facilityJson from "../data/facility.json";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Circle } from "lucide-react";



function StatusIcon({ status }: { status: string }) {
    const iconSize = 14;
    if (status == "active") {
        return <Circle size={iconSize} color="#6bff1d" fill="#6bff1d" />
    } else {
        return <Circle size={iconSize} color="red" fill="red" />
    }
}






export default function FacilityOverview() {

    const [facilities, _setFacilities] = useState<IFacilityInterface>(facilityJson);

    return (
        <section aria-labelledby="facility-overview">
            {
                facilities.map((item, idx) => (
                    <Card key={idx}>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3">{item.facility.name} ({item.facility.code}) <span>{<StatusIcon status={item.facility.status} />}</span> </CardTitle>
                            <CardDescription>
                                {item.facility.description}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-[400px_1fr] gap-3">
                                <div className="border-2 border-black">
                                    <h1 className="font-semibold">Building Info</h1>
                                    <div>
                                        <div className="grid grid-cols-[140px_1fr]">
                                            <h1>Building Type</h1>
                                            <p>{item.facility.building_details.building_function}</p>
                                        </div>
                                        <div className="grid grid-cols-[140px_1fr]">
                                            <h1>Number of Floors</h1>
                                            <p>{item.facility.building_details.no_of_floors}</p>
                                        </div>
                                        <div className="grid grid-cols-[140px_1fr]">
                                            <h1>Year Constructed</h1>
                                            <p>{item.facility.building_details.year_constructed}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="border-2 flex flex-wrap gap-2 py-3 px-2 border-black">
                                    {
                                        item.facility.floors.map((floor, idx) => (
                                            <div key={idx} className="w-[400px] py-2 px-4 border-2 border-black">
                                                <header className="">
                                                    <div className="grid grid-cols-[1fr_50px] gap-3 items-center">
                                                        <h1>{floor.name} ({floor.code})</h1>
                                                        <StatusIcon status={floor.status} />
                                                    </div>
                                                    <span className="text-xs">{floor.description}</span>
                                                </header>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))
            }
        </section>
    )
}