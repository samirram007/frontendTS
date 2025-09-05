import SignIn from '@/features/auth/sign-in';
import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/(auth)/sign-in')({
  beforeLoad: async ({ context }) => {
    if (context.auth?.user) {
      throw redirect({ to: '/dashboard' });
    }
  },
  component: SignIn,
})
