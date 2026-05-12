// components/ui/Badge.tsx
import { getClassColor } from '@/lib/class-colors'

type StatusVariant = 'active' | 'resting' | 'archived' | 'dead'

interface StatusBadgeProps {
  status: StatusVariant
}

const statusStyles: Record<StatusVariant, { bg: string; text: string; label: string }> = {
  active:   { bg: 'var(--color-status-active-bg)',   text: 'var(--color-status-active-text)',   label: 'Active'   },
  resting:  { bg: 'var(--color-status-resting-bg)',  text: 'var(--color-status-resting-text)',  label: 'Resting'  },
  archived: { bg: 'var(--color-status-archived-bg)', text: 'var(--color-status-archived-text)', label: 'Archived' },
  dead:     { bg: 'var(--color-status-dead-bg)',     text: 'var(--color-status-dead-text)',     label: 'Dead'     },
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const s = statusStyles[status]
  return (
    <span
      style={{ background: s.bg, color: s.text }}
      className="text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded"
    >
      {s.label}
    </span>
  )
}

export function ConditionBadge({ label }: { label: string }) {
  return (
    <span
      style={{
        background: 'var(--color-condition-bg)',
        color: 'var(--color-condition-text)',
      }}
      className="text-[10px] font-semibold px-2 py-0.5 rounded"
    >
      {label}
    </span>
  )
}

export function ClassBadge({
  cls,
  level,
  colorOverride,
}: {
  cls: string
  level: number
  colorOverride?: string | null
}) {
  const { color, icon } = getClassColor(cls, colorOverride)
  return (
    <span
      style={{ background: `${color}44` }}
      className="text-[11px] font-semibold px-2 py-0.5 rounded-md inline-flex items-center gap-1"
    >
      <span>{icon}</span>
      <span>Lvl {level} {cls}</span>
    </span>
  )
}