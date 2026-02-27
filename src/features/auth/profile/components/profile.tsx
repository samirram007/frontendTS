import { useMemo } from "react"
import { useAuth } from "@/features/auth/contexts/AuthContext"
import { Skeleton } from "@/components/ui/skeleton"
import { Loader2 } from "lucide-react"
import type { Role } from "@/features/modules/role/data/schema"
import type { Permission } from "@/features/modules/permission/data/schema"

import { IdentityPacket } from "./sections/IdentityPacket"
import { RolesCard } from "./sections/RolesCard"
import { ERPExposure } from "./sections/ERPExposure"
import { SubjectCapture } from "./sections/SubjectCapture"
import { ActivityFeed } from "./sections/ActivityFeed"
import { AccessArtifacts } from "./sections/AccessArtifacts"
import { PermissionStatus } from "./sections/PermissionStatus"
import { AdminInfo } from "./sections/AdminInfo"
import { StatsFooter } from "./sections/StatsFooter"

export function Profile() {
  const { user: profileData, isLoading, userFiscalYear } = useAuth()

  const extractedPermissions = useMemo(() => {
    if (!profileData?.roles || profileData.roles.length === 0) {
      return []
    }

    const permissionsMap = new Map()

    profileData.roles.forEach((role: Role) => {
      if (role.permissions && Array.isArray(role.permissions)) {
        role.permissions.forEach((permission: Permission) => {
          const featureId = permission.appModuleFeatureId
          const permissionName = permission.appModuleFeature?.name || "Unknown"
          const isGranted = permission.isAllowed

          if (!permissionsMap.has(featureId)) {
            permissionsMap.set(featureId, {
              id: permission.id,
              featureId: featureId,
              name: permissionName,
              code: permission.appModuleFeature?.code || "",
              status: permission.appModuleFeature?.status || "active",
              roleNames: [role.name],
              roleId: permission.roleId,
              granted: isGranted,
            })
          } else {
            const existing = permissionsMap.get(featureId)
            if (!existing.roleNames.includes(role.name)) {
              existing.roleNames.push(role.name)
            }
          }
        })
      }
    })

    const uniquePermissions = Array.from(permissionsMap.values()).sort((a, b) => {
      if (a.granted !== b.granted) return b.granted ? 1 : -1
      return a.name.localeCompare(b.name)
    })

    return uniquePermissions
  }, [profileData?.roles])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <Skeleton className="h-64 rounded-lg" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-32 rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (!profileData) {
    return (
      <div className="min-h-screen bg-background p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block p-4 rounded-lg bg-destructive/10 border border-destructive/30 mb-4">
            <Loader2 className="w-10 h-10 text-destructive animate-spin mx-auto" />
          </div>
          <p className="text-destructive font-semibold text-lg">Unable to load profile data</p>
          <p className="text-muted-foreground text-sm mt-2">Please refresh the page or contact support</p>
        </div>
      </div>
    )
  }

  const user = profileData
  const displayRole = user?.roles?.[0]?.name || "User"
  const isAdmin = user?.userType?.toLowerCase() === "admin"
  const activeRolesCount = user?.roles?.filter((role: Role) => role.status === "active")?.length || 0
  const totalRolesCount = user?.roles?.length || 0
  const trulyGrantedPermissions = extractedPermissions.filter(p => p.granted === 1 || p.granted === true).length
  const riskScore = Math.min(100, (trulyGrantedPermissions / Math.max(1, extractedPermissions.length)) * 100)

  const modules = [
    { name: "FI (Finance)", risk: "HIGH", exposure: 88 },
    { name: "MM (Materials)", risk: "MEDIUM", exposure: 64 },
    { name: "SD (Sales)", risk: "HIGH", exposure: 79 },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="hidden dark:block checkerboard-bg" />
      <div className="hidden dark:block background-grid" />
      <div className="hidden dark:block scan-line-effect" />

      <div className="relative z-20">
        <div className="relative max-w-7xl mx-auto px-4 py-16">
          <div className="mb-10 text-center">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 hacker-card">
              <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
              <span className="cipher-text text-xs">
                <span className="dark:hidden">PROFILE OVERVIEW</span>
                <span className="hidden dark:inline">PROFILE CONSOLE</span>
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-light tracking-wider mb-2">
              <span className="dark:hidden text-foreground font-semibold">{user?.name || "Unknown User"}</span>
              <span className="hidden dark:inline cipher-highlight">SUBJECT: {user?.name?.toUpperCase() || "UNKNOWN_USER"}</span>
            </h1>
            <p className="cipher-text text-xs uppercase tracking-[0.2em]">
              <span className="dark:hidden normal-case tracking-normal text-sm">
                User ID: {user?.id || "N/A"} | Role: {displayRole} | Type: {user?.userType || "User"}
              </span>
              <span className="hidden dark:inline">
                USER ID: {user?.id || "N/A"} | ROLE: {displayRole.toUpperCase()} | TYPE: {user?.userType?.toUpperCase() || "USER"}
              </span>
            </p>
          </div>

          <div className="hacker-card p-5 mb-12">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <p className="cipher-text text-xs uppercase mb-2">
                  <span className="dark:hidden">Account Status</span>
                  <span className="hidden dark:inline">Investigation Status</span>
                </p>
                <p className="text-lg dark:font-mono">
                  <span className="dark:hidden text-foreground font-semibold">{user?.status?.toUpperCase() === "ACTIVE" ? "Active" : "Inactive"}</span>
                  <span className="hidden dark:inline cipher-highlight">{user?.status?.toUpperCase() === "ACTIVE" ? "LIVE_MONITORING_ACTIVE" : "MONITORING_SUSPENDED"}</span>
                </p>
              </div>
              <div className="w-full md:max-w-sm">
                <div className="flex items-center justify-between mb-2">
                  <p className="cipher-text text-xs uppercase">Permission Risk Score</p>
                  <p className="cipher-highlight text-xs dark:font-mono">{Math.round(riskScore)} / 100</p>
                </div>
                <div className="h-2 rounded-sm bg-muted dark:bg-white/10 overflow-hidden">
                  <div className="h-full bg-primary dark:bg-cyan-400 animate-pulse-line" style={{ width: `${riskScore}%` }} />
                </div>
              </div>
            </div>
          </div>

    {/* col grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
        
            <div className="space-y-6">
              <IdentityPacket name={user?.name ?? undefined} email={user?.email ?? undefined} username={user?.username ?? undefined} />
              <RolesCard roles={user?.roles || []} />
              <ERPExposure modules={modules} />
            </div>

            <div className="space-y-6">
              <SubjectCapture />
              <ActivityFeed 
                status={user?.status} 
                type={user?.userType || undefined}
                fiscalYear={userFiscalYear?.fiscalYear?.name}
                permissionsCount={extractedPermissions.length}
              />
            </div>

            <div className="space-y-6">
              <AccessArtifacts 
                userId={user?.id?.toString()}
                userType={user?.userType || undefined}
                status={user?.status}
                activeRolesCount={activeRolesCount}
                totalRolesCount={totalRolesCount}
              />
              <PermissionStatus 
                totalPermissions={extractedPermissions.length}
                grantedPermissions={trulyGrantedPermissions}
                deniedPermissions={extractedPermissions.length - trulyGrantedPermissions}
              />
              <AdminInfo 
                isActive={user?.status === "active"}
                isAdmin={isAdmin}
                totalRoles={totalRolesCount}
              />
            </div>
          </div>

          <StatsFooter 
            totalPermissions={extractedPermissions.length}
            grantedPermissions={trulyGrantedPermissions}
            totalRoles={totalRolesCount}
            activeRoles={activeRolesCount}
          />

          <div className="mt-16 text-center border-t border-border-subtle pt-8">
            <p className="cipher-text text-xs">
              <span className="dark:hidden">ERP profile ready for operational review</span>
              <span className="hidden dark:inline"><span className="cipher-highlight">&gt; </span>ERP_PROFILE_RENDERED_FOR_SECURITY_AUDIT</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}


export default Profile