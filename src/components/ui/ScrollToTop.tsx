import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { scrollTo } from '../../hooks/useSmoothScroll'

type LenisGlobal = Window & {
  __lenis?: {
    scrollTo: (target: string | number | HTMLElement, options?: { immediate?: boolean; offset?: number }) => void
  }
}

export function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    const lenis = (window as LenisGlobal).__lenis
    if (hash) {
      const timer = window.setTimeout(() => {
        const id = hash.substring(1)
        const el = document.getElementById(id)
        if (el) scrollTo(el)
      }, 150)
      return () => window.clearTimeout(timer)
    }

    if (lenis) {
      lenis.scrollTo(0, { immediate: true })
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname, hash])

  return null
}
