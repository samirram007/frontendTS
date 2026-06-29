import { PasswordInput } from '@/components/password-input'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { IconLoader2 } from '@tabler/icons-react'
import { Link, useRouter } from '@tanstack/react-router'
import { type HTMLAttributes } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useAuth } from '../../contexts/AuthContext'

type UserAuthFormProps = HTMLAttributes<HTMLDivElement>

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Please enter your email' })
    .email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(1, { message: 'Please enter your password' })
    .min(7, { message: 'Password must be at least 7 characters long' }),
})

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const { login, isLoading } = useAuth()
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: '', password: '' },
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    await login(data)
      .then(() => router.invalidate())
      .catch((error) => console.error('Login failed:', error))
  }

  return (
    <div className={cn('space-y-5', className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>

          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-xs font-semibold uppercase tracking-widest text-muted-foreground'>
                  Email Address
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder='you@hospital.com'
                    type='email'
                    autoComplete='email'
                    className='h-11 text-sm'
                    {...field}
                  />
                </FormControl>
                <FormMessage className='text-xs' />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <div className='flex items-center justify-between'>
                  <FormLabel className='text-xs font-semibold uppercase tracking-widest text-muted-foreground'>
                    Password
                  </FormLabel>
                  <Link
                    to='/forgot-password'
                    className='text-[11px] font-medium text-primary hover:text-primary/80'
                  >
                    Forgot password?
                  </Link>
                </div>
                <FormControl>
                  <PasswordInput
                    placeholder='••••••••'
                    autoComplete='current-password'
                    className='h-11 text-sm'
                    {...field}
                  />
                </FormControl>
                <FormMessage className='text-xs' />
              </FormItem>
            )}
          />

          <Button
            type='submit'
            disabled={isLoading}
            className='mt-2 h-11 w-full text-sm font-semibold tracking-wide'
          >
            {isLoading
              ? <><IconLoader2 className='mr-2 h-4 w-4 animate-spin' />Signing in…</>
              : 'Sign in'
            }
          </Button>
        </form>
      </Form>
    </div>
  )
}
