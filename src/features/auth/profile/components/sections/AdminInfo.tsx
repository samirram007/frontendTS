interface AdminInfoProps {
  isActive: boolean
  isAdmin: boolean
  totalRoles: number
}

export function AdminInfo({ isActive, isAdmin, totalRoles }: AdminInfoProps) {
  return (
    <div className="hacker-card p-4">
      <p className="cipher-text text-xs uppercase tracking-widest mb-3">Admin Info</p>
      <div className="space-y-2 text-sm dark:font-mono">
        <p className="cipher-text">• Account Active: {isActive ? "YES" : "NO"}</p>
        <p className="cipher-text">• Is Admin: {isAdmin ? "YES" : "NO"}</p>
        <p className="cipher-text">• Total Roles: {totalRoles}</p>
        <p className="cipher-highlight">• Audit Ready</p>
      </div>
    </div>
  )
}
