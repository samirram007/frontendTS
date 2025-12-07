import LongText from '@/components/long-text'
// import { Checkbox } from '@/components/ui/checkbox'
import { cn } from '@/lib/utils'
import type { ColumnDef } from '@tanstack/react-table'



import { DataTableColumnHeader } from '@/features/tasks/components/data-table-column-header'
import type { DailyCollectionReport } from '../data/schema'

export const columns: ColumnDef<DailyCollectionReport>[] = [
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
        accessorKey: 'id',
        header: ({ column }) => (
            <DataTableColumnHeader className='w-8' column={column} title='Sl No' />
        ),
        size: 20,
        minSize: 40,
        maxSize: 40,
        cell: ({ row }) => (
            <LongText className='max-w-36'>{row.index + 1}</LongText>
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
            <DataTableColumnHeader className='w-8' column={column} title='Name' />
        ),
        size: 20,
        minSize: 40,
        maxSize: 40,
        cell: ({ row }) => (
            <div className='max-w-36'>{row.original.name}</div>
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
        accessorKey: 'status',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title='Status' />
        ),
        size: 40,
        minSize: 40,
        maxSize: 40,
        cell: ({ row }) => (
            <LongText className='max-w-36'>{row.getValue('status')}</LongText>
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
        accessorKey: 'total_booking_amount',
        header: ({ column }) => (
            <DataTableColumnHeader className='w-8' column={column} title='Booking' />
        ),
        size: 20,
        minSize: 40,
        maxSize: 40,
        cell: ({ row }) => (
            <div className='max-w-36'>{row.original.total_booking_amount}</div>
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
        accessorKey: 'total_discount_amount',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title='Discount' />
        ),
        cell: ({ row }) => (
            <div className='max-w-36'>{row.original.total_discount_amount}</div>
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
        accessorKey: 'total_cancellation_amount',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title='Cancellation' />
        ),
        size: 40,
        minSize: 40,
        maxSize: 40,
        cell: ({ row }) => (
            <LongText className='max-w-36'>{row.getValue('total_cancellation_amount')}</LongText>
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
        accessorKey: 'refund',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title='Refund' />
        ),
        size: 40,
        minSize: 40,
        maxSize: 40,
        cell: ({ row }) => (
            <LongText className='max-w-36'>{row.getValue('refund')}</LongText>
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
        accessorKey: 'discount_return',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title='DCNT Return' />
        ),
        size: 40,
        minSize: 40,
        maxSize: 40,
        cell: ({ row }) => (
            <LongText className='max-w-36'>{row.getValue('discount_return')}</LongText>
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
        accessorKey: 'due_cash_amount',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title='Due Rcpt(CSH)' />
        ),
        size: 40,
        minSize: 40,
        maxSize: 40,
        cell: ({ row }) => (
            <LongText className='max-w-36'>{row.getValue('due_cash_amount')}</LongText>
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
        accessorKey: 'due_bank_amount',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title='Due Rcpt(BNK)' />
        ),
        size: 40,
        minSize: 40,
        maxSize: 40,
        cell: ({ row }) => (
            <LongText className='max-w-36'>{row.getValue('due_bank_amount')}</LongText>
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
        accessorKey: 'curr_total_cash',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title='Curr Rcpt(CSH)' />
        ),
        size: 40,
        minSize: 40,
        maxSize: 40,
        cell: ({ row }) => (
            <LongText className='max-w-36'>{row.getValue('curr_total_cash')}</LongText>
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
        accessorKey: 'curr_bank_amount',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title='Curr Rcpt(BNK)' />
        ),
        size: 40,
        minSize: 40,
        maxSize: 40,
        cell: ({ row }) => (
            <LongText className='max-w-36'>{row.getValue('curr_bank_amount')}</LongText>
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
        accessorKey: 'net_balance',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title='Net Balance' />
        ),
        size: 40,
        minSize: 40,
        maxSize: 40,
        cell: ({ row }) => (
            <LongText className='max-w-36'>{row.getValue('net_balance')}</LongText>
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
    //     id: 'actions',
    //     cell: RowActions,
    // },
]

