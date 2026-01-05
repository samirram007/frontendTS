import { Card } from '@/components/ui/card'
import AuthLayout from '../auth-layout'
import { UserAuthForm } from './components/user-auth-form'
import { useEffect } from 'react';
import axiosClient from '@/utils/axios-client';

export default function SignIn() {
  useEffect(() => {
    clean_logout();
    clearAllCookies();
  }, []);
  return (
    <AuthLayout>
      <Card className='p-6'>
        <div className='flex flex-col space-y-2 text-left'>
          <h1 className='text-2xl font-semibold tracking-tight'>Login</h1>
          <p className='text-sm text-muted-foreground'>
            Enter your email and password below <br />
            to log into your account
          </p>
        </div>
        <UserAuthForm />
        <p className='mt-4 px-8 text-center text-sm text-muted-foreground'>
          By clicking login, you agree to our{' '}
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
      </Card>
    </AuthLayout>
  )
}
export function clean_logout() {
  axiosClient.post('/auth/clean_logout').catch((error) => {
    console.error('Error during logout:', error);
  });

  localStorage.removeItem('auth_token');
  localStorage.removeItem('user_data');
}
export function clearAllCookies() {
  document.cookie.split(';').forEach(cookie => {
    const eqPos = cookie.indexOf('=');
    const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
    document.cookie =
      name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
  });
}