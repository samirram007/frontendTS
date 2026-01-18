
import { ProfileDropdown } from '@/components/profile-dropdown';
import { Search } from "@/components/search";
import { ThemeSwitch } from '@/components/theme-switch';
import React from "react";
import FiscalYearSelector from './fiscal-year-selector';
import { Header } from "./header";
import { TopNav } from "./top-nav";


const HeaderComponent: React.FC<{}> = () => {
    return (
        <Header className='max-w-full rounded-t-md m-2 bg-cyan-800/20 dark:bg-violet-400/10'>
            <TopNav links={topNav} />
            <div className='ml-auto flex items-center max-w-screen space-x-0 lg:space-x-4'>
                <Search className=' ' />
                <ThemeSwitch />
                <FiscalYearSelector visible={true} />
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
        visible: false,
        isActive: false,
        disabled: true,
    },
    {
        title: 'Received(GRN)',
        href: '/transactions/vouchers/receipt_note',
        visible: true,
        isActive: false,
        disabled: true,
    },
    {
        title: 'Delivery Note',
        href: '/transactions/vouchers/delivery_note',
        visible: true,
        isActive: false,
        disabled: true,
    },
    {
        title: 'Freight',
        href: '/transactions/freight',
        visible: true,
        isActive: false,
        disabled: false,
    },
    {
        title: 'Day Book',
        href: '/reports/day_book',
        visible: true,
        isActive: true,
        disabled: false,
    },
    {
        title: 'Stock Summary',
        href: '/reports/stock_summary',
        visible: true,
        isActive: false,
        disabled: false,
    },
]