import LongText from '@/components/long-text'
// import { Checkbox } from '@/components/ui/checkbox'
import { cn } from '@/lib/utils'
import type { ColumnDef } from '@tanstack/react-table'



import type { ITestSummaryReport } from '../data/schema'
import { DataTableColumnHeader } from '@/features/tasks/components/data-table-column-header'

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
        accessorKey: 'name',
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
        accessorKey: 'voucherNo',
        header: ({ column }) => (
            <DataTableColumnHeader className='w-8' column={column} title='Booking Info' />
        ),
        size: 20,
        minSize: 40,
        maxSize: 40,
        cell: ({ row }) => (
            <LongText className='max-w-36'>{<div>
                <div className='space-x-2'>{row.original.voucherNo}({row.original.bookingDate.toString()})</div>
                <div>{row.original.name}</div>
            </div>}</LongText>
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
        accessorKey: 'tests',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title='Test' />
        ),
        cell: ({ row }) => (
            <LongText className='max-w-64'>{row.original.tests.map((test, index) => (<div key={index} className='grid grid-cols-[1fr_100px] gap-3'>
                <div>{test.printName}</div>
                <div>{test.amount}</div>
            </div>))}</LongText>
            // <LongText className='max-w-64'>{row.getValue('tests')?.map(item => (<span>{item.printName}</span>))}</LongText>
            //             <LongText className="max-w-64">
            //   {row.getValue("tests")?.map((item, index) => (
            //     <span key={index}>{item.printName}</span>
            //   ))}
            // </LongText>
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

    // {
    //     accessorKey: 'bookingDate',
    //     header: ({ column }) => (
    //         <DataTableColumnHeader column={column} title='Booking Date' />
    //     ),
    //     size: 40,
    //     minSize: 40,
    //     maxSize: 40,
    //     cell: ({ row }) => {
    //         return (
    //             <div className='flex space-x-2'>
    //                 {row.getValue('bookingDate')}
    //             </div>
    //         )
    //     },
    //     filterFn: (row, id, value) => {
    //         return value.includes(row.getValue(id))
    //     },
    //     enableHiding: false,
    //     enableSorting: false,
    // },

    {
        accessorKey: 'totalAmount',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title='Amount' />
        ),
        size: 40,
        minSize: 40,
        maxSize: 40,
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
        accessorKey: 'status',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title='Status' />
        ),
        size: 40,
        minSize: 40,
        maxSize: 40,
        cell: ({ row }) => (
            <LongText className='max-w-36'>{
                row.original.tests.map((item, index) => (
                    <div key={index}>
                        <div>{item.status}</div>
                    </div>
                ))
            }</LongText>
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
