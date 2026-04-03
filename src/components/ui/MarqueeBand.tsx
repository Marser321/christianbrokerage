import { ShieldCheck, Users, Clock, Star, MapPin, Phone } from 'lucide-react'

interface MarqueeBandProps {
  variant?: 'light' | 'dark'
  speed?: number
  className?: string
}

const trustItems = [
  { icon: ShieldCheck, text: 'Licencia Activa en FL y TX' },
  { icon: Users, text: '+500 Familias Ya Confían' },
  { icon: Clock, text: 'Tu Cotización en 5 Minutos' },
  { icon: Star, text: 'Te Atendemos en Tu Idioma' },
  { icon: MapPin, text: 'Presentes en Florida y Texas' },
  { icon: Phone, text: 'Trato Cercano y Personal' },
  { icon: ShieldCheck, text: 'Auto • Hogar • Negocio • Salud' },
  { icon: Star, text: 'Sin Compromiso, Sin Presión' },
]

function MarqueeRow({
  items,
  reverse = false,
  speed = 40,
  isDark = true,
  dimmed = false,
}: {
  items: typeof trustItems
  reverse?: boolean
  speed?: number
  isDark?: boolean
  dimmed?: boolean
}) {
  const duration = `${(items.length * 10 * 40) / speed}s`

  return (
    <div className="overflow-hidden whitespace-nowrap">
      <div
        className={`inline-flex ${reverse ? 'marquee-reverse' : 'marquee-forward'}`}
        style={{ animationDuration: duration }}
      >
        {/* Duplicate items for seamless loop */}
        {[...items, ...items].map((item, i) => (
          <div
            key={`${item.text}-${i}`}
            className="inline-flex items-center gap-2.5 mx-8 md:mx-12 flex-shrink-0"
          >
            <item.icon
              size={16}
              className={isDark ? (dimmed ? 'text-primary-lighter' : 'text-accent') : (dimmed ? 'text-primary-light' : 'text-accent-dark')}
              strokeWidth={2.5}
            />
            <span
              className={`text-sm md:text-base ${dimmed ? 'font-medium' : 'font-semibold'} tracking-wide whitespace-nowrap ${
                isDark
                  ? dimmed ? 'text-white/50' : 'text-white/80'
                  : dimmed ? 'text-primary/50' : 'text-primary/70'
              }`}
            >
              {item.text}
            </span>
            <span
              className={`text-lg ${isDark ? (dimmed ? 'text-white/10' : 'text-white/20') : (dimmed ? 'text-primary/10' : 'text-primary/15')}`}
            >
              {dimmed ? '◆' : '✦'}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function MarqueeBand({ variant = 'dark', speed = 40, className = '' }: MarqueeBandProps) {
  const isDark = variant === 'dark'

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        background: isDark
          ? 'linear-gradient(135deg, #0a2540 0%, #0d2f4f 100%)'
          : 'linear-gradient(135deg, #f0f4f8 0%, #e8f4ec 100%)',
      }}
    >
      {/* Noise overlay */}
      <div className="noise-overlay absolute inset-0 pointer-events-none" />

      {/* Top edge line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: isDark
            ? 'linear-gradient(90deg, transparent, rgba(16,185,129,0.3), transparent)'
            : 'linear-gradient(90deg, transparent, rgba(10,37,64,0.1), transparent)',
        }}
      />

      {/* Row 1 — left to right */}
      <div className="py-4 md:py-5">
        <MarqueeRow items={trustItems} speed={speed} isDark={isDark} />
      </div>

      {/* Row 2 — right to left */}
      <div
        className="py-4 md:py-5 border-t"
        style={{
          borderColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(10,37,64,0.05)',
        }}
      >
        <MarqueeRow
          items={[...trustItems].reverse()}
          reverse
          speed={speed * 0.8}
          isDark={isDark}
          dimmed
        />
      </div>

      {/* Bottom edge line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background: isDark
            ? 'linear-gradient(90deg, transparent, rgba(16,185,129,0.3), transparent)'
            : 'linear-gradient(90deg, transparent, rgba(10,37,64,0.1), transparent)',
        }}
      />
    </div>
  )
}
