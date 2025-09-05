import { Separator } from '@/components/ui/separator'
import {
    IconPalette,
    IconTool,
    IconUser
} from '@tabler/icons-react'
import { Outlet } from '@tanstack/react-router'

import { Main } from '@/layouts/components/main'
import SidebarNav from './components/sidebar-nav'

export default function Accounts() {
    return (
        <>

            <Main fixed>
                <div className='space-y-0.5'>
                    <h1 className='text-2xl font-bold tracking-tight md:text-3xl'>
                        Accounts
                    </h1>
                    <p className='text-muted-foreground'>
                        Manage your company and accounts settings .
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
        title: 'Company Profile',
        icon: <IconUser size={18} />,
        href: '/masters/accounts/company',
    },
    {
        title: 'Account Nature',
        icon: <IconUser size={18} />,
        href: '/masters/accounts/account_nature',
    },
    {
        title: 'Account Group',
        icon: <IconTool size={18} />,
        href: '/masters/accounts/account_group',
    },
    {
        title: 'Account Ledger',
        icon: <IconPalette size={18} />,
        href: '/masters/accounts/account_ledger',
    },
    {
        title: 'Voucher Type',
        icon: <IconPalette size={18} />,
        href: '/masters/accounts/voucher_type',
    },
    {
        title: 'Voucher Category',
        icon: <IconPalette size={18} />,
        href: '/masters/accounts/voucher_category',
    },
    {
        title: 'Voucher Classification',
        icon: <IconPalette size={18} />,
        href: '/masters/accounts/voucher_classification',
    },
]
