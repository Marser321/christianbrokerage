import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface UseTextRevealOptions {
  trigger?: string | Element | null
  start?: string
  end?: string
  scrub?: boolean | number
  stagger?: number
  y?: number
  once?: boolean
}

/**
 * Split text into words/chars and animate them on scroll with GSAP ScrollTrigger.
 * Returns a ref to attach to the text container.
 */
export function useGsapTextReveal(options: UseTextRevealOptions = {}) {
  const ref = useRef<HTMLElement>(null)

  const {
    start = 'top 85%',
    end = 'top 20%',
    scrub = 1,
    stagger = 0.02,
    y = 60,
    once = false,
  } = options

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Skip on mobile for performance
    if (window.innerWidth < 768) return

    // Split text into words manually to avoid SplitType DOM issues
    const text = el.textContent || ''
    const words = text.split(/\s+/).filter(Boolean)

    el.innerHTML = ''
    el.style.overflow = 'hidden'

    const wordSpans: HTMLElement[] = []
    words.forEach((word, i) => {
      const wordWrapper = document.createElement('span')
      wordWrapper.style.display = 'inline-block'
      wordWrapper.style.overflow = 'hidden'
      wordWrapper.style.verticalAlign = 'bottom'
      wordWrapper.style.paddingBottom = '0.15em'

      const inner = document.createElement('span')
      inner.textContent = word
      inner.style.display = 'inline-block'
      inner.style.willChange = 'transform, opacity'
      inner.className = 'gsap-word'

      wordWrapper.appendChild(inner)
      el.appendChild(wordWrapper)

      // Add space after each word except the last
      if (i < words.length - 1) {
        const space = document.createTextNode('\u00A0')
        el.appendChild(space)
      }

      wordSpans.push(inner)
    })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: options.trigger || el,
        start,
        end,
        scrub,
        once,
      },
    })

    tl.fromTo(
      wordSpans,
      {
        y,
        opacity: 0,
        rotateX: 40,
      },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        stagger,
        ease: 'power3.out',
        duration: 1,
      }
    )

    return () => {
      tl.kill()
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === (options.trigger || el)) st.kill()
      })
    }
  }, [start, end, scrub, stagger, y, once, options.trigger])

  return ref
}

/**
 * Animate a single element with clip-path reveal on scroll
 */
export function useGsapClipReveal(direction: 'left' | 'right' | 'up' | 'down' = 'up') {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.innerWidth < 768) return

    const clipPaths = {
      up: { from: 'inset(100% 0% 0% 0%)', to: 'inset(0% 0% 0% 0%)' },
      down: { from: 'inset(0% 0% 100% 0%)', to: 'inset(0% 0% 0% 0%)' },
      left: { from: 'inset(0% 100% 0% 0%)', to: 'inset(0% 0% 0% 0%)' },
      right: { from: 'inset(0% 0% 0% 100%)', to: 'inset(0% 0% 0% 0%)' },
    }

    gsap.fromTo(
      el,
      { clipPath: clipPaths[direction].from, opacity: 0 },
      {
        clipPath: clipPaths[direction].to,
        opacity: 1,
        duration: 1.2,
        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          end: 'top 40%',
          scrub: 1,
        },
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === el) st.kill()
      })
    }
  }, [direction])

  return ref
}

/**
 * Stagger-reveal children of a container on scroll
 */
export function useGsapStaggerReveal(stagger = 0.1) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.innerWidth < 768) return

    const children = Array.from(el.children) as HTMLElement[]

    gsap.fromTo(
      children,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === el) st.kill()
      })
    }
  }, [stagger])

  return ref
}
