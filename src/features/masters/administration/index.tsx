import { Separator } from '@/components/ui/separator'
import {
    IconUser,
    IconUserCog
} from '@tabler/icons-react'
import { Outlet } from '@tanstack/react-router'

import SidebarInner from '@/features/global/components/sidebar-inner'
import { Main } from '@/layouts/components/main'

export default function Administration() {
    return (
        <>

            <Main fixed>
                <div className='space-y-0.5'>
                    <h1 className='text-2xl font-bold tracking-tight md:text-3xl'>
                        Organization
                    </h1>
                    <p className='text-muted-foreground'>
                        Manage your company and organization settings.
                    </p>
                </div>
                <Separator className='my-4 lg:my-6' />
                <div className='flex flex-1 flex-col space-y-2 overflow-hidden md:space-y-2 lg:flex-row lg:space-y-0 lg:space-x-12'>
                    <SidebarInner items={sidebarNavItems} />
                    <div className='flex w-full overflow-y-hidden p-1'>
                        <Outlet />
                    </div>
                </div>
            </Main>
        </>
    )
}

const sidebarNavItems = [
    {
        title: 'Company Profile',
        icon: <IconUser size={18} />,
        href: '/masters/accounts/company',
    },

    {
        title: 'Currency',
        href: '/masters/accounts/currency',
        icon: <IconUserCog />,
    },
    {
        title: 'Country',
        href: '/masters/accounts/country',
        icon: <IconUserCog />,
    },
    {
        title: 'State',
        href: '/masters/accounts/state',
        icon: <IconUserCog />,
    },
]
