import type { BedInfo } from "@/features/dashboard/data/schema";
import { Bed } from "lucide-react";

export function BedStatus({ bed }: { bed: BedInfo }) {
    const BED_SIZE = 27;
    if (bed.currentStatus === "occupied") {
        return <div className="grid grid-cols-[60px_1fr]">
            <div>
                <Bed size={BED_SIZE} stroke="red" />
                <div className="text-red-600 font-semibold">{bed.bedNo}</div>
            </div>
            <div className="font-bold">
                {bed.bedId}
            </div>
        </div>
    }
    else if (bed.currentStatus === "available") {
        return <div className="grid grid-cols-2">
            <div>
                <Bed size={BED_SIZE} stroke="green" />
                <div className="text-green-600 font-semibold">{bed.bedNo}</div>
            </div>
            <div className="font-bold">
                {bed.bedId}
            </div>

        </div>
    } else if (bed.currentStatus === "booked") {
        return <div className="grid grid-cols-2">
            <div>
                <Bed size={BED_SIZE} stroke="#2563eb" />
                <div className="text-blue-600 font-semibold">{bed.bedNo}</div>
            </div>
            <div className="font-bold">
                {bed.bedId}
            </div>
        </div>
    }
}