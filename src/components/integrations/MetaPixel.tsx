import { useEffect } from 'react'

type MetaPixelFn = ((...args: unknown[]) => void) & {
  queue?: unknown[]
  loaded?: boolean
  version?: string
  push?: MetaPixelFn
}

declare global {
  interface Window {
    fbq?: MetaPixelFn
    _fbq?: MetaPixelFn
  }
}

const placeholderPattern = /REPLACE|PLACEHOLDER|PIXEL_ID|YOUR_/i

export function MetaPixel() {
  useEffect(() => {
    const pixelId = import.meta.env.VITE_META_PIXEL_ID
    if (!pixelId || placeholderPattern.test(pixelId)) return

    if (!window.fbq) {
      const fbq: MetaPixelFn = (...args: unknown[]) => {
        fbq.queue?.push(args)
      }
      fbq.queue = []
      fbq.loaded = true
      fbq.version = '2.0'
      fbq.push = fbq

      window.fbq = fbq
      window._fbq = fbq

      const script = document.createElement('script')
      script.async = true
      script.src = 'https://connect.facebook.net/en_US/fbevents.js'
      document.head.appendChild(script)
    }

    window.fbq('init', pixelId)
    window.fbq('track', 'PageView')
  }, [])

  return null
}
