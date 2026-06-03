
import Dashboard from '@/features/dashboard/index';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/dashboard')({
  component: Dashboard,
})
