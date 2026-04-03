import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

interface NumberTickerProps {
  value: number
  suffix?: string
  prefix?: string
  className?: string
  delay?: number
}

export function NumberTicker({
  value,
  suffix = '',
  prefix = '',
  className = '',
  delay = 0,
}: NumberTickerProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const [displayValue, setDisplayValue] = useState(0)
  const digits = String(value).split('')

  useEffect(() => {
    if (!isInView) return
    const timeout = setTimeout(() => {
      setDisplayValue(value)
    }, delay * 1000)
    return () => clearTimeout(timeout)
  }, [isInView, value, delay])

  return (
    <span ref={ref} className={`number-ticker ${className}`}>
      {prefix}
      <span className="inline-flex overflow-hidden">
        {digits.map((digit, i) => {
          if (isNaN(Number(digit))) {
            // Non-digit character (comma, period, etc.)
            return (
              <span key={`sep-${i}`} className="inline-block">
                {digit}
              </span>
            )
          }
          return (
            <TickerDigit
              key={i}
              targetDigit={Number(digit)}
              isActive={displayValue === value}
              delay={i * 0.07}
            />
          )
        })}
      </span>
      {suffix && <span className="ticker-suffix">{suffix}</span>}
    </span>
  )
}

function TickerDigit({
  targetDigit,
  isActive,
  delay,
}: {
  targetDigit: number
  isActive: boolean
  delay: number
}) {
  return (
    <span className="inline-block h-[1em] overflow-hidden relative" style={{ width: '0.65em' }}>
      <motion.span
        className="inline-flex flex-col items-center absolute left-0 right-0"
        initial={{ y: '-100%' }}
        animate={isActive ? { y: `${-targetDigit * 10}%` } : { y: '-100%' }}
        transition={{
          duration: 1.2,
          delay,
          ease: [0.16, 1, 0.3, 1],
          type: 'tween',
        }}
      >
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((d) => (
          <span
            key={d}
            className="block h-[1em] leading-[1em] text-center"
          >
            {d}
          </span>
        ))}
      </motion.span>
    </span>
  )
}
