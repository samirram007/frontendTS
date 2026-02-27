interface StatsFooterProps {
  totalPermissions: number
  grantedPermissions: number
  totalRoles: number
  activeRoles: number
}

export function StatsFooter({
  totalPermissions,
  grantedPermissions,
  totalRoles,
  activeRoles,
}: StatsFooterProps) {
  return (
    <div className="mt-16 hacker-card p-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div>
          <p className="cipher-text text-xs uppercase mb-2">Total Permissions</p>
          <p className="cipher-highlight text-2xl dark:font-mono">{totalPermissions}</p>
        </div>
        <div>
          <p className="cipher-text text-xs uppercase mb-2">Permissions Granted</p>
          <p className="cipher-highlight text-2xl dark:font-mono">{grantedPermissions}</p>
        </div>
        <div>
          <p className="cipher-text text-xs uppercase mb-2">Assigned Roles</p>
          <p className="cipher-highlight text-2xl dark:font-mono">{totalRoles}</p>
        </div>
        <div>
          <p className="cipher-text text-xs uppercase mb-2">Active Roles</p>
          <p className="cipher-highlight text-2xl dark:font-mono">{activeRoles}</p>
        </div>
      </div>
    </div>
  )
}
