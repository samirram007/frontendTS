import { Button } from '@/components/ui/button'
import { useVehicle } from '@/features/modules/delivery_place/contexts/vehicle-context'
import { IconUserPlus } from '@tabler/icons-react'


export function PrimaryButtons() {
  const { setOpen } = useVehicle()
  return (
    <div className='flex gap-2'>
      <Button className='space-x-1' onClick={() => setOpen('add')}>
        <span>Add Vehicle</span> <IconUserPlus size={18} />
      </Button>
    </div>
  )
}
