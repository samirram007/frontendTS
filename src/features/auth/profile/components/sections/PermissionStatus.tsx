interface PermissionStatusProps {
  totalPermissions: number
  grantedPermissions: number
  deniedPermissions: number
}

export function PermissionStatus({
  totalPermissions,
  grantedPermissions,
  deniedPermissions,
}: PermissionStatusProps) {
  return (
    <div className="hacker-card p-4">
      <p className="cipher-text text-xs uppercase tracking-widest mb-3">Permission Status</p>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <p className="cipher-text text-sm dark:font-mono">Total Permissions</p>
          <span className="cipher-highlight text-xs dark:font-mono">{totalPermissions}</span>
        </div>
        <div className="flex items-center justify-between">
          <p className="cipher-text text-sm dark:font-mono">Granted</p>
          <span className="cipher-highlight text-xs dark:font-mono">{grantedPermissions}</span>
        </div>
        <div className="flex items-center justify-between">
          <p className="cipher-text text-sm dark:font-mono">Denied</p>
          <span className="cipher-highlight text-xs dark:font-mono">{deniedPermissions}</span>
        </div>
      </div>
    </div>
  )
}
