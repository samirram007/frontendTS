
import { FEATURES } from '@/data/featrures';
import ProtectedLayout from '@/layouts/ProtectedLayout';
import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_protected')({
  beforeLoad: async ({ context }) => { 
    if (!context.auth?.isAuthenticated) {
      throw redirect({ to: '/sign-in' }); 
    }
    if (!context.auth?.permissions.includes(FEATURES.AUTHENTICATION_SIGN_IN)) {
      console.log("Redirecting from protected Route")
      throw redirect({ to: '/restrict' });
    }
  },

  component: ProtectedLayout,
  errorComponent: () => <div>Authenticated Error</div>,
  notFoundComponent: () => <div>Authenticated Not Found</div>,
})




