import AdminLayout from '@/layouts/AdminLayout';
import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async ({ context }) => {
    console.log('Checking authentication status...');

    if (!context.auth?.isAuthenticated) {
      throw redirect({ to: '/sign-in' });
    }
  },
  component: AdminLayout,
  notFoundComponent: () => <div>Authenticated Not Found</div>,
})


