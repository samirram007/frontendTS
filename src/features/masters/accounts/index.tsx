import { Separator } from '@/components/ui/separator'
import {
    IconPalette,
    IconTool,
    IconUser
} from '@tabler/icons-react'
import { Outlet } from '@tanstack/react-router'

import SidebarInner from '@/features/global/components/sidebar-inner'
import { Main } from '@/layouts/components/main'
import { useAccount } from './contexts/account-context'

export default function Accounts() {
    const { sideBarOpen } = useAccount()
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
        title: 'Account Nature',
        visible: true,
        icon: <IconUser size={18} />,
        href: '/masters/accounts/account_nature',
    },
    {
        title: 'Account Group',
        visible: true,
        icon: <IconTool size={18} />,
        href: '/masters/accounts/account_group',
    },
    {
        title: 'Account Ledger',
        visible: true,
        icon: <IconPalette size={18} />,
        href: '/masters/accounts/account_ledger',
    },
    {
        title: 'Voucher Type',
        visible: true,
        icon: <IconPalette size={18} />,
        href: '/masters/accounts/voucher_type',
    },
    {
        title: 'Voucher Category',
        visible: true,
        icon: <IconPalette size={18} />,
        href: '/masters/accounts/voucher_category',
    },
    {
        title: 'Voucher Classification',
        visible: true,
        icon: <IconPalette size={18} />,
        href: '/masters/accounts/voucher_classification',
    },

]
