import SkipToMain from '@/components/skip-to-main'
import { SidebarProvider } from '@/components/ui/sidebar'
import { Toaster } from '@/components/ui/sonner'
import { SearchProvider } from '@/core/contexts/search-context'
import { Outlet } from '@tanstack/react-router'
import { Suspense } from 'react'
import { AppSidebar } from './components/app-sidebar'
import Footer from './components/footer'
import HeaderComponent from './components/HeaderComponent'

import { GlobalContextProvider } from '@/features/global/contexts/global-context'



const ProtectedLayout = () => {
    // const router = useRouter();
    // const { permissions } = useAuth();
    // if (!permissions.includes(FEATURES.AUTHENTICATION_SIGN_IN)) {
    //     console.log("Redirecting from protected Route")
    //     router.navigate({ to: RestrictRouter.fullPath });
    //     return null;

    // }

    return (
        <GlobalContextProvider>
            <SearchProvider>

                <SidebarProvider  >
                    <SkipToMain />

                    <div className="flex">
                        {/* <!-- ===== Page Wrapper Start ===== --> */}
                        <div className="max-w-screen w-full relative flex  h-screen overflow-hidden ">

                            <AppSidebar />
                            <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden ">

                                <div className="min-h-dvh grid grid-rows-[auto_2fr_auto]">


                                    <HeaderComponent />
                                    {/* <!-- ===== Header End ===== --> */}

                                    {/* <!-- ===== Main Content Start ===== --> */}
                                    <main className="max-w-screen ">
                                        <div className="mx-auto min-h-full max-w-screen px-2 rounded-xl">


                                            <Suspense fallback={<Toaster />}>
                                                <Outlet />
                                            </Suspense>


                                        </div>
                                    </main>
                                    {/* <!-- ===== Main Content End ===== --> */}
                                    <Footer />
                                </div>
                            </div>

                        </div>
                        {/* <!-- ===== Page Wrapper End ===== --> */}
                    </div>
                </SidebarProvider>
            </SearchProvider>
        </GlobalContextProvider>
    )
}

export default ProtectedLayout