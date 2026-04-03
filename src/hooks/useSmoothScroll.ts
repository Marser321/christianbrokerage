import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useSmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    })

    lenis.on('scroll', ScrollTrigger.update)

    const toggleTicker = (time: number) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(toggleTicker)
    gsap.ticker.lagSmoothing(0)

    // Make lenis available globally for scroll-to functionality
    ;(window as unknown as Record<string, unknown>).__lenis = lenis

    const handleLoad = () => ScrollTrigger.refresh()
    window.addEventListener('load', handleLoad)

    return () => {
      window.removeEventListener('load', handleLoad)
      gsap.ticker.remove(toggleTicker)
      lenis.destroy()
    }
  }, [])
}

export function scrollTo(target: string | number | HTMLElement) {
  const lenis = (window as unknown as Record<string, unknown>).__lenis as any
  if (!lenis) return

  // Si intentamos hacer scroll a un ID, verificar si GSAP ScrollTrigger administra esa sección.
  // Esto previene que el ancla baje hasta el final del carrusel por los pin-spacers.
  if (typeof target === 'string' && target.startsWith('#')) {
    const id = target.substring(1)
    
    // We already imported ScrollTrigger at the top of the file
    if (ScrollTrigger) {
      const scrollTriggers = ScrollTrigger.getAll()
      // Encontrar el trigger cuyo elemento principal coincida con nuestro ID
      const st = scrollTriggers.find((t: any) => t.trigger && t.trigger.id === id)
      
      if (st && st.start !== undefined) {
        // Encontramos el anclaje exacto en el espacio de GSAP
        lenis.scrollTo(st.start - 80)
        return
      }
    }
  }

  // Fallback a Lenis nativo
  lenis.scrollTo(target, { offset: -80 })
}
