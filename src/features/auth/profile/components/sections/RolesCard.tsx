import type { Role } from "@/features/modules/role/data/schema"

interface RolesCardProps {
  roles: Role[]
}

export function RolesCard({ roles }: RolesCardProps) {
  return (
    <div className="hacker-card p-4">
      <p className="cipher-text text-xs uppercase tracking-widest mb-3">Assigned Roles</p>
      <div className="space-y-2">
        {roles && roles.length > 0 ? (
          roles.slice(0, 3).map((role: Role) => (
            <p key={role.id} className="cipher-text text-sm dark:font-mono">• {role.name} ({role.status})</p>
          ))
        ) : (
          <p className="cipher-text text-sm dark:font-mono">• No roles assigned</p>
        )}
      </div>
    </div>
  )
}
