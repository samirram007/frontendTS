import { Button } from '@/components/ui/button'
import { useAccountNature } from '@/features/accounts/settings/account_nature/contexts/account-nature-context'
import { IconUserPlus } from '@tabler/icons-react'


export function AccountNaturesPrimaryButtons() {
  const { setOpen } = useAccountNature()
  return (
    <div className='flex gap-2'>
      {/* <Button
        variant='outline'
        className='space-x-1'
        onClick={() => setOpen('invite')}
      >
        <span>Invite User</span> <IconMailPlus size={18} />
      </Button> */}
      <Button className='space-x-1' onClick={() => setOpen('add')}>
        <span>Add Account Nature</span> <IconUserPlus size={18} />
      </Button>
    </div>
  )
}
