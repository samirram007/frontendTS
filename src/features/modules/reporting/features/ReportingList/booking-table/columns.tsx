import {type ColumnDef} from "@tanstack/react-table";
import type { JobOrderType } from "../../../data/schema";


export const columns: ColumnDef<JobOrderType>[] = [
    {
        header:"Sl no",
        cell:(row) => <>{row.row.index + 1}</>
    },
    {
        header:"Booking ID",
        accessorFn:(row) => row.testBooking?.voucherNo
    },
    {
        header:"Booking Date",
        accessorFn:(row) => row.testBooking?.voucherDate
    },
    {
        header:"Patient Name",
        accessorFn:(row) => row?.testBooking?.voucherPatient?.patient?.name
    },
    {
        header:"Reporting Status",
        accessorFn:(row)=> row.status
    },
];