import {type ColumnDef} from "@tanstack/react-table";
import { Eye } from "lucide-react";
import {  useNavigate } from "@tanstack/react-router";
import type { IAllBooking } from "../data/schema";
import { Button } from "@/components/ui/button";
import { DataTableColumnHeader } from "@/features/tasks/components/data-table-column-header";
import { formatDateMonthYearForInput } from "../../../utils/date-utils";


export const columns: ColumnDef<IAllBooking>[] = [
    {
        header:"Sl no",
        cell:(row) => <>{row.row.index + 1}</>,
        size: 20
    },
    {
        header:"Booking ID",
        accessorFn:(row)=> row?.voucher.voucherNo ?? "",
        size: 50,
        minSize: 50
    },
    {
        header:"Booking Date",
        accessorFn:(row)=> formatDateMonthYearForInput(row.voucher.voucherDate) ?? "",
        size: 50,
        minSize: 50
    },
    {
        header:"Patient Name",
        accessorFn:(row)=> row.patient.name,
        size: 220
    },
    {
        id:"voucherId",
        header:({column}) => (
            <DataTableColumnHeader  className="text-center" title="Action" column={column}/>
        ),
        size: 60,
        minSize: 70,
        cell: (props) => {
        const navigate = useNavigate();

        return (
            <div className="w-full flex justify-center">
                <Button
                onClick={() => navigate({ to: `/transactions/booking/${props.row.original.voucherId}` })}
                className="text-gray-200 hover:text-gray-50 hover:bg-blue-800 flex items-center gap-2 cursor-pointer"
                >
                <Eye size={22} color="white" /> View
                </Button>
            </div>

        );
        },
    },
];