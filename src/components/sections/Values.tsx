import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Shield, Eye, Award, HeartHandshake } from 'lucide-react'
import { useGsapTextReveal } from '../../hooks/useGsapEffects'

const values = [
  {
    icon: Shield,
    title: 'Confianza',
    desc: 'No te vendemos lo más caro. Analizamos tus opciones reales en seguros, impuestos y migración con total honestidad.',
  },
  {
    icon: Eye,
    title: 'Transparencia',
    desc: 'Sin letras pequeñas ni sorpresas. Te explicamos cada detalle de tu póliza, trámite o declaración en tu idioma.',
  },
  {
    icon: HeartHandshake,
    title: 'Cercanía Familiar',
    desc: 'Te atendemos con respeto y calidez. Nos importa tu bienestar a largo plazo, no solo cerrar un trámite de paso.',
  },
  {
    icon: Award,
    title: 'Respaldo Profesional',
    desc: 'Contamos con Enrolled Agents certificados ante el IRS y expertos en trámites para garantizar procesos sin errores.',
  },
]

function ValueCard({ value, index }: { value: typeof values[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setMousePos({ x, y })
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{
        duration: 0.8,
        delay: index * 0.12,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative p-7 rounded-3xl glass-dark border border-white/[0.06] hover:border-white/[0.12] transition-all duration-500 cursor-pointer overflow-hidden"
    >
      {/* 4.7 Radial glow tracking cursor */}
      <div
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(circle 180px at ${mousePos.x}px ${mousePos.y}px, rgba(200, 162, 75, 0.16), transparent 70%)`,
        }}
      />

      <div className="relative z-10">
        {/* 4.8 3D rotateY on hover */}
        <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center mb-5 transition-transform duration-700 group-hover:[transform:rotateY(180deg)]">
          <value.icon size={22} className="text-accent" />
        </div>
        <h3 className="text-lg font-serif font-bold text-white mb-3">
          {value.title}
        </h3>
        <p className="text-sm text-white/70 leading-relaxed">
          {value.desc}
        </p>
      </div>
    </motion.div>
  )
}

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
            className="text-lg text-white/70"
          >
            No es lo que vendemos. Es{' '}
            <strong className="text-white/80">cómo te tratamos</strong>.
          </motion.p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {values.map((value, index) => (
            <ValueCard key={value.title} value={value} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
