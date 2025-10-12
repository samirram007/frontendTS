import {type ColumnDef} from "@tanstack/react-table";
import { View } from "lucide-react";
import {  useNavigate } from "@tanstack/react-router";
import type { IAllBooking } from "../data/schema";


export const columns: ColumnDef<IAllBooking>[] = [
    {
        header:"Sl no",
        cell:(row) => <>{row.row.index + 1}</>
    },
    {
        header:"Booking ID",
        accessorFn:(row)=> row?.voucher.voucherNo ?? ""
    },
    {
        header:"Booking Date",
        accessorFn:(row)=> row.voucher.voucherDate ?? ""
    },
    {
        header:"Status",
        accessorFn: () => "Drafted"
    },
    {
        header:"Patient Name",
        accessorFn:(row)=> row.patient.name
    },
    {
        header: "Action",
        cell: (props) => {
        const navigate = useNavigate();

        return (
            <div
            onClick={() => navigate({ to: `/transactions/booking/${props.row.original.voucherId}` })}
            className="text-blue-500 hover:text-blue-700 cursor-pointer"
            >
            <View className="w-4 h-4" />
            </div>
        );
        },
    },
];