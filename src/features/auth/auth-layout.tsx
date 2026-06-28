import {
  IconActivity,
  IconFlask,
  IconMicroscope,
  IconShieldCheck,
  IconTestPipe,
} from '@tabler/icons-react'

interface Props {
  children: React.ReactNode
}

const highlights = [
  {
    icon: IconTestPipe,
    title: 'Fast Turnaround',
    desc: 'Reports ready within 4–24 hours',
  },
  {
    icon: IconShieldCheck,
    title: 'NABL Accredited',
    desc: 'Certified quality you can trust',
  },
  {
    icon: IconActivity,
    title: 'Online Access',
    desc: 'Download reports anytime, anywhere',
  },
]

export default function AuthLayout({ children }: Props) {
  return (
    <div className='min-h-svh grid lg:grid-cols-2'>
      {/* Left branding panel */}
      <div className='relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-blue-950 via-blue-800 to-teal-700 p-10 text-white lg:flex'>
        {/* Background decorative circles */}
        <div className='pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/5' />
        <div className='pointer-events-none absolute -bottom-32 -left-16 h-96 w-96 rounded-full bg-white/5' />

        {/* Lab name */}
        <div className='relative flex items-center gap-3'>
          <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 shadow'>
            <IconFlask className='h-6 w-6 text-white' />
          </div>
          <div>
            <p className='text-lg font-bold leading-none tracking-tight'>PathoCare</p>
            <p className='text-xs text-blue-200'>Diagnostics &amp; Pathology</p>
          </div>
        </div>

        {/* Hero content */}
        <div className='relative space-y-8'>
          <div>
            <div className='mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs text-teal-200'>
              <IconMicroscope className='h-3.5 w-3.5' />
              Trusted by 10,000+ patients
            </div>
            <h2 className='text-3xl font-bold leading-snug'>
              Precision Diagnostics<br />for Better Health
            </h2>
            <p className='mt-3 text-sm leading-relaxed text-blue-200'>
              Accurate lab reports, seamless online access, and a team of certified
              pathologists committed to your well-being.
            </p>
          </div>

          <div className='grid gap-4'>
            {highlights.map(({ icon: Icon, title, desc }) => (
              <div key={title} className='flex items-start gap-3'>
                <div className='flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10'>
                  <Icon className='h-5 w-5 text-teal-300' />
                </div>
                <div>
                  <p className='text-sm font-semibold'>{title}</p>
                  <p className='text-xs text-blue-200'>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className='relative text-xs text-blue-300'>
          © 2025 PathoCare Diagnostics. All rights reserved.
        </p>
      </div>

      {/* Right form panel */}
      <div className='flex items-center justify-center bg-background p-8'>
        <div className='w-full max-w-sm'>
          {/* Mobile-only logo */}
          <div className='mb-8 flex items-center gap-2 lg:hidden'>
            <div className='flex h-8 w-8 items-center justify-center rounded-lg bg-blue-700'>
              <IconFlask className='h-5 w-5 text-white' />
            </div>
            <div>
              <p className='text-base font-bold leading-none'>PathoCare</p>
              <p className='text-xs text-muted-foreground'>Diagnostics &amp; Pathology</p>
            </div>
          </div>

          {children}
        </div>
      </div>
    </div>
  )
}
