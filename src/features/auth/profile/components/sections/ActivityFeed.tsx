interface ActivityFeedProps {
  status?: string
  type?: string
  fiscalYear?: string
  permissionsCount: number
}

export function ActivityFeed({ status, type, fiscalYear, permissionsCount }: ActivityFeedProps) {
  return (
    <div className="hacker-card p-4">
      <p className="cipher-text text-xs uppercase tracking-widest mb-3">Current Activity Feed</p>
      <div className="space-y-2 text-sm dark:font-mono">
        <p className="cipher-text">Status: <span className="cipher-highlight">{status?.toUpperCase() || "N/A"}</span> as of now</p>
        <p className="cipher-text">Type: <span className="cipher-highlight">{type?.toUpperCase() || "USER"}</span></p>
        <p className="cipher-text">Fiscal Year: <span className="cipher-highlight">{fiscalYear || "N/A"}</span></p>
        <p className="cipher-highlight">Total Permissions: {permissionsCount}</p>
      </div>
    </div>
  )
}
