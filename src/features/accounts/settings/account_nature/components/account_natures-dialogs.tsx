import { useAccountNature } from '@/features/accounts/settings/account_nature/contexts/account-nature-context'
import { AccountNaturesActionDialog } from './account_natures-action-dialog'
import { AccountNaturesDeleteDialog } from './account_natures-delete-dialog'
import { AccountNaturesInviteDialog } from './account_natures-invite-dialog'

export function AccountNaturesDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useAccountNature()
  return (
    <>
      <AccountNaturesActionDialog
        key='account_nature-add'
        open={open === 'add'}
        onOpenChange={() => setOpen('add')}
      />

      <AccountNaturesInviteDialog
        key='account_nature-invite'
        open={open === 'invite'}
        onOpenChange={() => setOpen('invite')}
      />

      {currentRow && (
        <>
          <AccountNaturesActionDialog
            key={`account_nature-edit-${currentRow.id}`}
            open={open === 'edit'}
            onOpenChange={() => {
              setOpen('edit')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />

          <AccountNaturesDeleteDialog
            key={`account_nature-delete-${currentRow.id}`}
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
