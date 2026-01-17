import { Bed } from "lucide-react";

export function BedStatus({ status, bedNo }: { status: string, bedNo: string }) {
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