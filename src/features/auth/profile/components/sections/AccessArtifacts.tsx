interface AccessArtifactsProps {
  userId?: string
  userType?: string
  status?: string
  activeRolesCount: number
  totalRolesCount: number
}

export function AccessArtifacts({
  userId,
  userType,
  status,
  activeRolesCount,
  totalRolesCount,
}: AccessArtifactsProps) {
  return (
    <div className="hacker-card p-4">
      <p className="cipher-text text-xs uppercase tracking-widest mb-3">Access Artifacts</p>
      <div className="space-y-2 text-sm dark:font-mono">
        <p className="cipher-text">User ID: <span className="cipher-highlight">{userId || "N/A"}</span></p>
        <p className="cipher-text">Type: <span className="cipher-highlight">{userType?.toUpperCase() || "USER"}</span></p>
        <p className="cipher-text">Status: <span className="cipher-highlight">{status?.toUpperCase() || "INACTIVE"}</span></p>
        <p className="cipher-text">Active Roles: <span className="cipher-highlight">{activeRolesCount}/{totalRolesCount}</span></p>
      </div>
    </div>
  )
}
