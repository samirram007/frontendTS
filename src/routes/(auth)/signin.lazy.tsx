/* eslint-disable import/order */
import Login from '@/features/auth/components/Login'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/(auth)/signin')({
  component: Login,
})

