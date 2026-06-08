import type { LucideIcon } from 'lucide-react'
import { Clock, MapPin, Phone, Shield, ShieldCheck, Star, Users } from 'lucide-react'

interface MarqueeBandProps {
  variant?: 'light' | 'dark'
  speed?: number
  className?: string
}

interface MarqueeItem {
  icon?: LucideIcon
  text: string
  style?: string
}

const trustItems: MarqueeItem[] = [
  { icon: ShieldCheck, text: 'IRS Enrolled Agents certificados' },
  { icon: Users, text: 'Asistencia integral en NY y EE.UU.' },
  { icon: Clock, text: 'Respuesta humana y seguimiento' },
  { icon: Star, text: 'Asesoría 100% en tu idioma' },
  { icon: MapPin, text: 'Oficina en Washington Heights' },
  { icon: ShieldCheck, text: 'Seguros • Taxes • Inmigración' },
  { icon: Star, text: 'Peticiones • Notaría • Traducciones' },
  { icon: Phone, text: 'Tu tranquilidad, nuestro compromiso' },
]

const carrierItems: MarqueeItem[] = [
  { icon: Shield, text: 'Progressive', style: 'font-sans font-black italic tracking-tight' },
  { icon: Shield, text: 'Allstate', style: 'font-serif font-semibold tracking-wider' },
  { icon: Shield, text: 'Kemper', style: 'font-sans tracking-tight font-extrabold uppercase' },
  { icon: Shield, text: 'Liberty Mutual', style: 'font-serif font-black italic' },
  { icon: Shield, text: 'Travelers', style: 'font-sans font-bold tracking-widest uppercase' },
  { icon: Shield, text: 'National General', style: 'font-sans tracking-wide uppercase font-semibold' },
  { icon: Shield, text: 'Foremost', style: 'font-serif italic font-medium' },
  { icon: Shield, text: 'Chubb', style: 'font-sans tracking-widest font-black uppercase' },
]

function MarqueeRow({
  items,
  reverse = false,
  speed = 40,
  isDark = true,
  dimmed = false,
}: {
  items: MarqueeItem[]
  reverse?: boolean
  speed?: number
  isDark?: boolean
  dimmed?: boolean
}) {
  const duration = `${(items.length * 10 * 40) / speed}s`

  return (
    <div className="overflow-hidden whitespace-nowrap">
      <div className={`inline-flex ${reverse ? 'marquee-reverse' : 'marquee-forward'}`} style={{ animationDuration: duration }}>
        {[...items, ...items].map((item, index) => {
          const Icon = item.icon || Star
          return (
            <div key={`${item.text}-${index}`} className="mx-8 inline-flex shrink-0 items-center gap-2.5 md:mx-12">
              <Icon
                size={15}
                className={isDark ? (dimmed ? 'text-primary-light/60' : 'text-accent') : dimmed ? 'text-primary-light/60' : 'text-accent-dark'}
                strokeWidth={2.5}
              />
              <span
                className={`whitespace-nowrap text-sm md:text-base ${item.style || (dimmed ? 'font-medium' : 'font-semibold')} tracking-wide ${
                  isDark ? (dimmed ? 'text-white/40' : 'text-white/80') : dimmed ? 'text-primary/45' : 'text-primary/70'
                }`}
              >
                {item.text}
              </span>
              <span className={`text-lg ${isDark ? (dimmed ? 'text-white/10' : 'text-white/20') : dimmed ? 'text-primary/10' : 'text-primary/15'}`}>
                {dimmed ? '◆' : '✦'}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export function MarqueeBand({ variant = 'dark', speed = 40, className = '' }: MarqueeBandProps) {
  const isDark = variant === 'dark'

  return (
    <div
      className={`marquee-container relative overflow-hidden ${className}`}
      style={{
        background: isDark
          ? 'linear-gradient(135deg, #0a2540 0%, #0d2f4f 100%)'
          : 'linear-gradient(135deg, #fbf8f1 0%, #f4efe5 100%)',
      }}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-accent/25" />
      <div className="py-4 md:py-5">
        <MarqueeRow items={trustItems} speed={speed} isDark={isDark} />
      </div>
      <div className="border-t border-primary/10 py-4 md:py-5">
        <MarqueeRow items={carrierItems} reverse speed={speed * 0.9} isDark={isDark} dimmed />
      </div>
      <div className="absolute inset-x-0 bottom-0 h-px bg-accent/25" />
    </div>
  )
}
