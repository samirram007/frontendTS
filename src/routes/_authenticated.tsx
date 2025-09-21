import AdminLayout from '@/layouts/AdminLayout';
import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async ({ context }) => { 
    if (!context.auth?.isAuthenticated) {
      throw redirect({ to: '/sign-in' });

      //return <SignIn />
      // throw new Error('Not authenticated')
    }
  },
  // errorComponent: ({ error }) => {
  //   console.log(error, "validation")
  //   if (error.message === 'Not authenticated') {
  //     return <SignIn />
  //   }

  //   throw error
  // },
  component: AdminLayout,
  notFoundComponent: () => <div>Authenticated Not Found</div>,
})


