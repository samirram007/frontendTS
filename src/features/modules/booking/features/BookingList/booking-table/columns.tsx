import {type ColumnDef} from "@tanstack/react-table";
import { View } from "lucide-react";
import { Link } from "@tanstack/react-router";
import type { IBooking } from "../../NewBooking/data/schema";


export const columns: ColumnDef<IBooking>[] = [
    {
        header:"Sl no",
        cell:(row) => <>{row.row.index + 1}</>
    },
    {
        accessorKey:"voucherNo",
        header:"Booking ID"
    },
    {
        accessorKey:"voucherDate",
        header:"Booking Date",
    },
    {
        accessorKey:"voucherPatient.patient.name",
        header:"Patient Name",
    },
    {
        accessorKey:"status",
        header:"Booking Status",
    },
    {
        accessorKey:"remarks",
        header:"Payment Status",
    },
    {
        id:"id",
        header:"Action",
        cell:({row})=>{
            return(
                <Link to={'/transactions/booking/$id'}
                    params={{id: row.original.id}}
                    className="text-blue-500 hover:text-blue-700"
                >
                    <View className="w-4 h-4"/>
                </Link>
            )
        } 
    },
];