import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Devuelve true cuando el usuario ya pasó el hero/encabezado de la ruta actual.
 * Lo usan los botones flotantes (WhatsApp, volver arriba) para no ser redundantes
 * mientras el hero —que ya tiene sus propios CTAs— está a la vista.
 *
 * Replica el patrón de detección de scroll del Navbar (window.scrollY funciona con
 * Lenis). El umbral usa la altura real del hero si existe; si no, ~80vh.
 * Se recalcula al cambiar de ruta (ScrollToTop resetea el scroll arriba).
 */
export function useScrolledPastHero(): boolean {
  const { pathname } = useLocation()
  const [past, setPast] = useState(false)

  useEffect(() => {
    const compute = () => {
      const hero =
        (document.querySelector('#hero') as HTMLElement | null) ??
        (document.querySelector('main > section') as HTMLElement | null)
      const threshold = hero
        ? hero.offsetTop + hero.offsetHeight - 120
        : window.innerHeight * 0.8
      setPast(window.scrollY > threshold)
    }

    compute()
    window.addEventListener('scroll', compute, { passive: true })
    window.addEventListener('resize', compute)
    return () => {
      window.removeEventListener('scroll', compute)
      window.removeEventListener('resize', compute)
    }
  }, [pathname])

  return past
}
