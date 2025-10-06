import SkipToMain from '@/components/skip-to-main'
import { SidebarProvider } from '@/components/ui/sidebar'
import { Toaster } from '@/components/ui/sonner'
import { SearchProvider } from '@/core/contexts/search-context'
import { Outlet } from '@tanstack/react-router'
import { Suspense } from 'react'
import { AppSidebar } from './components/app-sidebar'
import Footer from './components/footer'
import HeaderComponent from './components/HeaderComponent'



const AdminLayout = () => {
    return (
        <SearchProvider>

            <SidebarProvider  >
                <SkipToMain />

                <div className="flex">
                    {/* <!-- ===== Page Wrapper Start ===== --> */}
                    <div className="max-w-screen w-full relative flex  h-screen overflow-hidden ">
                        {/* <!-- ===== Sidebar Start ===== --> */}
                        {/* <Sidebar /> */}
                        <AppSidebar />
                        {/* <!-- ===== Sidebar End ===== --> */}

                        {/* <!-- ===== Content Area Start ===== --> */}
                        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                            {/* <!-- ===== Header Start ===== --> */}
                            <div className="min-h-dvh grid grid-rows-[auto_1fr_auto]">


                                <HeaderComponent />
                                {/* <!-- ===== Header End ===== --> */}

                                {/* <!-- ===== Main Content Start ===== --> */}
                                <main className="max-w-screen ">
                                    <div className="mx-auto max-w-screen-2xl px-0 md:px-6 2xl:px-10">


                                        <Suspense fallback={<Toaster />}>
                                            <Outlet />
                                        </Suspense>


                                    </div>
                                </main>
                                {/* <!-- ===== Main Content End ===== --> */}
                                <Footer />
                            </div>
                        </div>
                        {/* <!-- ===== Content Area End ===== --> */}
                    </div>
                    {/* <!-- ===== Page Wrapper End ===== --> */}
                </div>
            </SidebarProvider>
        </SearchProvider>
    )
}

export default AdminLayout