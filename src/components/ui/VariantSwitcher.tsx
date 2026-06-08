import { useState } from 'react'
import type { ComponentType } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Image as ImageIcon, ImageOff, Moon, Sparkles, Sun, SlidersHorizontal, X } from 'lucide-react'
import { useVariant } from '../../context/VariantContext'

type SegProps = {
  active: boolean
  onClick: () => void
  icon: ComponentType<{ size?: number | string }>
  label: string
}

function SegButton({ active, onClick, icon: Icon, label }: SegProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`inline-flex min-h-9 flex-1 items-center justify-center gap-1 rounded-md px-2 py-1.5 text-xs font-semibold transition ${
        active
          ? 'bg-accent text-primary shadow-[0_4px_12px_rgba(184,137,50,0.35)]'
          : 'text-muted hover:text-heading'
      }`}
    >
      <Icon size={14} />
      {label}
    </button>
  )
}

/**
 * Control flotante de demo: alterna Tema (Claro/Oscuro) y Estilo (Minimal/Completo/Combinado).
 * La elección se persiste y se refleja en la URL (?v=) desde VariantContext.
 */
export function VariantSwitcher() {
  const { theme, density, setTheme, setDensity } = useVariant()
  const [open, setOpen] = useState(false)

  return (
    <div className="fixed bottom-5 left-4 z-[60] flex flex-col items-start gap-3 sm:left-5 print:hidden">
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="w-72 rounded-xl border border-line bg-surface-card/95 p-4 shadow-premium backdrop-blur-xl"
            role="dialog"
            aria-label="Opciones de vista"
          >
            <div className="mb-3 flex items-center justify-between">
              <p className="eyebrow">Vista de demo</p>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Cerrar opciones de vista"
                className="flex h-7 w-7 items-center justify-center rounded-md text-muted transition hover:bg-surface-2 hover:text-heading"
              >
                <X size={15} />
              </button>
            </div>

            <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-muted">Tema</p>
            <div className="mb-4 flex gap-1 rounded-lg border border-line bg-surface-2/60 p-1" role="group" aria-label="Tema">
              <SegButton active={theme === 'light'} onClick={() => setTheme('light')} icon={Sun} label="Claro" />
              <SegButton active={theme === 'dark'} onClick={() => setTheme('dark')} icon={Moon} label="Oscuro" />
            </div>

            <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-muted">Estilo</p>
            <div className="flex gap-1 rounded-lg border border-line bg-surface-2/60 p-1" role="group" aria-label="Estilo">
              <SegButton active={density === 'minimal'} onClick={() => setDensity('minimal')} icon={ImageOff} label="Minimal" />
              <SegButton active={density === 'rich'} onClick={() => setDensity('rich')} icon={ImageIcon} label="Completo" />
              <SegButton active={density === 'combo'} onClick={() => setDensity('combo')} icon={Sparkles} label="Combinado" />
            </div>

            <p className="mt-4 text-[11px] leading-4 text-muted">
              Se recuerda tu elección y queda en la URL para compartir esta versión.
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <motion.button
        whileTap={{ scale: 0.94 }}
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label={open ? 'Cerrar opciones de vista' : 'Cambiar vista de la demo'}
        aria-expanded={open}
        className="flex h-12 w-12 items-center justify-center rounded-full border border-line bg-surface-card/95 text-heading shadow-premium backdrop-blur-xl transition hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        {open ? <X size={20} /> : <SlidersHorizontal size={20} />}
      </motion.button>
    </div>
  )
}
