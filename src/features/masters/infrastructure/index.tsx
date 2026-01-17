

import { Separator } from '@/components/ui/separator'
import { Main } from '@/layouts/components/main'
import { useInfrastructure } from './context/infrastructure-context';
import SidebarInner from '@/features/global/components/sidebar-inner'
import { IconUser } from '@tabler/icons-react';
import { Outlet } from '@tanstack/react-router';



export default function Infrastructure() {
    const { sideBarOpen } = useInfrastructure();

    return (
        <>
            <Main>
                <div className='space-y-0.5'>
                    <h1 className='text-2xl font-bold tracking-tight md:text-3xl'>
                        Infrastructure
                    </h1>
                    <p className='text-muted-foreground'>
                        Manage your company and infrastructure settings..
                    </p>
                </div>
                <Separator className='my-4 lg:my-6' />
                {/* <div className='flex flex-1 flex-col space-y-2 overflow-hidden md:hidden md:space-y-2 lg:flex-row lg:space-y-0 lg:space-x-12'>
                    {
                        sideBarOpen && (
                            <SidebarInner items={sidebarNavItems} />
                        )
                    }
                    <div className='flex w-full overflow-y-hidden p-1'>
                        <Outlet />
                        <h1>hello</h1>
                    </div>
                </div> */}
                <div className='flex flex-1 flex-col space-y-2 overflow-hidden md:space-y-2 lg:flex-row lg:space-y-0 lg:space-x-12'>
                    {
                        sideBarOpen && (
                            <SidebarInner items={sidebarNavItems} />
                        )
                    }
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
        title: 'Building',
        visible: true,
        icon: <IconUser size={18} />,
        href: '/masters/infrastructure/building',
    },
    {
        title: 'Floor',
        visible: true,
        icon: <IconUser size={18} />,
        href: '/masters/infrastructure/floor',
    },
    {
        title: 'Room',
        visible: true,
        icon: <IconUser size={18} />,
        href: '/masters/infrastructure/room',
    },
    {
        title: 'Bed',
        visible: true,
        icon: <IconUser size={18} />,
        href: '/masters/infrastructure/bed',
    },
    // {
    //     title: 'Currency',
    //     visible: true,
    //     href: '/masters/organization/currency',
    //     icon: <IconUserCog />,
    // },
    // {
    //     title: 'Country',
    //     visible: true,
    //     href: '/masters/organization/country',
    //     icon: <IconUserCog />,
    // },
    // {
    //     title: 'State',
    //     visible: true,
    //     href: '/masters/organization/state',
    //     icon: <IconUserCog />,
    // },
]
