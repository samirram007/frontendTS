
import { ProfileDropdown } from '@/components/profile-dropdown';
import { Search } from "@/components/search";
import { ThemeSwitch } from '@/components/theme-switch';
import React from "react";
import { Header } from "./header";
import { TopNav } from "./top-nav";


const HeaderComponent: React.FC<{}> = () => {
    return (
        <Header className='max-w-full bg-blue-600/5 dark:bg-violet-400/10'>
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
        title: 'Overview',
        href: '/transactions/booking',
        isActive: true,
        disabled: false,
    },
    {
        title: 'Booking',
        href: '/transactions/booking/create-booking',
        isActive: false,
        disabled: true,
    },
    {
        title: 'Test Reporting',
        href: '/transactions/booking/test_report',
        isActive: false,
        disabled: true,
    },
    {
        title: 'Business Report',
        href: '/reports/business-report',
        isActive: false,
        disabled: true,
    },
]