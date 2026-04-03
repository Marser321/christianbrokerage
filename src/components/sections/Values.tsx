import { motion } from 'framer-motion'
import { Shield, Eye, Zap, HeartHandshake } from 'lucide-react'
import { useGsapTextReveal } from '../../hooks/useGsapEffects'

const values = [
  {
    icon: Shield,
    title: 'Protección de Verdad',
    desc: 'No te vendemos la póliza más cara. Estudiamos tu caso y te recomendamos exactamente lo que necesitas. Ni más, ni menos.',
  },
  {
    icon: Eye,
    title: 'Sin Letras Pequeñas',
    desc: 'Todo lo que firmas, lo entiendes. Te explicamos cada detalle de tu póliza en tu idioma, sin términos confusos.',
  },
  {
    icon: Zap,
    title: 'Rápido y Simple',
    desc: 'Tu cotización en minutos, no en días. Procesos sencillos que respetan tu tiempo y tu paciencia.',
  },
  {
    icon: HeartHandshake,
    title: 'Siempre Contigo',
    desc: 'Tu tranquilidad no termina cuando firmas. Estamos a tu lado antes, durante y después de cualquier problema.',
  },
]

export function Values() {
  const titleRef = useGsapTextReveal({ scrub: 1 })

  return (
    <section
      id="valores"
      className="relative py-24 md:py-36 overflow-hidden noise-overlay"
      style={{
        background: 'linear-gradient(135deg, #0a2540 0%, #0d2f4f 50%, #061a2e 100%)',
      }}
    >
      {/* Decorative orbs */}
      <div className="absolute top-20 -right-32 w-[500px] h-[500px] bg-accent/[0.04] rounded-full blur-[100px]" />
      <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-primary-light/[0.03] rounded-full blur-[80px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-accent font-semibold text-xs tracking-[0.25em] uppercase mb-5"
          >
            <span className="w-8 h-px bg-accent" />
            Nuestros Valores
            <span className="w-8 h-px bg-accent" />
          </motion.span>

          <h2
            ref={titleRef as React.RefObject<HTMLHeadingElement>}
            className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6"
          >
            ¿Por qué la gente nos elige?
          </h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-lg text-white/50"
          >
            No es lo que vendemos. Es{' '}
            <strong className="text-white/80">cómo te tratamos</strong>.
          </motion.p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.12,
                ease: 'easeOut',
              }}
              whileHover={{ y: -8, scale: 1.03 }}
              className="group relative p-7 rounded-3xl glass-dark border border-white/[0.06] hover:border-white/[0.12] transition-all duration-500 cursor-pointer"
            >
              {/* Radial glow on hover */}
              <div
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background:
                    'radial-gradient(circle at 50% 0%, rgba(16, 185, 129, 0.08) 0%, transparent 60%)',
                }}
              />

              <div className="relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center mb-5 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-[-5deg]">
                  <value.icon size={22} className="text-accent" />
                </div>
                <h3 className="text-lg font-serif font-bold text-white mb-3">
                  {value.title}
                </h3>
                <p className="text-sm text-white/40 leading-relaxed">
                  {value.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
