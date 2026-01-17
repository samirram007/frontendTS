import { User2 } from "lucide-react";

export function DoctorStatus({ status }: { status: string }) {
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
