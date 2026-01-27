
import { Button } from '@/components/ui/button'
import { Route as RoomDetailRoute } from '@/routes/_protected/masters/infrastructure/_layout/room/_layout/$id'

import { IconUserPlus } from '@tabler/icons-react'
import { Link } from '@tanstack/react-router'

export function PrimaryButtons() {
    // const { setOpen } = useCompany()
    return (
        <div className='flex gap-2'>
            <Button asChild className="space-x-1">
                <Link to={RoomDetailRoute.to} params={{ id: 'new' }}>
                    <span>Add Room</span>
                    <IconUserPlus size={18} />
                </Link>
            </Button>
        </div >
    )
}
