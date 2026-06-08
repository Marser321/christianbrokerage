import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useGsapTextReveal, useGsapClipReveal } from '../../hooks/useGsapEffects'
import leadershipImage from '../../assets/images/founder-portrait.png'

export function Founder() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  // 4.11 Parallax and scale motion transforms
  const imageScale = useTransform(scrollYProgress, [0, 0.5], [0.95, 1])
  const imageRotate = useTransform(scrollYProgress, [0, 0.5], [-2, 0])
  const imageY = useTransform(scrollYProgress, [0, 1], [30, -30])

  const titleRef = useGsapTextReveal({ scrub: 1, stagger: 0.03 })
  const imageRef = useGsapClipReveal('right')

  return (
    <section
      ref={sectionRef}
      id="fundadora"
      className="relative py-24 md:py-36 overflow-hidden bg-neutral-50/30"
    >
      {/* Subtle background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neutral-100/40 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Founder Portrait (Full bleed card) */}
          <div
            ref={imageRef as React.RefObject<HTMLDivElement>}
            className="lg:col-span-5 order-1"
          >
            <motion.div
              style={{ scale: imageScale, rotate: imageRotate, y: imageY }}
              className="relative max-w-md mx-auto lg:max-w-none"
            >
              {/* Background glow circle */}
              <div className="absolute -inset-8 bg-gradient-to-br from-accent/10 via-primary-light/5 to-transparent rounded-full blur-3xl" />

              {/* 4.10 Full-bleed photograph card */}
              <div className="relative overflow-hidden rounded-[2.5rem] border border-neutral-200/40 shadow-2xl aspect-[3/4] bg-neutral-900 group">
                <img
                  src={leadershipImage}
                  alt="Liderazgo Damaris Escalante & Christian"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                {/* Subtle dark gradient mask for text contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/0 to-transparent" />
              </div>

              {/* Availability badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="absolute -bottom-4 left-4 right-4 glass-panel rounded-2xl p-4 shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="relative flex h-3 w-3">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                    <span className="relative inline-flex h-3 w-3 rounded-full bg-accent" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-primary">
                      Disponible para asesoría
                    </p>
                    <p className="text-xs text-neutral-500 font-medium">
                      Respuesta en menos de 5 minutos
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Right: Content */}
          <div className="lg:col-span-7 order-2">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 text-accent font-semibold text-xs tracking-[0.25em] uppercase mb-5"
            >
              <span className="w-8 h-px bg-accent" />
              Liderazgo
            </motion.span>

            <h2
              ref={titleRef as React.RefObject<HTMLHeadingElement>}
              className="text-4xl md:text-5xl font-serif font-bold text-primary mb-2 leading-[1.1]"
            >
              Nuestro Liderazgo
            </h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-accent font-semibold text-sm tracking-wider uppercase mb-8"
            >
              Damaris Escalante & Christian
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="space-y-4 text-neutral-700 leading-relaxed mb-10 text-base md:text-lg"
            >
              <p>
                En Christian Brokerage, creemos que un servicio excepcional requiere personas comprometidas. Damaris Escalante, nuestra Coordinadora de Servicios y Especialista en Migración, lidera la atención al cliente y la optimización digital mediante CRM, asegurando respuestas casi inmediatas.
              </p>
              <p>
                Junto con Christian, especialista certificado y Enrolled Agent ante el IRS, dirigimos un equipo calificado enfocado en simplificar y coordinar tus seguros, tus impuestos federales y estatales, y tus trámites migratorios con la máxima rigurosidad técnica.
              </p>
            </motion.div>

            {/* 4.12 Quote with huge transparent icon */}
            <motion.blockquote
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="relative pl-8 border-l-[3px] border-accent mb-10 overflow-visible"
            >
              <span className="absolute -left-2 -top-12 text-[10rem] font-serif font-black text-accent/5 pointer-events-none select-none">
                “
              </span>
              <p className="relative z-10 text-lg font-serif italic text-primary/80 leading-relaxed">
                "Nuestra prioridad es que cada cliente encuentre un camino claro en su idioma, respaldado por la tecnología y un trato humano excepcional."
              </p>
            </motion.blockquote>

            {/* Credentials */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-3"
            >
              {[
                { label: '50 Estados', sub: 'Cobertura Nacional' },
                { label: '100% en Español', sub: 'Asesoría Bilingüe' },
                { label: 'IRS EA', sub: 'Enrolled Agents' },
              ].map((cred) => (
                <div
                  key={cred.sub}
                  className="px-4 py-2.5 rounded-xl bg-white border border-neutral-200/50 shadow-sm"
                >
                  <p className="text-sm font-bold text-primary">{cred.label}</p>
                  <p className="text-xs text-neutral-500 font-medium">{cred.sub}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
