import LongText from '@/components/long-text'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { cn } from '@/lib/utils'
import type { ColumnDef } from '@tanstack/react-table'



import { DataTableColumnHeader } from '@/features/global/components/data-table/data-table-column-header'
import { ActiveInactiveStatusTypes } from '@/types/active-inactive-status'

import type { DayBookSchema } from '../data/schema'
import RowActions from './row-actions'

export const columns: ColumnDef<DayBookSchema>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
        className='translate-y-[2px]'
      />
    ),
    meta: {
      className: cn(
        'sticky md:table-cell left-0 z-10 rounded-tl',
        'bg-background transition-colors duration-200 group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted'
      ),
    },
    cell: ({ row }) => (

      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
        className='translate-y-[2px]'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: 'voucherDate',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Date' />
    ),
    cell: ({ row }) => {

      return (
        <LongText className='max-w-36 flex items-center gap-2'>
          {row.getValue('voucherDate')}
        </LongText>
      );
    },
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
    accessorKey: 'partyLedger',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Particulars' />
    ),
    cell: ({ row }) => {
      const { partyLedger } = row.original
      const badgeColor = 'success'
      if (!partyLedger) {
        return <div className='text-muted-foreground'>Primary</div>
      }
      return (
        <div className='flex space-x-2'>
          <Badge variant='default' className={cn('capitalize', badgeColor)}>
            {/* <div className='text-muted-foreground'>{parentId.name}: </div> */}
            {partyLedger?.name ?? 'Unknown'}
          </Badge>

        </div>
      )
    },
    enableHiding: false,
  },
  {
    accessorKey: 'voucherType',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Vch. Type' />
    ),
    cell: ({ row }) => {
      const { voucherType } = row.original
      const badgeColor = 'success'
      if (!voucherType) {
        return <div className='text-muted-foreground'>Primary</div>
      }
      return (
        <div className='flex space-x-2'>
          <Badge variant='default' className={cn('capitalize', badgeColor)}>
            {/* <div className='text-muted-foreground'>{parentId.name}: </div> */}
            {voucherType?.name ?? 'Unknown'}
          </Badge>

        </div>
      )
    },
    enableHiding: false,
  },
  {
    accessorKey: 'voucherNo',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='VchNo.' />
    ),
    cell: ({ row }) => <div>{row.getValue('voucherNo')}</div>,
    enableSorting: false,
  },
  {
    accessorKey: 'amount',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Amount' />
    ),
    cell: ({ row }) => {
      const { amount } = row.original
      const badgeColor = ActiveInactiveStatusTypes.get(amount)
      return (
        <div className='flex space-x-2'>
          <Badge variant='outline' className={cn('capitalize', badgeColor)}>
            {Number(row.getValue('amount')).toFixed(2)}
          </Badge>
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
    id: 'actions',
    cell: RowActions,
  },
]
