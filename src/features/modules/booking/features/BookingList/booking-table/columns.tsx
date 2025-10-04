import {type ColumnDef} from "@tanstack/react-table";
import type { IBookingListSchema } from "../../../data/schema";
import { View } from "lucide-react";
import { Link } from "@tanstack/react-router";


export const columns: ColumnDef<IBookingListSchema>[] = [
    {
        accessorKey:"id",
        header:"Sl no",
        cell:(row) => <>{row.getValue()}</>
    },
    {
        accessorKey:"bookingDate",
        header:"Booking Date",
    },
    {
        accessorKey:"paitentName",
        header:"Patient Name",
    },
    {
        accessorKey:"testType",
        header:"Test Type",
    },
    {
        accessorKey:"bookingStatus",
        header:"Booking Status",
    },
    {
        accessorKey:"paymentStatus",
        header:"Payment Status",
    },
    {
        accessorKey:"reportingStatus",
        header:"Reporting Status",
    },
    {
        id:"actions",
        header:"Action",
        cell:(row)=> <Link to={'/transactions/booking/view'}><View/></Link> 
    },
];