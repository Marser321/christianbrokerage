import { useEffect, useRef } from 'react'

const iframeResizerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/4.3.11/iframeResizer.min.js'
const iframeResizerScriptId = 'iframe-resizer-parent'
const defaultCalendarFrameClassName =
  'ghl-calendar-frame h-[940px] w-full border-0 sm:h-[880px] md:h-[780px] lg:h-[720px]'
const contentCalendarFrameClassName =
  'ghl-calendar-frame ghl-calendar-frame--content h-[680px] w-full border-0 md:h-[720px]'

let iframeResizerLoad: Promise<void> | null = null

type IframeResizeInstance = {
  iFrameResizer?: {
    close: () => void
  }
}

type ResizableIframe = HTMLIFrameElement & IframeResizeInstance

type IframeResizeOptions = {
  checkOrigin: string[]
  heightCalculationMethod: 'bodyScroll'
  minHeight: number
  scrolling: boolean
  warningTimeout: number
}

declare global {
  interface Window {
    iFrameResize?: (options: IframeResizeOptions, target: HTMLIFrameElement) => IframeResizeInstance[] | void
  }
}

type GhlCalendarFrameProps = {
  heightMode?: 'default' | 'content'
  id: string
  src: string
  title: string
}

function loadIframeResizer() {
  if (window.iFrameResize) return Promise.resolve()
  if (iframeResizerLoad) return iframeResizerLoad

  iframeResizerLoad = new Promise((resolve, reject) => {
    const existingScript = document.getElementById(iframeResizerScriptId) as HTMLScriptElement | null

    if (existingScript) {
      existingScript.addEventListener('load', () => resolve(), { once: true })
      existingScript.addEventListener('error', () => reject(new Error('Unable to load iframe resizer')), { once: true })
      return
    }

    const script = document.createElement('script')
    script.id = iframeResizerScriptId
    script.src = iframeResizerSrc
    script.async = true
    script.crossOrigin = 'anonymous'
    script.addEventListener('load', () => resolve(), { once: true })
    script.addEventListener('error', () => reject(new Error('Unable to load iframe resizer')), { once: true })
    document.head.appendChild(script)
  })

  return iframeResizerLoad
}

function getCalendarOrigin(src: string) {
  try {
    return new URL(src).origin
  } catch {
    return null
  }
}

function getCalendarMinHeight(heightMode: NonNullable<GhlCalendarFrameProps['heightMode']>) {
  if (heightMode === 'content') return 0
  if (window.matchMedia('(min-width: 1024px)').matches) return 720
  if (window.matchMedia('(min-width: 768px)').matches) return 780
  if (window.matchMedia('(min-width: 640px)').matches) return 880
  return 940
}

export function GhlCalendarFrame({ heightMode = 'default', id, src, title }: GhlCalendarFrameProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const className = heightMode === 'content' ? contentCalendarFrameClassName : defaultCalendarFrameClassName

  useEffect(() => {
    const iframe = iframeRef.current as ResizableIframe | null
    const origin = getCalendarOrigin(src)
    let isMounted = true

    if (!iframe || !origin) return undefined

    loadIframeResizer()
      .then(() => {
        if (!isMounted || !window.iFrameResize) return

        window.iFrameResize(
          {
            checkOrigin: [origin],
            heightCalculationMethod: 'bodyScroll',
            minHeight: getCalendarMinHeight(heightMode),
            scrolling: true,
            warningTimeout: 0,
          },
          iframe,
        )
      })
      .catch(() => {
        // The fixed responsive heights keep the calendar usable if the helper script is blocked.
      })

    return () => {
      isMounted = false
      iframe.iFrameResizer?.close()
    }
  }, [heightMode, src])

  return (
    <iframe
      ref={iframeRef}
      src={src}
      title={title}
      id={id}
      className={className}
      data-lenis-prevent
    />
  )
}
