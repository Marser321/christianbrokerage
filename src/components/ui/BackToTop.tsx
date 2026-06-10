import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { scrollTo } from '../../hooks/useSmoothScroll'
import { useScrolledPastHero } from '../../hooks/useScrolledPastHero'

/**
 * Botón flotante "volver arriba". Aparece junto al de WhatsApp una vez que se pasa
 * el hero y sube suavemente con Lenis. Desktop-only (igual que WhatsAppButton).
 */
export function BackToTop() {
  const show = useScrolledPastHero()

  return (
    <AnimatePresence>
      {show ? (
        <motion.button
          type="button"
          onClick={() => scrollTo(0)}
          aria-label="Volver arriba"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.92 }}
          className="fixed bottom-24 right-6 z-50 hidden h-11 w-11 items-center justify-center rounded-full border border-line bg-surface-card text-heading shadow-[0_10px_30px_rgba(10,37,64,0.18)] transition-colors hover:border-accent hover:text-accent md:flex"
        >
          <ArrowUp size={20} aria-hidden="true" />
        </motion.button>
      ) : null}
    </AnimatePresence>
  )
}
