// Tokens y variants de movimiento compartidos para mantener una cadencia
// consistente en todo el sitio. Reusan el easing de marca ya presente en
// Hero/ServiceHero/NumberTicker ([0.16, 1, 0.3, 1]).
import type { Variants } from 'framer-motion'

/** Easing de marca (cubic-bezier) usado en entradas y transiciones. */
export const EASE_BRAND: [number, number, number, number] = [0.16, 1, 0.3, 1]

/** Duraciones base (segundos). */
export const DUR = { sm: 0.35, md: 0.55, lg: 0.7 } as const

/** Config de viewport para entradas que solo deben animar una vez. */
export const viewportOnce = { once: true, margin: '-60px' } as const

/** Fade + subida simple para un elemento individual. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: DUR.md, ease: EASE_BRAND } },
}

/** Contenedor que escalona la entrada de sus hijos (usar con staggerItem). */
export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
}

/** Hijo de un staggerContainer. */
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: DUR.md, ease: EASE_BRAND } },
}
