import { Button } from '@/components/ui/button'

import { IconPlus } from '@tabler/icons-react'
import { useDeliveryVehicle } from '../contexts/delivery_vehicle-context'


export function PrimaryButtons() {
  const { setOpen } = useDeliveryVehicle()
  return (
    <div className='flex gap-2'>
      <Button className='space-x-1' onClick={() => setOpen('add')}>
        <span>Add Vehicle</span> <IconPlus size={18} />
      </Button>
    </div>
  )
}
