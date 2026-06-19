import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'

export type Theme = 'light' | 'dark'
export type Density = 'minimal' | 'rich' | 'combo'

type VariantState = {
  theme: Theme
  density: Density
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

const STORAGE_KEY = 'cb-variant'
const DEFAULT_THEME: Theme = 'light'
const DEFAULT_DENSITY: Density = 'rich'

const VariantContext = createContext<VariantState | null>(null)

export function VariantProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(DEFAULT_THEME)
  const density = DEFAULT_DENSITY

  useEffect(() => {
    const el = document.documentElement
    el.setAttribute('data-theme', theme)
    el.setAttribute('data-density', density)

    try {
      window.localStorage.removeItem(STORAGE_KEY)
    } catch {
      /* ignore */
    }

    const params = new URLSearchParams(window.location.search)
    params.delete('v')
    const search = params.toString()
    const next = `${window.location.pathname}${search ? `?${search}` : ''}${window.location.hash}`
    window.history.replaceState(window.history.state, '', next)
  }, [theme, density])

  const setTheme = useCallback((value: Theme) => setThemeState(value), [])
  const toggleTheme = useCallback(() => setThemeState((t) => (t === 'dark' ? 'light' : 'dark')), [])

  const value = useMemo<VariantState>(
    () => ({ theme, density, setTheme, toggleTheme }),
    [theme, density, setTheme, toggleTheme],
  )

  return <VariantContext.Provider value={value}>{children}</VariantContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useVariant(): VariantState {
  const ctx = useContext(VariantContext)
  if (!ctx) throw new Error('useVariant debe usarse dentro de <VariantProvider>')
  return ctx
}

export function RichOnly({ children }: { children: ReactNode }) {
  const { density } = useVariant()
  return density === 'rich' ? <>{children}</> : null
}

export function MinimalOnly({ children }: { children: ReactNode }) {
  const { density } = useVariant()
  return density === 'minimal' ? <>{children}</> : null
}

export function ComboOnly({ children }: { children: ReactNode }) {
  const { density } = useVariant()
  return density === 'combo' ? <>{children}</> : null
}
