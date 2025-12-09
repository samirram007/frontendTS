import { type ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTableColumnHeader } from "@/features/tasks/components/data-table-column-header";
import { formatDateMonthYearForInput } from "../../../utils/date-utils";
import type { RefundRequest } from "../data/schema";
import { Link } from "@tanstack/react-router";


export const columns: ColumnDef<RefundRequest>[] = [
    {
        header: "Sl no",
        cell: (row) => <>{row.row.index + 1}</>,
        size: 20
    },
    {
        header: "Booking ID",
        accessorFn: (row) => row.booking_no ?? "",
        size: 50,
        minSize: 50
    },
    {
        header: "Booking Date",
        accessorFn: (row) => formatDateMonthYearForInput(row.booking_date) ?? "",
        size: 50,
        minSize: 50
    },
    {
        header: "Patient Name",
        accessorFn: (row) => row.patient_name,
        size: 220
    },
    {
        accessorKey: "actions",
        header: ({ column }) => (
            <DataTableColumnHeader className="text-center" title="Action" column={column} />
        ),
        size: 60,
        minSize: 70,
        cell: ({ row }) => {
            const data = row.original;
            console.log("Selected row", data);
            return (
                <div className="w-full flex justify-center">
                    <Link to="/transactions/booking/test_cancelled" state={{ selectedData: data }}>

                        <Button
                            className="text-gray-200 hover:text-gray-50 hover:bg-blue-800 flex items-center gap-2 cursor-pointer"
                        >
                            <Eye size={22} color="white" /> View
                        </Button>
                    </Link>
                </div>

            );
        },
    },
];