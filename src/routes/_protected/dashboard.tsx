
import Dashboard from '@/features/dashboard';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_protected/dashboard')({
  //beforeLoad: as dashboard is not developed yet, redirect to day_book
  // beforeLoad: async () => {
  //   throw redirect({ to: '/reports/day_book' });
  // },
  component: Dashboard,
})
