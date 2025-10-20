import { Separator } from '@/components/ui/separator'
import {
    IconUser
} from '@tabler/icons-react'
import { Outlet } from '@tanstack/react-router'

import SidebarInner from '@/features/global/components/sidebar-inner'
import { Main } from '@/layouts/components/main'
import { useParty } from './context/party-context'

export default function Party() {
    const { sideBarOpen } = useParty()
    return (
        <>

            <Main fixed>
                <div className='space-y-0.5 mt-2'>
                    <h1 className='text-2xl font-bold tracking-tight md:text-3xl'>
                        Party
                    </h1>
                    <p className='text-muted-foreground'>
                        Manage your party settings.
                    </p>
                </div>
                <Separator className='my-4 lg:my-6' />
                <div className='flex flex-1 flex-col space-y-2 overflow-hidden md:space-y-2 xl:flex-row lg:space-y-0  '>
                    {sideBarOpen && (

                        <SidebarInner items={sidebarNavItems} />

                    )}
                    <div className='flex w-full h-full p-1 px-12  '>
                        <Outlet />
                    </div>
                </div>
            </Main>
        </>
    )
}

const sidebarNavItems = [
    {
        title: 'Distributor',
        visible: true,
        icon: <IconUser size={18} />,
        href: '/masters/party/distributor',
    },
    {
        title: 'Supplier',
        visible: true,
        icon: <IconUser size={18} />,
        href: '/masters/party/supplier',
    },
    {
        title: 'Transporter',
        visible: true,
        icon: <IconUser size={18} />,
        href: '/masters/party/transporter',
    },

]
