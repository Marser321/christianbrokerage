import { type ReactNode, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

interface SectionWrapperProps {
  children: ReactNode
  className?: string
  id?: string
  background?: 'white' | 'light' | 'dark' | 'gradient'
  fullWidth?: boolean
}

const bgStyles = {
  white: 'bg-white',
  light: 'bg-neutral-bg',
  dark: 'bg-primary text-white',
  gradient: 'bg-gradient-to-br from-primary via-primary-dark to-primary',
}

export function SectionWrapper({
  children,
  className,
  id,
  background = 'white',
  fullWidth = false,
}: SectionWrapperProps) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      id={id}
      className={twMerge(
        clsx(
          'relative py-20 md:py-28 lg:py-32',
          bgStyles[background],
          className
        )
      )}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        className={twMerge(
          clsx(!fullWidth && 'mx-auto max-w-7xl px-5 sm:px-6 lg:px-8')
        )}
      >
        {children}
      </motion.div>
    </section>
  )
}
