import {type ColumnDef} from "@tanstack/react-table";
import type { JobOrderType, ReportTestType } from "../../../data/schema";


export const columns: ColumnDef<JobOrderType>[] = [
    {
        header:"Sl no",
        cell:(row) => <>{row.row.index + 1}</>
    },
    {
        header:"Patient Name",
    },
    {
        header:"Booking ID",
    },
    {
        header:"Booked Date",
        accessorFn:(row)=> row.expectedStartDate ?? new Date().toDateString() 
    },
    {
        header:"Reporting Status",
        accessorFn:(row)=> row.status 
    },
];