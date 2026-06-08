import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

type LenisInstance = InstanceType<typeof Lenis>
type LenisWindow = Window & { __lenis?: LenisInstance }

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
    ;(window as LenisWindow).__lenis = lenis

    const handleLoad = () => ScrollTrigger.refresh()
    window.addEventListener('load', handleLoad)

    return () => {
      window.removeEventListener('load', handleLoad)
      gsap.ticker.remove(toggleTicker)
      lenis.destroy()
      delete (window as LenisWindow).__lenis
    }
  }, [])
}

export function scrollTo(target: string | number | HTMLElement) {
  const lenis = (window as LenisWindow).__lenis
  if (!lenis) return

  if (typeof target === 'string' && target.startsWith('#')) {
    const id = target.substring(1)
    const scrollTrigger = ScrollTrigger.getAll().find((trigger) => {
      const triggerElement = trigger.trigger
      return triggerElement instanceof HTMLElement && triggerElement.id === id
    })

    if (scrollTrigger?.start !== undefined) {
      lenis.scrollTo(scrollTrigger.start - 80)
      return
    }
  }

  lenis.scrollTo(target, { offset: -80 })
}
