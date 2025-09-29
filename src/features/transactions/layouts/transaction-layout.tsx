import { Separator } from '@/components/ui/separator'
import { Main } from '@/layouts/components/main'
import { Outlet } from '@tanstack/react-router'


const TransactionLayout = () => {
    return (

        <Main fixed>
            <div className='space-y-0.5'>
                <h1 className='text-2xl font-bold tracking-tight md:text-3xl'>
                    Transaction Gateway
                </h1>
                <p className='text-muted-foreground'>
                    Manage your transaction.
                </p>
            </div>
            <Separator className='my-1 lg:my-1' />
            <div className='flex flex-1 flex-col space-y-2 overflow-hidden md:space-y-2 lg:flex-row lg:space-y-0 lg:space-x-12'>

                <div className='flex w-full overflow-y-hidden bg-yellow-200/0'>
                    <Outlet />
                </div>
            </div>
        </Main>
    )
}

export default TransactionLayout