// import React from 'react';

// const Dashboard = React.lazy(() => import('./components/Dashboard'));


// export { Dashboard };


import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Main } from '@/layouts/components/main'
import { Bed, LayoutDashboard, Stethoscope } from 'lucide-react'
import { ActionBoardOverview } from './features/action-board-overview'
import BedAllocationActionBoard from './features/BedAllocationFeature'

export default function Dashboard() {

    return (
        <>
            {/* ===== Top Heading ===== */}


            {/* ===== Main ===== */}
            <Main>
                <div className='mb-2 flex items-center justify-between space-y-2'>
                    <h1 className='text-2xl font-bold tracking-tight'>Action Board</h1>
                    {/* <div className='flex items-center space-x-2'>
                        <Button>Download</Button>
                    </div> */}
                </div>
                <Tabs
                    orientation='vertical'
                    defaultValue='overview'
                    className='space-y-4'
                >
                    <div className='w-full overflow-x-auto pb-2'>
                        <TabsList>
                            <TabsTrigger value='overview'>
                                <LayoutDashboard />
                                <span>Overview</span>
                            </TabsTrigger>
                            <TabsTrigger value='doctors'>
                                <Stethoscope />
                                <span>Doctors</span>
                            </TabsTrigger>
                            <TabsTrigger value='bedAllocation' >
                                <Bed />
                                <span>Bed Allocations</span>
                            </TabsTrigger>
                            <TabsTrigger value='notifications' >
                                Calendar
                            </TabsTrigger>
                        </TabsList>
                    </div>
                    <TabsContent value='overview' className='space-y-4'>
                        <ActionBoardOverview />
                    </TabsContent>
                    <TabsContent value='doctors' className='space-y-4'>

                    </TabsContent>
                    <TabsContent value='bedAllocation' className='space-y-4'>
                        <BedAllocationActionBoard />
                    </TabsContent>
                </Tabs>
            </Main>
        </>
    )
}


