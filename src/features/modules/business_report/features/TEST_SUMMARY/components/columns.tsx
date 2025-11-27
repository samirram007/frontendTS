import LongText from '@/components/long-text'
// import { Checkbox } from '@/components/ui/checkbox'
import { cn } from '@/lib/utils'
import type { ColumnDef } from '@tanstack/react-table'



import type { ITestSummaryReport } from '../data/schema'
import { DataTableColumnHeader } from '@/features/tasks/components/data-table-column-header'
import RowActions from './row-actions'

export const columns: ColumnDef<ITestSummaryReport>[] = [
    // {
    //     id: 'select',
    //     header: ({ table }) => (
    //         <Checkbox
    //             checked={
    //                 table.getIsAllPageRowsSelected() ||
    //                 (table.getIsSomePageRowsSelected() && 'indeterminate')
    //             }
    //             onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
    //             aria-label='Select all'
    //             className='translate-y-[2px]'
    //         />
    //     ),
    //     meta: {
    //         className: cn(
    //             'sticky md:table-cell left-0 z-10 rounded-tl',
    //             'bg-background transition-colors duration-200 group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted'
    //         ),
    //     },
    //     cell: ({ row }) => (
    //         <Checkbox
    //             checked={row.getIsSelected()}
    //             onCheckedChange={(value) => row.toggleSelected(!!value)}
    //             aria-label='Select row'
    //             className='translate-y-[2px]'
    //         />
    //     ),
    //     enableSorting: false,
    //     enableHiding: false,
    // },
    {
        accessorKey: 'voucherNo',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title='Booking Info' />
        ),
        size: 60,
        cell: ({ row }) => (
            <LongText className='max-w-36'>{`${row.getValue('voucherNo')}`}</LongText>
        ),
        meta: {
            className: cn(
                'drop-shadow-[0_1px_2px_rgb(0_0_0_/_0.1)] dark:drop-shadow-[0_1px_2px_rgb(255_255_255_/_0.1)] lg:drop-shadow-none',
                'bg-background transition-colors duration-200 group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted',
                'sticky left-6 md:table-cell'
            ),
        },
        enableHiding: false,
    },
    {
        accessorKey: 'tests.testName',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title='Test' />
        ),
        size: 60,
        cell: ({ row }) => (
            <LongText className='max-w-36'>{`${row.original.tests.map((x) => x)}`}</LongText>
        ),
        meta: {
            className: cn(
                'drop-shadow-[0_1px_2px_rgb(0_0_0_/_0.1)] dark:drop-shadow-[0_1px_2px_rgb(255_255_255_/_0.1)] lg:drop-shadow-none',
                'bg-background transition-colors duration-200 group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted',
                'sticky left-6 md:table-cell'
            ),
        },
        enableHiding: false,
    },
    {
        accessorKey: 'name',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title='Name' />
        ),
        size: 60,
        cell: ({ row }) => (
            <LongText className='max-w-36'>{row.getValue('name')}</LongText>
        ),
        meta: {
            className: cn(
                'drop-shadow-[0_1px_2px_rgb(0_0_0_/_0.1)] dark:drop-shadow-[0_1px_2px_rgb(255_255_255_/_0.1)] lg:drop-shadow-none',
                'bg-background transition-colors duration-200 group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted',
                'sticky left-6 md:table-cell'
            ),
        },
        enableHiding: false,
    },
    // {
    //     accessorKey: 'code',
    //     header: ({ column }) => (
    //         <DataTableColumnHeader column={column} title='Code' />
    //     ),
    //     cell: ({ row }) => (
    //         <div className='w-fit text-nowrap'>{row.getValue('code')}</div>
    //     ),
    // },

    {
        accessorKey: 'bookingDate',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title='Booking Date' />
        ),
        size: 60,
        cell: ({ row }) => {
            return (
                <div className='flex space-x-2'>
                    {row.getValue('bookingDate')}
                </div>
            )
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id))
        },
        enableHiding: false,
        enableSorting: false,
    },

    {
        accessorKey: 'totalAmount',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title='Amount' />
        ),
        size: 60,
        cell: ({ row }) => (
            <LongText className='max-w-36'>{row.getValue('totalAmount')}</LongText>
        ),
        meta: {
            className: cn(
                'drop-shadow-[0_1px_2px_rgb(0_0_0_/_0.1)] dark:drop-shadow-[0_1px_2px_rgb(255_255_255_/_0.1)] lg:drop-shadow-none',
                'bg-background transition-colors duration-200 group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted',
                'sticky left-6 md:table-cell'
            ),
        },
        enableHiding: false,
    },

    {
        id: 'actions',
        cell: RowActions,
    },
]
