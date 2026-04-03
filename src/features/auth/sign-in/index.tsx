import { Card } from '@/components/ui/card'
import { UserAuthForm } from './components/user-auth-form'

export default function SignIn() {
  return (
    <div className='relative min-h-svh overflow-hidden bg-slate-950'>
      <div className='pointer-events-none absolute -left-32 top-0 h-80 w-80 rounded-full bg-cyan-500/15 blur-3xl' />
      <div className='pointer-events-none absolute -right-28 bottom-0 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl' />

      <div className='relative grid min-h-svh lg:grid-cols-[1.2fr_0.8fr]'>
        <section className='flex items-center px-6 py-10 sm:px-10 lg:px-16 xl:px-20'>
          <div className='w-full max-w-2xl text-slate-100'>
            <p className='mb-4 inline-flex items-center rounded-full border border-cyan-300/40 bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-200'>
              Secure Access Portal
            </p>
            <h1 className='text-4xl font-semibold tracking-tight sm:text-5xl'>
              AIPT Control Center
            </h1>
            <p className='mt-4 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg'>
              Log in to manage approvals, monitor live operations, and keep your
              business decisions backed by protected real-time intelligence.
            </p>

            <div className='mt-8 rounded-2xl border border-slate-700/70 bg-slate-900/70 p-5 sm:p-6'>
              <svg
                viewBox='0 0 620 280'
                aria-hidden='true'
                className='h-auto w-full'
              >
                <defs>
                  <linearGradient id='lineGradientFull' x1='0%' x2='100%' y1='0%' y2='0%'>
                    <stop offset='0%' stopColor='#22d3ee' />
                    <stop offset='100%' stopColor='#34d399' />
                  </linearGradient>
                </defs>
                <rect x='10' y='10' width='600' height='260' rx='20' fill='rgba(15, 23, 42, 0.82)' stroke='rgba(100, 116, 139, 0.55)' />
                <path d='M52 194 C116 156, 172 208, 234 170 S358 108, 420 134 S514 198, 566 116' fill='none' stroke='url(#lineGradientFull)' strokeWidth='8' strokeLinecap='round' />
                <circle cx='234' cy='170' r='9' fill='#22d3ee' />
                <circle cx='420' cy='134' r='9' fill='#34d399' />
                <rect x='52' y='46' width='90' height='22' rx='11' fill='rgba(34, 211, 238, 0.3)' />
                <rect x='150' y='46' width='72' height='22' rx='11' fill='rgba(52, 211, 153, 0.32)' />
                <g transform='translate(468 34)'>
                  <rect x='0' y='16' width='96' height='84' rx='14' fill='rgba(15, 23, 42, 0.96)' stroke='rgba(148, 163, 184, 0.45)' />
                  <path d='M48 30c-13 0-24 11-24 24v8h12v-8c0-6 4-12 12-12s12 6 12 12v8h12v-8c0-13-11-24-24-24z' fill='#22d3ee' />
                  <circle cx='48' cy='74' r='8' fill='#e2e8f0' />
                </g>
              </svg>
            </div>

            <div className='mt-6 grid grid-cols-1 gap-3 text-sm sm:grid-cols-3'>
              <div className='rounded-xl border border-slate-700/70 bg-slate-900/65 p-3'>
                <p className='font-semibold text-slate-100'>Encrypted Sessions</p>
                <p className='text-slate-400'>Secure login and transport-level protection.</p>
              </div>
              <div className='rounded-xl border border-slate-700/70 bg-slate-900/65 p-3'>
                <p className='font-semibold text-slate-100'>Permission Layers</p>
                <p className='text-slate-400'>Role-based controls for each critical action.</p>
              </div>
              <div className='rounded-xl border border-slate-700/70 bg-slate-900/65 p-3'>
                <p className='font-semibold text-slate-100'>Live Visibility</p>
                <p className='text-slate-400'>Instant status and performance monitoring.</p>
              </div>
            </div>
          </div>
        </section>

        <section className='flex items-center justify-center bg-background/95 px-6 py-10 sm:px-10 lg:px-12'>
          <div className='w-full max-w-lg rounded-[28px] bg-linear-to-br from-cyan-500/35 via-sky-500/10 to-emerald-500/30 p-px shadow-[0_18px_60px_-28px_rgba(2,6,23,0.75)]'>
            <Card className='relative overflow-hidden rounded-[27px] border-0 bg-linear-to-b from-white via-background to-slate-100/70 p-7 sm:p-8'>
              <div className='pointer-events-none absolute -right-14 -top-14 h-32 w-32 rounded-full bg-cyan-500/10 blur-2xl' />
              <div className='pointer-events-none absolute -bottom-16 left-0 h-32 w-32 rounded-full bg-emerald-500/10 blur-2xl' />

              <div className='relative'>
                <div className='mb-4 flex items-center justify-between'>
                  <div className='text-sm font-semibold tracking-wide text-muted-foreground'>
                    {import.meta.env.VITE_APP_NAME}
                  </div>
                  <p className='rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-cyan-700'>
                    Trusted Access
                  </p>
                </div>

                <div className='flex flex-col space-y-2 text-left'>
                  <h2 className='text-3xl font-semibold tracking-tight text-slate-900'>
                    Welcome Back
                  </h2>
                  <p className='text-sm text-slate-600'>
                    Sign in to continue to your secure dashboard.
                  </p>
                </div>

                <UserAuthForm className='mt-6' />
                <p className='mt-5 border-t border-slate-200 pt-4 px-2 text-center text-xs text-slate-500 sm:px-4 sm:text-sm'>
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
              </div>
            </Card>
          </div>
        </section>
      </div>
    </div >
  )
}
