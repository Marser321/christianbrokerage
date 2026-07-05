import { type ReactNode } from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

type ButtonVariant = 'primary' | 'secondary' | 'outline'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps {
  children: ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
  href?: string
  onClick?: () => void
  id?: string
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-accent hover:bg-accent-dark text-white shadow-lg shadow-accent/20 hover:shadow-accent/30',
  secondary:
    'bg-primary hover:bg-primary-light text-white shadow-lg shadow-primary/20 hover:shadow-primary/30',
  outline:
    'bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white',
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-5 py-2.5 text-sm',
  md: 'px-7 py-3.5 text-base',
  lg: 'px-9 py-4.5 text-lg',
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  href,
  onClick,
  id,
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center gap-2 font-sans font-semibold rounded-full transition-all duration-300 ease-out cursor-pointer hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent'

  const mergedClassName = twMerge(
    clsx(baseStyles, variantStyles[variant], sizeStyles[size], className)
  )

  if (href) {
    return (
      <a href={href} className={mergedClassName} id={id}>
        {children}
      </a>
    )
  }

  return (
    <button className={mergedClassName} onClick={onClick} id={id}>
      {children}
    </button>
  )
}
