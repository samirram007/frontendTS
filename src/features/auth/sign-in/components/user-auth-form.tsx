import { PasswordInput } from '@/components/password-input';
import { Button } from '@/components/ui_bk/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui_bk/form';
import { Input } from '@/components/ui_bk/input';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { IconBrandFacebook, IconBrandGithub } from '@tabler/icons-react';
import { Link, useRouter } from '@tanstack/react-router';
import { type HTMLAttributes, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
// import { useAuth } from '../../contexts/AuthContext';
import { useLoginMutation } from '../../hooks/login-user';

type UserAuthFormProps = HTMLAttributes<HTMLDivElement>;

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Please enter your email' })
    .email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(1, {
      message: 'Please enter your password',
    })
    .min(7, {
      message: 'Password must be at least 7 characters long',
    }),
})

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  // const { login } = useAuth()
  // const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {mutate,isPending,isSuccess,data} = useLoginMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  useEffect(()=>{
    console.log("use Effect in auth form called");
    console.log(isSuccess);
    if(isSuccess && data){
      if(data?.status == 200){
        router.navigate({to:'/dashboard',replace:true});
      }
      console.log("success");
      console.log("data: ",data);
    }
  },[isSuccess,data,router]);

  async function onSubmit(data: z.infer<typeof formSchema>) {
    // setIsLoading(true)
    mutate(data);
    // await login(data)
    await router.invalidate()
    // eslint-disable-next-line no-console
    // console.log(data)

    // setTimeout(() => {
    //   setIsLoading(false)
    // }, 3000)
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='grid gap-2'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder='name@example.com' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <div className='flex items-center justify-between'>
                    <FormLabel>Password</FormLabel>
                    <Link
                      to='/forgot-password'
                      className='text-sm font-medium text-muted-foreground hover:opacity-75'
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <FormControl>
                    <PasswordInput placeholder='********' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className='mt-2' disabled={isPending}>
              {isPending ? 'Logging in...' : 'Login'}
            </Button>

            <div className='relative my-2'>
              <div className='absolute inset-0 flex items-center'>
                <span className='w-full border-t' />
              </div>
              <div className='hidden relative _flex justify-center text-xs uppercase'>
                <span className='bg-background px-2 text-muted-foreground'>
                  Or continue with
                </span>
              </div>
            </div>

            <div className='_flex items-center flex-row flex-nowrap gap-2 hidden'>
              <Button
                variant='outline'
                className='w-1/2'
                type='button'
                disabled={isPending}
              >
                <IconBrandGithub className='h-4 w-4' /> GitHub
              </Button>
              <Button
                variant='outline'
                className='w-1/2'
                type='button'
                disabled={isPending}
              >
                <IconBrandFacebook className='h-4 w-4' /> Facebook
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  )
}
