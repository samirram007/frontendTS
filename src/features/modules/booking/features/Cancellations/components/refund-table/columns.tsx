import { type ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTableColumnHeader } from "@/features/tasks/components/data-table-column-header";
import { useNavigate } from "@tanstack/react-router";
import type { ITestCancellation } from "../../data/schema";
import { formatDateMonthYearForInput } from "@/features/modules/booking/utils/date-utils";


export const columns: ColumnDef<ITestCancellation>[] = [
    {
        header: "Sl no",
        cell: (row) => <>{row.row.index + 1}</>,
        size: 20
    },
    {
        header: "Booking ID",
        accessorFn: (row) => row.bookingNo ?? "",
        size: 50,
        minSize: 50
    },
    {
        header: "Booking Date",
        accessorFn: (row) => formatDateMonthYearForInput(row.bookingDate) ?? "",
        size: 50,
        minSize: 50
    },
    {
        header: "Patient Name",
        accessorFn: (row) => row.patientName,
        size: 220
    },
    {
        accessorKey: "actions",
        header: ({ column }) => (
            <DataTableColumnHeader className="text-center" title="Action" column={column} />
        ),
        cell: ({ row }) => {
            const navigate = useNavigate();
            return (
                <div className="w-full">
                    <Button
                        variant={'outline'}
                        onClick={() => navigate({ to: `/transactions/booking/cancellations/${row.original.bookingNo}` })}
                        className="text-gray-900 !border-l-8 border-red-500 border-2 flex items-center gap-2 cursor-pointer"
                    >
                        <Eye size={22} color="black" /> Check Cancellation Requests
                    </Button>
                </div>

            );
        },
    },
];