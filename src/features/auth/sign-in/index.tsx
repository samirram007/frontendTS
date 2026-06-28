import AuthLayout from '../auth-layout'
import { UserAuthForm } from './components/user-auth-form'

export default function SignIn() {
  return (
    <AuthLayout>
      <div className='space-y-6'>
        <div>
          <h1 className='text-2xl font-bold tracking-tight'>Welcome back</h1>
          <p className='mt-1 text-sm text-muted-foreground'>
            Sign in to access your lab reports and bookings
          </p>
        </div>

        <UserAuthForm />

        <p className='text-center text-xs text-muted-foreground'>
          By signing in, you agree to our{' '}
          <a
            href='/terms'
            className='underline underline-offset-4 hover:text-primary'
          >
            Terms of Service
          </a>{' '}
          and{' '}
          <a
            href='/privacy'
            className='underline underline-offset-4 hover:text-primary'
          >
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </AuthLayout>
  )
}
