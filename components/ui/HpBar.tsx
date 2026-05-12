// components/ui/HpBar.tsx
interface HpBarProps {
  current: number
  max: number
  showLabel?: boolean
}

function hpColor(pct: number): string {
  if (pct > 0.6) return 'var(--color-hp-high)'
  if (pct > 0.3) return 'var(--color-hp-mid)'
  if (pct > 0)   return 'var(--color-hp-low)'
  return 'var(--color-hp-dead)'
}

export function HpBar({ current, max, showLabel = true }: HpBarProps) {
  const pct = max > 0 ? Math.max(0, Math.min(1, current / max)) : 0
  const color = hpColor(pct)

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between items-baseline mb-1">
          <span className="text-[10px] uppercase tracking-widest text-text-muted">HP</span>
          <span className="text-xs font-bold text-text-primary">
            {current === 0 ? '—' : `${current} / ${max}`}
          </span>
        </div>
      )}
      <div className="h-1.5 rounded-full bg-bg-elevated overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${pct * 100}%`, background: color }}
        />
      </div>
    </div>
  )
}