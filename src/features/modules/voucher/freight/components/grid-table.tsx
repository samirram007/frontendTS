import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

// import { DataTablePagination } from '@/features/global/components/data-table/data-table-pagination'
import {
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type RowData,
  type SortingState,
  type VisibilityState,
} from '@tanstack/react-table'
import { useState } from 'react'
import type { StockSummarySchema } from '../../stock_summary/data/schema'
import { cn } from '@/lib/utils'



declare module '@tanstack/react-table' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    className: string
  }
}

interface DataTableProps {
  columns: ColumnDef<StockSummarySchema>[]
  data: StockSummarySchema[]
  pagination?: boolean
}

export function GridTable({ columns, data }: DataTableProps) {
  const [rowSelection, setRowSelection] = useState({})
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [sorting, setSorting] = useState<SortingState>([])

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    filterFns: {
      // Custom filter functions can be added here if needed
      fuzzy: (row, columnId, value) => {
        const columnValue = row.getValue(columnId)
        return columnValue && typeof columnValue === 'string'
          ? columnValue.toLowerCase().includes(value.toLowerCase())
          : false
      },
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })

  const totalAmount = table
    .getFilteredRowModel()
    .rows.reduce((sum, row) => {
      return sum + Number(row.original.amount ?? 0)
    }, 0)
  const gridClass = 'grid grid-cols-[20px_100px_1fr_150px_150px_150px_300px]'

  return (
    <div className='space-y-1'>
      {/* <DataTableToolbar table={table} /> */}
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className={cn(gridClass)}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      colSpan={header.colSpan}
                      className={header.column.columnDef.meta?.className ?? ''}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className={cn('group/row', gridClass)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={cell.column.columnDef.meta?.className ?? ''}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className={cn('grid', gridClass, 'items-center px-2', ' bg-accent border-b-2 border-gray-200')}>
        <div></div>
        <div>Count: {table.getRowModel().rows.length}</div>
        <div></div>
        <div></div>
        <div className='text-right font-bold'>Total:</div>
        <div className={cn("col-start-6 text-sm font-semibold text-right flex space-x-2 justify-end  ", 'pr-8 ')}>
          {totalAmount.toFixed(2)}
        </div>
        <div> </div>
      </div>

      {/* <DataTablePagination table={table} /> */}
    </div>
  )
}
