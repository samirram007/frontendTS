
import { useStockCategory } from '../contexts/stock_category-context'
import { StockCategoryActionDialog } from './stock_category-action-dialog'
import { StockCategoryDeleteDialog } from './stock_category-delete-dialog'

export function StockCategoryDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useStockCategory()
  return (
    <>
      <StockCategoryActionDialog
        key='account_ledger-add'
        open={open === 'add'}
        onOpenChange={() => setOpen('add')}
      />



      {currentRow && (
        <>
          <StockCategoryActionDialog
            key={`account_ledger-edit-${currentRow.id}`}
            open={open === 'edit'}
            onOpenChange={() => {
              setOpen('edit')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />

          <StockCategoryDeleteDialog
            key={`account_ledger-delete-${currentRow.id}`}
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
