interface Module {
  name: string
  risk: string
  exposure: number
}

interface ERPExposureProps {
  modules: Module[]
}

export function ERPExposure({ modules }: ERPExposureProps) {
  return (
    <div className="hacker-card p-4">
      <p className="cipher-text text-xs uppercase tracking-widest mb-3">ERP Asset Exposure</p>
      <div className="space-y-3">
        {modules.map((module) => (
          <div key={module.name}>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="cipher-text">{module.name}</span>
              <span className="cipher-highlight dark:font-mono">{module.risk}</span>
            </div>
            <div className="h-1.5 bg-muted dark:bg-white/10 rounded-sm overflow-hidden">
              <div className="h-full bg-primary dark:bg-cyan-400" style={{ width: `${module.exposure}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
