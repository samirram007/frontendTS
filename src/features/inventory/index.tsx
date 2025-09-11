import { Separator } from '@/components/ui/separator'
import {
    IconPalette,
    IconTool
} from '@tabler/icons-react'
import { Outlet } from '@tanstack/react-router'

import { Main } from '@/layouts/components/main'
import SidebarNav from './components/sidebar-nav'

export default function Inventory() {
    return (
        <>

            <Main fixed>
                <div className='space-y-0.5'>
                    <h1 className='text-2xl font-bold tracking-tight md:text-3xl'>
                        Inventory
                    </h1>
                    <p className='text-muted-foreground'>
                        Manage your company and inventory settings .
                    </p>
                </div>
                <Separator className='my-4 lg:my-6' />
                <div className='flex flex-1 flex-col space-y-2 overflow-hidden md:space-y-2 lg:flex-row lg:space-y-0 lg:space-x-12'>
                    <aside className='top-0 lg:sticky lg:w-1/5'>
                        <SidebarNav items={sidebarNavItems} />
                    </aside>
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
        title: 'Stock Item',
        icon: <IconTool size={18} />,
        href: '/masters/inventory/stock_item',
    },
    {
        title: 'Stock Group',
        icon: <IconTool size={18} />,
        href: '/masters/inventory/stock_group',
    },
    {
        title: 'Stock Category',
        icon: <IconPalette size={18} />,
        href: '/masters/inventory/stock_category',
    },
    {
        title: 'Stock Unit',
        icon: <IconPalette size={18} />,
        href: '/masters/inventory/stock_unit',
    },
    {
        title: 'Unique Quantity Code',
        icon: <IconPalette size={18} />,
        href: '/masters/inventory/unique_quantity_code',
    },
    {
        title: 'Godown',
        icon: <IconPalette size={18} />,
        href: '/masters/inventory/godown',
    },
]
