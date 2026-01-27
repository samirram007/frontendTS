
import { ProfileDropdown } from '@/components/profile-dropdown';
import { Search } from "@/components/search";
import { ThemeSwitch } from '@/components/theme-switch';
import React from "react";
import FiscalYearSelector from './fiscal-year-selector';
import { Header } from "./header";
import { TopNav } from "./top-nav";
import { topNavLinks } from '../links/top-nav-links';


const HeaderComponent: React.FC<{}> = () => {
    return (
        <Header className='max-w-full rounded-t-md m-2 bg-cyan-800/20 dark:bg-violet-400/10'>
            <TopNav links={topNavLinks} />
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

