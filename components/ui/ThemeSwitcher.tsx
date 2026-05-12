// components/ui/ThemeSwitcher.tsx
'use client'

import { useTheme, THEMES } from '@/lib/theme'

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="flex gap-2 flex-wrap">
      {THEMES.map(t => (
        <button
          key={t.id}
          suppressHydrationWarning
          onClick={() => setTheme(t.id)}
          title={t.desc}
          className={`
            flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold
            border transition-all duration-150
            ${theme === t.id
              ? 'bg-accent text-bg-base border-accent'
              : 'bg-transparent text-text-secondary border-border-default hover:text-text-primary'
            }
          `}
        >
          <span>{t.emoji}</span>
          <span>{t.label}</span>
        </button>
      ))}
    </div>
  )
}