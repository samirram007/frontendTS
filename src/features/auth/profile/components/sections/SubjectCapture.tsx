export function SubjectCapture() {
  return (
    <>
      <div className="dark:hidden rounded-lg border border-border bg-card p-5 text-center shadow-sm">
        <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-2 border-primary/20 bg-muted">
          <img src="/images/user.jpeg" alt="Profile avatar" className="h-full w-full object-cover" />
        </div>
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">Profile Snapshot</p>
        <p className="mt-2 text-lg font-semibold text-foreground">ERP Operator</p>
        <p className="mt-1 text-sm text-muted-foreground">Identity verified for role and access review</p>
      </div>

      <div className="hidden dark:block hacker-card p-4 text-center">
        <p className="cipher-text text-xs uppercase tracking-widest mb-3">Subject Capture</p>
        <div className="relative w-52 h-52 mx-auto animate-subtle-pulse">
          <img
            src="/images/user.jpeg"
            alt="Investigation subject"
            className="w-full h-full object-cover rounded-sm profile-glow"
          />
          <div className="absolute inset-0 bg-linear-to-b from-cyan-400/10 to-transparent rounded-sm" />
        </div>
        <p className="cipher-highlight text-sm font-mono mt-4">TRACKED_ENTITY / ERP_OPERATOR</p>
      </div>
    </>
  )
}
