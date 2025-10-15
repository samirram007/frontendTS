import { Separator } from '@/components/ui/separator'
import {
    IconUser,
    IconUserCog
} from '@tabler/icons-react'
import { Outlet } from '@tanstack/react-router'

import SidebarInner from '@/features/global/components/sidebar-inner'
import { Main } from '@/layouts/components/main'
import { useAdministration } from './context/administration-context'

export default function Administration() {
    const { sideBarOpen } = useAdministration()
    return (
        <>

            <Main fixed>
                <div className='space-y-0.5'>
                    <h1 className='text-2xl font-bold tracking-tight md:text-3xl'>
                        Administration
                    </h1>
                    <p className='text-muted-foreground'>
                        Manage user, role, permission etc..
                    </p>
                </div>
                <Separator className='my-4 lg:my-6' />
                <div className='flex flex-1 flex-col space-y-2 overflow-hidden md:space-y-2 lg:flex-row lg:space-y-0 lg:space-x-12'>
                    {sideBarOpen && (

                        <SidebarInner items={sidebarNavItems} />

                    )}
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
        title: 'Role',
        visible: true,
        icon: <IconUser size={18} />,
        href: '/masters/administration/role',
    },
    {
        title: 'User',
        visible: true,
        href: '/masters/administration/user',
        icon: <IconUserCog />,
    },
    {
        title: 'App Module',
        visible: true,
        href: '/masters/administration/app_module',
        icon: <IconUserCog />,
    },
    {
        title: 'App Feature',
        visible: true,
        href: '/masters/administration/app_module_feature',
        icon: <IconUserCog />,
    },
    {
        title: 'Permission',
        visible: true,
        href: '/masters/administration/permission',
        icon: <IconUserCog />,
    },
]
