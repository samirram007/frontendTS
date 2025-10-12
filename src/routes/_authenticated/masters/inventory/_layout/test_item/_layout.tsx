
import TestItemProvider from '@/features/modules/test_item/contexts/test_item-context'
import { createFileRoute, Outlet } from '@tanstack/react-router'
import { Loader } from 'lucide-react'

export const Route = createFileRoute(
  '/_authenticated/masters/inventory/_layout/test_item/_layout',
)({

  component: () => {
    //const { data: stockitem } = useSuspenseQuery(stockitemQueryOptions())
    return (
      <TestItemProvider>
        <Outlet />
      </TestItemProvider >
    )
  },
  errorComponent: () => <div> <span className='bg-red-400  '>Layout:</span> Error loading stock item data[]. </div>
  ,
  pendingComponent: () => <Loader className="animate-spin" />,
})


