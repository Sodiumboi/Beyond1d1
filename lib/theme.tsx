// lib/theme.tsx
'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

export type Theme = 'dark' | 'dark-cho' | 'parchment' | 'arcane'

export const THEMES: { id: Theme; label: string; emoji: string; desc: string }[] = [
  { id: 'dark',      label: 'Dark',       emoji: '🌑', desc: 'Brooding parchment-gold' },
  { id: 'dark-cho',  label: 'Dark (Cho)', emoji: '🌑', desc: "Cho's muted sage edition" },
  { id: 'parchment', label: 'Parchment',  emoji: '📜', desc: 'Cream and sepia' },
  { id: 'arcane',    label: 'Arcane',     emoji: '🔮', desc: 'Deep indigo and violet' },
]

const DEFAULT_THEME: Theme = 'dark'
const STORAGE_KEY = 'beyond1d1-theme'

interface ThemeContextValue {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: DEFAULT_THEME,
  setTheme: () => {},
})

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(DEFAULT_THEME)

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as Theme | null
    if (saved && THEMES.find(t => t.id === saved)) {
      applyTheme(saved)
      setThemeState(saved)
    }
  }, [])

  function applyTheme(t: Theme) {
    document.documentElement.setAttribute('data-theme', t)
  }

  function setTheme(t: Theme) {
    applyTheme(t)
    setThemeState(t)
    localStorage.setItem(STORAGE_KEY, t)
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}