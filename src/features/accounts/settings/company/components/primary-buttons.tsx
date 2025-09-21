
import { Button } from '@/components/ui/button'
import { Route as CompanyDetailRoute } from '@/routes/_authenticated/masters/accounts/company/_layout/$id'

import { IconUserPlus } from '@tabler/icons-react'
import { Link } from '@tanstack/react-router'

export function PrimaryButtons() {
  // const { setOpen } = useCompany()
  return (
    <div className='flex gap-2'>
      <Button asChild className="space-x-1">
        <Link to={CompanyDetailRoute.to} params={{ id: 'new' }}>
          <span>Add Company</span>
          <IconUserPlus size={18} />
        </Link>
      </Button>
      {/* <Button className='space-x-1' onClick={() => setOpen('add')}>
        <span>Add Company</span> <IconUserPlus size={18} />
      </Button> */}
    </div >
  )
}
