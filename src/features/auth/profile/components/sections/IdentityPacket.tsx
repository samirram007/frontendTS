interface IdentityPacketProps {
  name?: string
  email?: string
  username?: string
}

export function IdentityPacket({ name, email, username }: IdentityPacketProps) {
  return (
    <div className="hacker-card p-4">
      <p className="cipher-text text-xs uppercase tracking-widest mb-3">Identity Packet</p>
      <div className="space-y-2 text-sm dark:font-mono">
        <p className="cipher-text">Name: <span className="cipher-highlight">{name || "N/A"}</span></p>
        <p className="cipher-text">Email: <span className="cipher-highlight">{email || "N/A"}</span></p>
        <p className="cipher-text">Username: <span className="cipher-highlight">@{username || "UNKNOWN"}</span></p>
      </div>
    </div>
  )
}
