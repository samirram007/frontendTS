
import { Button } from '@/components/ui/button'
import { Route as TransporterDetailRoute } from '@/routes/_authenticated/masters/party/_layout/transporter/_layout/$id'

import { IconUserPlus } from '@tabler/icons-react'
import { Link } from '@tanstack/react-router'

export function PrimaryButtons() {
  // const { setOpen } = useTransporter()
  return (
    <div className='flex gap-2'>
      <Button asChild className="space-x-1">
        <Link to={TransporterDetailRoute.to} params={{ id: 'new' }}>
          <span>Add Transporter</span>
          <IconUserPlus size={18} />
        </Link>
      </Button>
      {/* <Button className='space-x-1' onClick={() => setOpen('add')}>
        <span>Add Transporter</span> <IconUserPlus size={18} />
      </Button> */}
    </div >
  )
}
