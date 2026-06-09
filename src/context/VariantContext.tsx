import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'

export type Theme = 'light' | 'dark'
export type Density = 'minimal' | 'rich' | 'combo'

type VariantState = {
  theme: Theme
  density: Density
  setTheme: (theme: Theme) => void
  setDensity: (density: Density) => void
  toggleTheme: () => void
  toggleDensity: () => void
}

const STORAGE_KEY = 'cb-variant'
const DEFAULT_THEME: Theme = 'light'
const DEFAULT_DENSITY: Density = 'combo'

// URL/localStorage usan etiquetas en español para que la versión sea legible y compartible:
//   ?v=oscuro-completo  ·  ?v=claro-minimal  ·  ?v=claro-combinado
function densityLabel(density: Density): string {
  if (density === 'minimal') return 'minimal'
  if (density === 'combo') return 'combinado'
  return 'completo'
}

function densityFromLabel(label: string | undefined): Density {
  if (label === 'minimal') return 'minimal'
  if (label === 'combinado') return 'combo'
  return 'rich'
}

function encodeVariant(theme: Theme, density: Density): string {
  return `${theme === 'dark' ? 'oscuro' : 'claro'}-${densityLabel(density)}`
}

function decodeVariant(raw: string | null | undefined): { theme: Theme; density: Density } | null {
  if (!raw) return null
  const [t, d] = raw.split('-')
  if (!t) return null
  return {
    theme: t === 'oscuro' ? 'dark' : 'light',
    density: densityFromLabel(d),
  }
}

function readInitial(): { theme: Theme; density: Density } {
  if (typeof window === 'undefined') return { theme: DEFAULT_THEME, density: DEFAULT_DENSITY }
  const fromUrl = decodeVariant(new URLSearchParams(window.location.search).get('v'))
  if (fromUrl) return fromUrl
  try {
    const stored = decodeVariant(window.localStorage.getItem(STORAGE_KEY))
    if (stored) return stored
  } catch {
    /* localStorage no disponible */
  }
  return { theme: DEFAULT_THEME, density: DEFAULT_DENSITY }
}

const VariantContext = createContext<VariantState | null>(null)

export function VariantProvider({ children }: { children: ReactNode }) {
  const initial = useMemo(() => readInitial(), [])
  const [theme, setThemeState] = useState<Theme>(initial.theme)
  const [density, setDensityState] = useState<Density>(initial.density)

  // Aplica a <html>, persiste en localStorage y refleja la versión en la URL (?v=).
  useEffect(() => {
    const el = document.documentElement
    el.setAttribute('data-theme', theme)
    el.setAttribute('data-density', density)

    const encoded = encodeVariant(theme, density)
    try {
      window.localStorage.setItem(STORAGE_KEY, encoded)
    } catch {
      /* ignore */
    }

    const params = new URLSearchParams(window.location.search)
    params.set('v', encoded)
    const next = `${window.location.pathname}?${params.toString()}${window.location.hash}`
    window.history.replaceState(window.history.state, '', next)
  }, [theme, density])

  const setTheme = useCallback((value: Theme) => setThemeState(value), [])
  const setDensity = useCallback((value: Density) => setDensityState(value), [])
  const toggleTheme = useCallback(() => setThemeState((t) => (t === 'dark' ? 'light' : 'dark')), [])
  // Cicla los tres estilos: minimal → completo → combinado → minimal.
  const toggleDensity = useCallback(
    () => setDensityState((d) => (d === 'minimal' ? 'rich' : d === 'rich' ? 'combo' : 'minimal')),
    [],
  )

  const value = useMemo<VariantState>(
    () => ({ theme, density, setTheme, setDensity, toggleTheme, toggleDensity }),
    [theme, density, setTheme, setDensity, toggleTheme, toggleDensity],
  )

  return <VariantContext.Provider value={value}>{children}</VariantContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useVariant(): VariantState {
  const ctx = useContext(VariantContext)
  if (!ctx) throw new Error('useVariant debe usarse dentro de <VariantProvider>')
  return ctx
}

/** Renderiza children solo en el estilo "Completo" (rich). */
export function RichOnly({ children }: { children: ReactNode }) {
  const { density } = useVariant()
  return density === 'rich' ? <>{children}</> : null
}

/** Renderiza children solo en el estilo "Minimalista". */
export function MinimalOnly({ children }: { children: ReactNode }) {
  const { density } = useVariant()
  return density === 'minimal' ? <>{children}</> : null
}

/** Renderiza children solo en el estilo "Combinado" (combo) — acentos editoriales extra. */
export function ComboOnly({ children }: { children: ReactNode }) {
  const { density } = useVariant()
  return density === 'combo' ? <>{children}</> : null
}
