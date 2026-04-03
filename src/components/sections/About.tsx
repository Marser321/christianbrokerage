import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { NumberTicker } from '../ui/NumberTicker'
import { useGsapTextReveal, useGsapClipReveal } from '../../hooks/useGsapEffects'
import aboutImage from '../../assets/images/about-office.png'

const stats = [
  { value: 500, suffix: '+', label: 'Familias Tranquilas' },
  { value: 2, suffix: '', label: 'Estados Cubiertos' },
  { value: 100, suffix: '%', label: 'Hablamos Tu Idioma' },
  { value: 5, suffix: '', label: 'Tipos de Protección' },
]

export function About() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const imageY = useTransform(scrollYProgress, [0, 1], [50, -50])
  const imageRotate = useTransform(scrollYProgress, [0, 1], [2, -2])

  const titleRef = useGsapTextReveal({ scrub: 1 })
  const imageRef = useGsapClipReveal('left')

  return (
    <section
      ref={sectionRef}
      id="nosotros"
      className="relative py-24 md:py-36 overflow-hidden"
    >
      {/* Subtle background grid */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle, #0a2540 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Left: Image with parallax */}
          <div ref={imageRef as React.RefObject<HTMLDivElement>}>
            <motion.div
              style={{ y: imageY, rotate: imageRotate }}
              className="relative"
            >
              {/* Glow */}
              <div className="absolute -inset-6 bg-gradient-to-br from-accent/10 via-primary-light/5 to-transparent rounded-[2rem] blur-2xl" />

              <div className="relative overflow-hidden rounded-[1.5rem]">
                <img
                  src={aboutImage}
                  alt="Oficina First Choice Insurance Group"
                  className="w-full object-cover aspect-[4/3] rounded-[1.5rem]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent rounded-[1.5rem]" />
              </div>

              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="absolute -bottom-5 -right-5 glass-panel rounded-2xl px-5 py-3 shadow-xl"
              >
                <p className="text-xs text-neutral-400 mb-1">Desde</p>
                <p className="text-2xl font-serif font-bold text-primary">2020</p>
              </motion.div>
            </motion.div>
          </div>

          {/* Right: Content */}
          <div>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 text-accent font-semibold text-xs tracking-[0.25em] uppercase mb-5"
            >
              <span className="w-8 h-px bg-accent" />
              Sobre Nosotros
            </motion.span>

            {/* GSAP text reveal title */}
            <h2
              ref={titleRef as React.RefObject<HTMLHeadingElement>}
              className="text-4xl md:text-5xl font-serif font-bold text-primary mb-8 leading-[1.1]"
            >
              No somos una aseguradora más. Somos tu aliado.
            </h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-4 text-neutral-500 leading-relaxed mb-10"
            >
              <p>
                ¿Alguna vez sentiste que nadie te explicó bien tu seguro? En{' '}
                <strong className="text-primary">First Choice Insurance Group</strong>,
                eso no pasa. Comparamos opciones de varias aseguradoras y te
                mostramos cuál es la mejor para tu bolsillo y tu situación.
              </p>
              <p>
                Nuestro equipo habla tu idioma y está comprometido con la{' '}
                <strong className="text-primary">transparencia</strong>. No solo
                te damos un papel con números: te{' '}
                <strong className="text-primary">explicamos</strong> lo que
                significa cada línea para que decidas con confianza.
              </p>
            </motion.div>

            {/* Stats with Number Tickers */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="text-center lg:text-left"
                >
                  <div className="text-3xl md:text-4xl font-serif font-bold text-primary mb-1">
                    <NumberTicker value={stat.value} suffix={stat.suffix} delay={0.2 + i * 0.15} />
                  </div>
                  <p className="text-xs text-neutral-400 uppercase tracking-wider">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
