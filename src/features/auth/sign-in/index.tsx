import { IconFlask } from '@tabler/icons-react'
import AuthLayout from '../auth-layout'
import { UserAuthForm } from './components/user-auth-form'

export default function SignIn() {
  return (
    <AuthLayout>
      <div className='space-y-7'>

        {/* Portal badge */}
        <div className='inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/8 px-3 py-1'>
          <IconFlask className='h-3 w-3 text-primary' />
          <span className='text-[11px] font-semibold tracking-widest text-primary uppercase'>
            Staff Portal
          </span>
        </div>

        {/* Heading */}
        <div className='space-y-1'>
          <h1 className='text-2xl font-bold tracking-tight text-slate-900 dark:text-white'>
            Sign in to your account
          </h1>
          <p className='text-sm text-slate-500 dark:text-slate-400'>
            Access lab reports, bookings, and diagnostics.
          </p>
        </div>

        <UserAuthForm />

        <p className='text-center text-[11px] text-slate-400 dark:text-slate-600'>
          By signing in you agree to our{' '}
          <a href='/terms' className='underline underline-offset-4 hover:text-slate-700 dark:hover:text-slate-300'>
            Terms
          </a>{' '}
          &amp;{' '}
          <a href='/privacy' className='underline underline-offset-4 hover:text-slate-700 dark:hover:text-slate-300'>
            Privacy Policy
          </a>
        </p>
      </div>
    </AuthLayout>
  )
}
