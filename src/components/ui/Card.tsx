import { type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

interface CardProps {
  children: ReactNode
  className?: string
  glass?: boolean
  hover?: boolean
  delay?: number
}

export function Card({
  children,
  className,
  glass = true,
  hover = true,
  delay = 0,
}: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.4, 0, 0.2, 1],
      }}
      className={twMerge(
        clsx(
          'rounded-2xl p-6 md:p-8 transition-all duration-400',
          glass &&
            'bg-white/70 backdrop-blur-md border border-white/20 shadow-[0_4px_16px_rgba(10,37,64,0.06)]',
          !glass && 'bg-white border border-neutral-200 shadow-sm',
          hover &&
            'hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(10,37,64,0.12)]',
          className
        )
      )}
    >
      {children}
    </motion.div>
  )
}
