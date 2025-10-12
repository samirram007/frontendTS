
import { Button } from '@/components/ui/button'
import { Route as TestItemDetailRoute } from '@/routes/_authenticated/masters/inventory/_layout/test_item/_layout/$id'

import { IconUserPlus } from '@tabler/icons-react'
import { Link } from '@tanstack/react-router'

export function PrimaryButtons() {
  // const { setOpen } = useTestItem()
  return (
    <div className='flex gap-2'>
      <Button asChild className="space-x-1">
        <Link to={TestItemDetailRoute.to} params={{ id: 'new' }}>
          <span>Add Test Item</span>
          <IconUserPlus size={18} />
        </Link>
      </Button>
      {/* <Button className='space-x-1' onClick={() => setOpen('add')}>
        <span>Add Test Item</span> <IconUserPlus size={18} />
      </Button> */}
    </div >
  )
}
