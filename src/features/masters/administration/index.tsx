import { Separator } from '@/components/ui/separator'

import { Outlet } from '@tanstack/react-router'

import SidebarInner from '@/features/global/components/sidebar-inner'
import { Main } from '@/layouts/components/main'
import { useAdministration } from './context/administration-context'
import { AdministrationLinks } from '@/layouts/links/administration-links'
const sidebarNavItems = [...AdministrationLinks.map((item) => ({
    title: item.title,
    href: item.url,
    visible: item.visible,
    icon: <item.icon />
}))]
export default function Administration() {

    const { sideBarOpen, headerVisible } = useAdministration()
    return (
        <>

            <Main fixed>
                {headerVisible && (
                    <>
                <div className='space-y-0.5'>
                    <h1 className='text-2xl font-bold tracking-tight md:text-3xl'>
                        Administration
                    </h1>
                    <p className='text-muted-foreground'>
                        Manage user, role, permission etc..
                    </p>
                </div>
                <Separator className='my-4 lg:my-6' />
                    </>
                )}
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


