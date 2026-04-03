import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useGsapTextReveal, useGsapClipReveal } from '../../hooks/useGsapEffects'
import founderImage from '../../assets/images/founder.png'

export function Founder() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const imageScale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1])
  const imageRotate = useTransform(scrollYProgress, [0, 0.5], [-3, 0])

  const titleRef = useGsapTextReveal({ scrub: 1, stagger: 0.03 })
  const imageRef = useGsapClipReveal('right')

  return (
    <section
      ref={sectionRef}
      id="fundadora"
      className="relative py-24 md:py-36 overflow-hidden"
    >
      {/* Subtle background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neutral-50/50 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Image */}
          <div
            ref={imageRef as React.RefObject<HTMLDivElement>}
            className="lg:col-span-5 order-1"
          >
            <motion.div
              style={{ scale: imageScale, rotate: imageRotate }}
              className="relative max-w-md mx-auto lg:max-w-none"
            >
              {/* Background glow circle */}
              <div className="absolute -inset-8 bg-gradient-to-br from-accent/10 via-primary-light/5 to-transparent rounded-full blur-3xl" />

              <div className="relative overflow-hidden rounded-[2rem]">
                <img
                  src={founderImage}
                  alt="Inelvis Maytin — Fundadora de FCIG"
                  className="w-full object-cover aspect-[3/4] rounded-[2rem]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent rounded-[2rem]" />
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
                      Disponible para consultas
                    </p>
                    <p className="text-xs text-neutral-500 font-medium">
                      Respuesta en menos de 24h
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
              Conoce a Inelvis
            </h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-accent font-semibold text-sm tracking-wider uppercase mb-8"
            >
              Fundadora & Agente Principal
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="space-y-4 text-neutral-700 leading-relaxed mb-10"
            >
              <p>
                Inelvis no es solo la fundadora de FCIG. Es la persona que se
                sienta contigo a explicarte tu póliza como si le estuviera
                explicando a alguien de su propia familia. Creó esta agencia
                porque cree que nadie debería sentirse perdido al elegir un
                seguro. Su promesa: que entiendas todo antes de firmar.
              </p>
            </motion.div>

            {/* Quote */}
            <motion.blockquote
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="relative pl-6 border-l-[3px] border-accent mb-10"
            >
              <p className="text-lg font-serif italic text-primary/80 leading-relaxed">
                "Si no lo entiendes, no lo firmes. Mi trabajo es que todo
                quede claro antes de dar el primer paso."
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
                { label: 'FL & TX', sub: 'Licencia Activa' },
                { label: '100%', sub: 'Habla Tu Idioma' },
                { label: '★★★★★', sub: 'Trato Familiar' },
              ].map((cred) => (
                <div
                  key={cred.sub}
                  className="px-4 py-2.5 rounded-xl bg-neutral-50 border border-neutral-200/60"
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
