import StateProvider from '@/features/accounts/settings/state/contexts/state-context'
import { createFileRoute, Outlet } from '@tanstack/react-router'
import { Loader } from 'lucide-react'

export const Route = createFileRoute(
  '/_authenticated/masters/accounts/state/_layout',
)({

  component: () => {
    //const { data: state } = useSuspenseQuery(stateQueryOptions())
    return (
      <StateProvider>
        <Outlet />
      </StateProvider >
    )
  },
  errorComponent: () => <div> <span className='bg-red-400  '>Layout:</span> Error loading state data[]. </div>
  ,
  pendingComponent: () => <Loader className="animate-spin" />,
})


