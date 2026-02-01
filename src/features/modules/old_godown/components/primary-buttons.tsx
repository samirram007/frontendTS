import { Button } from '@/components/ui/button'
import { IconUserPlus } from '@tabler/icons-react'
import { useStorageUnit } from '../contexts/storage-unit-context'


export function PrimaryButtons() {
  const { setOpen } = useStorageUnit()
  return (
    <div className='flex gap-2'>
      <Button className='space-x-1' onClick={() => setOpen('add')}>
        <span>Add Storage Unit</span> <IconUserPlus size={18} />
      </Button>
    </div>
  )
}
