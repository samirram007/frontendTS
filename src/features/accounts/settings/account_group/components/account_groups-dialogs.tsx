
import { useAccountGroup } from '../contexts/account-group-context'
import { AccountGroupsActionDialog } from './account_groups-action-dialog'
import { AccountGroupsDeleteDialog } from './account_groups-delete-dialog'

export function AccountGroupsDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useAccountGroup()
  return (
    <>
      <AccountGroupsActionDialog
        key='account_group-add'
        open={open === 'add'}
        onOpenChange={() => setOpen('add')}
      />



      {currentRow && (
        <>
          <AccountGroupsActionDialog
            key={`account_group-edit-${currentRow.id}`}
            open={open === 'edit'}
            onOpenChange={() => {
              setOpen('edit')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />

          <AccountGroupsDeleteDialog
            key={`account_group-delete-${currentRow.id}`}
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
