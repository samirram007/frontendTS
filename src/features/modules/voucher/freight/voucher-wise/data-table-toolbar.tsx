import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Cross2Icon } from '@radix-ui/react-icons'
import type { Table } from '@tanstack/react-table'


import { DataTableFacetedFilter } from './data-table-faceted-filter'
import { IconFilter } from '@tabler/icons-react'
import ReportingPeriod from '@/features/global/components/reporting-period'
// import { DataTableViewOptions } from './data-table-view-options'



interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0
  const partyColumn = table.getColumn('partyName')
  return (
    <div className='flex items-center justify-end'>
      <div className='flex flex-1 flex-col-reverse gap-x-8  pr-8 items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2'>
        <Input
          placeholder='Filter ..'
          type='hidden'
          value={
            (table.getColumn('name')?.getFilterValue() as string) ?? ''
          }
          onChange={(event) =>
            table.getColumn('name')?.setFilterValue(event.target.value)
          }
          className='h-8 w-[150px] lg:w-[250px] hidden'
        />

        <ReportingPeriod />

        <div className='flex flex-row items-center gap-2'>


          <div><IconFilter className='h-6 w-6 text-blue-600' /></div>
          <div className='flex gap-x-2'>
            {/* {partyLedger.name} */}


            <div className="flex gap-x-2">
              {partyColumn && (
                <DataTableFacetedFilter
                  column={partyColumn}
                  title="Distributor"
                  options={Array.from(
                    partyColumn.getFacetedUniqueValues().keys()
                  ).map((value) => ({
                    value: value as string,
                    label: value as string,
                  }))}
                />
              )}
            </div>



          </div>
        </div>
        {isFiltered && (
          <Button
            variant='ghost'
            onClick={() => table.resetColumnFilters()}
            className='h-8 px-2 lg:px-3'
          >
            Reset
            <Cross2Icon className='ml-2 h-4 w-4' />
          </Button>
        )}
      </div>
      {/* <DataTableViewOptions table={table} /> */}
    </div>
  )
}
