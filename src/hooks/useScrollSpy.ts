import { useEffect, useState } from 'react'

/**
 * Scroll-spy: observa una lista de ids de sección y devuelve el id de la sección
 * actualmente "activa" (la que cruza una banda central del viewport). Devuelve null
 * si ninguna de las secciones existe en el DOM (p.ej. fuera del Home).
 */
export function useScrollSpy(
  ids: string[],
  rootMargin = '-45% 0px -45% 0px',
): string | null {
  const [active, setActive] = useState<string | null>(null)
  const key = ids.join(',')

  useEffect(() => {
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el))
    if (!els.length) {
      setActive(null)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
        if (!visible.length) return
        // La sección visible más alta en pantalla gana.
        const top = visible.reduce((a, b) =>
          a.boundingClientRect.top <= b.boundingClientRect.top ? a : b,
        )
        setActive((top.target as HTMLElement).id)
      },
      { rootMargin, threshold: 0 },
    )

    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
    // key cubre cambios en la lista de ids
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, rootMargin])

  return active
}
