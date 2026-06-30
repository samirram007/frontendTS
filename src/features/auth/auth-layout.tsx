import {
  IconDna,
  IconFlask,
  IconLock,
  IconMicroscope,
  IconReportMedical,
  IconStethoscope,
} from '@tabler/icons-react'

interface Props {
  children: React.ReactNode
}

const capabilities = [
  { icon: IconReportMedical, label: 'Digital Reports' },
  { icon: IconDna,           label: 'Genomic Testing' },
  { icon: IconLock,          label: 'HIPAA Compliant' },
  { icon: IconStethoscope,   label: 'Physician Portal' },
]

export default function AuthLayout({ children }: Props) {
  return (
    <div className='min-h-svh lg:grid lg:grid-cols-[1fr_440px]'>

      {/* ── Left: Brand panel ─────────────────────────────────── */}
      <div className='relative hidden flex-col overflow-hidden bg-white text-slate-900 lg:flex border-r border-slate-100'>

        {/* Dot-grid background */}
        <svg
          className='absolute inset-0 h-full w-full'
          xmlns='http://www.w3.org/2000/svg'
        >
          <defs>
            <pattern id='dot' x='0' y='0' width='24' height='24' patternUnits='userSpaceOnUse'>
              <circle cx='1' cy='1' r='1' fill='rgba(2,177,197,0.08)' />
            </pattern>
          </defs>
          <rect width='100%' height='100%' fill='url(#dot)' />
        </svg>

        {/* Soft glow blobs */}
        <div className='pointer-events-none absolute -top-40 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl' />
        <div className='pointer-events-none absolute bottom-0 left-0 h-80 w-80 rounded-full bg-primary/5 blur-3xl' />

        {/* Top: Logo */}
        <div className='relative z-10 flex items-center gap-3 p-8'>
          <div className='flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 ring-1 ring-primary/30'>
            <IconFlask className='h-5 w-5 text-primary' />
          </div>
          <div className='leading-none'>
            <p className='text-sm font-bold tracking-widest text-slate-800'>PATHOCARE</p>
            <p className='text-[10px] tracking-widest text-slate-400 uppercase'>Laboratory Systems</p>
          </div>
        </div>

        {/* Center: Visual + headline */}
        <div className='relative z-10 flex flex-1 flex-col items-center justify-center px-10 text-center'>

          {/* Concentric rings with icon */}
          <div className='relative mb-10 flex items-center justify-center'>
            <div className='absolute h-52 w-52 rounded-full border border-primary/10' />
            <div className='absolute h-36 w-36 rounded-full border border-primary/15' />
            <div className='h-24 w-24 rounded-full border border-primary/30 bg-primary/8 flex items-center justify-center shadow-[0_0_40px_rgba(2,177,197,0.12)]'>
              <IconMicroscope className='h-10 w-10 text-primary' />
            </div>
            {/* Orbiting accent dots */}
            <span className='absolute top-3 right-8 h-2 w-2 rounded-full bg-primary/40' />
            <span className='absolute bottom-4 left-6 h-1.5 w-1.5 rounded-full bg-primary/30' />
            <span className='absolute top-1/2 -right-1 h-1 w-1 rounded-full bg-primary/50' />
          </div>

          <h1 className='text-4xl font-bold tracking-tight text-slate-800'>
            Precision Pathology
          </h1>
          <p className='mt-3 max-w-xs text-sm leading-relaxed text-slate-500'>
            End-to-end laboratory information system — from sample intake to digital report delivery.
          </p>

          {/* Capability chips */}
          <div className='mt-10 flex flex-wrap justify-center gap-2'>
            {capabilities.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className='inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs font-medium text-slate-600'
              >
                <Icon className='h-3.5 w-3.5 text-primary' />
                {label}
              </span>
            ))}
          </div>

          {/* Thin divider + workflow steps */}
          <div className='mt-12 w-full max-w-xs'>
            <div className='flex items-center gap-2 text-[10px] uppercase tracking-widest text-slate-400'>
              <div className='h-px flex-1 bg-slate-200' />
              Workflow
              <div className='h-px flex-1 bg-slate-200' />
            </div>
            <div className='mt-4 grid grid-cols-3 gap-2 text-center'>
              {['Sample Collection', 'Lab Analysis', 'Digital Report'].map((step, i) => (
                <div key={step}>
                  <div className='mx-auto mb-2 flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary ring-1 ring-primary/20'>
                    {i + 1}
                  </div>
                  <p className='text-[10px] leading-tight text-slate-400'>{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom footer */}
        <div className='relative z-10 flex items-center justify-between p-8 text-[11px] text-slate-400'>
          <span>© 2025 PathoCare Systems Pvt. Ltd.</span>
          <span className='rounded-full bg-primary/10 px-2 py-0.5 text-primary'>v2.5.0</span>
        </div>
      </div>

      {/* ── Right: Form panel ─────────────────────────────────── */}
      <div className='relative flex min-h-svh items-center justify-center bg-white p-8 lg:min-h-0'>

        {/* Top accent line — uses brand primary */}
        <div className='absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-primary via-primary/70 to-primary/40' />

        <div className='w-full max-w-sm'>

          {/* Mobile-only logo */}
          <div className='mb-8 flex items-center gap-2 lg:hidden'>
            <div className='flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10 ring-1 ring-primary/30'>
              <IconFlask className='h-4 w-4 text-primary' />
            </div>
            <div className='leading-none'>
              <p className='text-sm font-bold tracking-widest'>PATHOCARE</p>
              <p className='text-[10px] tracking-wide text-muted-foreground uppercase'>Laboratory Systems</p>
            </div>
          </div>

          {children}
        </div>
      </div>
    </div>
  )
}
