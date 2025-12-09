import { Button } from '@/components/ui/button'
// import DataTableExports from '@/features/modules/business_report/features/TEST_SUMMARY/components/data-table-exports'
import { DataTableViewOptions } from '@/features/tasks/components/data-table-view-options'
import type { Table } from '@tanstack/react-table'
import { View } from 'lucide-react'


interface DataTableToolbarProps<TData> {
  table: Table<TData>,
  onPdfClick?: () => void
}

export function DataTableToolbar<TData>({
  table
}: DataTableToolbarProps<TData>) {
  // const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className='flex items-center gap-4 justify-between'>
      <div className='flex-1'></div>
      <Button>
        <View /> Preview
      </Button>
      {/* <DataTableExports onPdfDownload={onPdfClick} /> */}
      <DataTableViewOptions table={table} />
    </div>
  )
}
