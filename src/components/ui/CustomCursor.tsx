import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false)
  const [isHidden, setIsHidden] = useState(false)
  const [cursorText, setCursorText] = useState('')
  const cursorRef = useRef<HTMLDivElement>(null)

  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  const springConfig = { damping: 20, stiffness: 450, mass: 0.2 }
  const smoothX = useSpring(mouseX, springConfig)
  const smoothY = useSpring(mouseY, springConfig)

  useEffect(() => {
    // No custom cursor on touch devices
    const isTouch = window.matchMedia('(pointer: coarse)').matches
    if (isTouch) {
      setIsHidden(true)
      return
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    const handleMouseEnterInteractive = (e: Event) => {
      setIsHovering(true)
      const target = e.target as HTMLElement
      const text = target.getAttribute('data-cursor-text')
      if (text) setCursorText(text)
    }

    const handleMouseLeaveInteractive = () => {
      setIsHovering(false)
      setCursorText('')
    }

    const handleMouseLeaveWindow = () => setIsHidden(true)
    const handleMouseEnterWindow = () => setIsHidden(false)

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeaveWindow)
    document.addEventListener('mouseenter', handleMouseEnterWindow)

    // Observe interactive elements
    const addInteractiveListeners = () => {
      const interactiveElements = document.querySelectorAll(
        'a, button, [data-cursor="pointer"], input, textarea, select, [role="button"]'
      )
      interactiveElements.forEach((el) => {
        el.addEventListener('mouseenter', handleMouseEnterInteractive)
        el.addEventListener('mouseleave', handleMouseLeaveInteractive)
      })
      return interactiveElements
    }

    const elements = addInteractiveListeners()

    // MutationObserver to catch dynamically added elements
    const observer = new MutationObserver(() => {
      elements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnterInteractive)
        el.removeEventListener('mouseleave', handleMouseLeaveInteractive)
      })
      addInteractiveListeners()
    })
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeaveWindow)
      document.removeEventListener('mouseenter', handleMouseEnterWindow)
      elements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnterInteractive)
        el.removeEventListener('mouseleave', handleMouseLeaveInteractive)
      })
      observer.disconnect()
    }
  }, [mouseX, mouseY])

  if (isHidden) return null

  return (
    <>
      <motion.div
        ref={cursorRef}
        className="custom-cursor-aura"
        style={{
          left: smoothX,
          top: smoothY,
          scale: isHovering ? 2.5 : 1,
          opacity: isHovering ? 0.7 : 0.8,
          backgroundColor: isHovering ? 'rgba(16, 185, 129, 0.15)' : 'rgba(4, 76, 142, 0.1)',
          borderColor: isHovering ? 'rgba(16, 185, 129, 0.5)' : 'rgba(13, 85, 155, 0.7)',
        }}
      >
        {cursorText && isHovering && (
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="custom-cursor-text"
          >
            {cursorText}
          </motion.span>
        )}
      </motion.div>
    </>
  )
}
