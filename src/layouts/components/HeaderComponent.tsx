
import { ProfileDropdown } from '@/components/profile-dropdown';
import { Search } from "@/components/search";
import { ThemeSwitch } from '@/components/theme-switch';
import React from "react";
import { Header } from "./header";
import { TopNav } from "./top-nav";


const HeaderComponent: React.FC<{}> = () => {
    return (
        <Header className='max-w-full rounded-t-md m-2 bg-cyan-800/20 dark:bg-violet-400/10'>
            <TopNav links={topNav} />
            <div className='ml-auto flex items-center max-w-screen space-x-0 lg:space-x-4'>
                <Search className=' ' />
                <ThemeSwitch />
                <ProfileDropdown />
            </div>
        </Header>
    )
}

export default HeaderComponent

const topNav = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        isActive: true,
        disabled: false,
    },
    {
        title: 'Receipt Note',
        href: '/transactions/vouchers/receipt_note',
        isActive: false,
        disabled: true,
    },
    {
        title: 'Delivery Note',
        href: '/transactions/vouchers/delivery_note',
        isActive: false,
        disabled: true,
    },
    {
        title: 'Day Book',
        href: '/transactions/day_book',
        isActive: false,
        disabled: true,
    },
]