import { Checkbox } from '@/components/ui/checkbox'
import { cn } from '@/lib/utils'
import type { ColumnDef } from '@tanstack/react-table'
import type { TestItemReportTemplateResponseSchema } from '@/features/modules/test_item/data/schema'
import { DataTableColumnHeader } from '../../../global/components/data-table/data-table-column-header'

export const Configurationcolumns: ColumnDef<TestItemReportTemplateResponseSchema>[] = [
  // ✅ Select Checkbox Column
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

  // ✅ Test Item Column
  {
    accessorKey: 'testItem.name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Test Item' />
    ),
    cell: ({ row }) => (
      <div className='max-w-36'>
        {row.original.testItem?.name ?? '—'}
      </div>
    ),
    meta: {
      className: cn(
        'bg-background transition-colors duration-200 group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted'
      ),
    },
    enableHiding: false,
  },

  // ✅ Doctor Column
  {
    accessorKey: 'doctor.name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Doctor' />
    ),
    cell: ({ row }) => (
      <div className='max-w-36'>
        {row.original.doctor?.name ?? '—'}
      </div>
    ),
    meta: {
      className: cn(
        'bg-background transition-colors duration-200 group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted'
      ),
    },
    enableHiding: false,
  },

  // ✅ Report Template Name Column
  {
    accessorKey: 'reportTemplateName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Report Template' />
    ),
    cell: ({ row }) => (
      <div className='max-w-36'>
        {row.original.reportTemplateName ?? '—'}
      </div>
    ),
    meta: {
      className: cn(
        'bg-background transition-colors duration-200 group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted'
      ),
    },
    enableHiding: false,
  },


]
