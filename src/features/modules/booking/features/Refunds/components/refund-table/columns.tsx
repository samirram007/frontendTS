import { type ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTableColumnHeader } from "@/features/tasks/components/data-table-column-header";
import { useNavigate } from "@tanstack/react-router";
import type { RefundRequest } from "../../data/schema";
import { formatDateMonthYearForInput } from "@/features/modules/booking/utils/date-utils";


export const columns: ColumnDef<RefundRequest>[] = [
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
        size: 60,
        minSize: 70,
        cell: ({ row }) => {
            const navigate = useNavigate();
            return (
                <div className="w-full flex justify-center">
                    <Button
                        onClick={() => navigate({ to: `/transactions/booking/refunds/${row.original.bookingNo}` })}
                        className="text-gray-200 hover:text-gray-50 hover:bg-blue-800 flex items-center gap-2 cursor-pointer"
                    >
                        <Eye size={22} color="white" /> View
                    </Button>
                </div>

            );
        },
    },
];