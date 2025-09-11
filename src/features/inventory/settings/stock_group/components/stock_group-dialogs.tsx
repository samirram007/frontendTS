
import { useStockGroup } from '../contexts/stock_group-context'
import { StockGroupActionDialog } from './stock_group-action-dialog'
import { StockGroupDeleteDialog } from './stock_group-delete-dialog'

export function StockGroupDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useStockGroup()
  return (
    <>
      <StockGroupActionDialog
        key='stock_group-add'
        open={open === 'add'}
        onOpenChange={() => setOpen('add')}
      />



      {currentRow && (
        <>
          <StockGroupActionDialog
            key={`stock_group-edit-${currentRow.id}`}
            open={open === 'edit'}
            onOpenChange={() => {
              setOpen('edit')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />

          <StockGroupDeleteDialog
            key={`stock_group-delete-${currentRow.id}`}
            open={open === 'delete'}
            onOpenChange={() => {
              setOpen('delete')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />
        </>
      )}
    </>
  )
}
