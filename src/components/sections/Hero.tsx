import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, ShieldCheck, Users, Clock, MapPin } from 'lucide-react'
import { scrollTo } from '../../hooks/useSmoothScroll'
import heroImage from '../../assets/images/hero-family.png'

const cubicEase = [0.16, 1, 0.3, 1] as const

const wordVariants = {
  hidden: { y: '100%', opacity: 0 },
  visible: (i: number) => ({
    y: '0%',
    opacity: 1,
    transition: {
      duration: 0.8,
      delay: 0.3 + i * 0.08,
      ease: cubicEase,
    },
  }),
}

const stats = [
  { icon: ShieldCheck, value: 'FL & TX', label: 'Licencia Activa' },
  { icon: Users, value: '100%', label: 'Hablamos tu Idioma' },
  { icon: Clock, value: '<5 min', label: 'Tu Cotización Lista' },
  { icon: MapPin, value: '2', label: 'Estados Cubiertos' },
]

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const imageY = useTransform(scrollYProgress, [0, 1], [0, 150])
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.15])
  const textY = useTransform(scrollYProgress, [0, 1], [0, -60])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  const titleWords = ['Tu familia', 'protegida,', 'sin complicaciones.']

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-[100vh] flex items-center overflow-hidden"
    >
      {/* Animated background */}
      <div className="absolute inset-0">
        {/* Gradient base */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#f0f4f8] via-white to-[#e8f4ec]" />
        
        {/* Morphing blob 1 */}
        <motion.div
          className="absolute -top-20 -right-20 w-[500px] h-[500px] bg-gradient-to-br from-accent/10 to-primary-light/5 animate-morph"
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, 80]) }}
        />
        
        {/* Morphing blob 2 */}
        <motion.div
          className="absolute -bottom-32 -left-32 w-[600px] h-[600px] bg-gradient-to-tr from-primary/[0.06] to-accent/[0.03] animate-morph"
          style={{
            animationDelay: '-4s',
            y: useTransform(scrollYProgress, [0, 1], [0, -60]),
          }}
        />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `radial-gradient(circle, #0a2540 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 w-full pt-28 pb-20 md:pt-36 md:pb-24"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left: Text Content — 7 columns */}
          <div className="lg:col-span-7">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="inline-flex items-center gap-2.5 bg-primary/5 border border-primary/10 px-4 py-2 rounded-full text-sm font-medium text-primary mb-8"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
              </span>
              Tu Guía de Seguros en Florida y Texas
            </motion.div>

            {/* Title with word-by-word reveal */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-[5.2rem] font-serif font-bold text-primary leading-[1.05] mb-4 tracking-tight">
              {titleWords.map((word, i) => (
                <span key={i} className="inline-block overflow-hidden mr-3 pb-4 -mb-4 pt-2 -mt-2">
                  <motion.span
                    className={`inline-block ${i === 2 ? 'gradient-text text-glow' : ''}`}
                    variants={wordVariants}
                    initial="hidden"
                    animate="visible"
                    custom={i}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </h1>

            {/* Animated subtitle line */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '80px' }}
              transition={{ delay: 0.8, duration: 0.6, ease: cubicEase }}
              className="h-1 bg-gradient-to-r from-accent to-primary-light rounded-full mb-6"
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.7, ease: cubicEase }}
              className="text-lg md:text-xl text-neutral-500 mb-10 max-w-xl leading-relaxed"
            >
              Elegir un seguro no debería ser confuso. Te explicamos cada opción en
              español, <strong className="text-primary">sin letras pequeñas</strong>, para
              que tú decidas con tranquilidad qué es lo mejor para los tuyos.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 mb-12"
            >
              <motion.a
                href="#contacto"
                onClick={(e) => { e.preventDefault(); scrollTo('#contacto') }}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="magnetic-btn inline-flex items-center justify-center gap-2.5 bg-accent text-white px-8 py-4.5 rounded-full text-base font-semibold shadow-lg shadow-accent/25 hover:shadow-accent/40 transition-shadow duration-300"
                id="hero-cta-primary"
              >
                Protege a Tu Familia Hoy
                <ArrowRight size={18} />
              </motion.a>
              <motion.a
                href="#servicios"
                onClick={(e) => { e.preventDefault(); scrollTo('#servicios') }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-2 border-2 border-primary/15 text-primary px-8 py-4.5 rounded-full text-base font-semibold hover:border-primary/30 hover:bg-primary/[0.03] transition-all duration-300"
                id="hero-cta-secondary"
              >
                Descubre Tus Opciones
              </motion.a>
            </motion.div>

            {/* Micro-copy ansiolítico */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="text-xs text-neutral-400 -mt-6 mb-8 ml-1"
            >
              Sin compromiso. Hablamos español. Es rápido y 100% gratis.
            </motion.p>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.6 }}
              className="flex flex-wrap gap-6 md:gap-10"
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4 + i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-accent/8 flex items-center justify-center">
                    <stat.icon size={18} className="text-accent" />
                  </div>
                  <div>
                    <p className="font-bold text-primary text-sm">{stat.value}</p>
                    <p className="text-xs text-neutral-400">{stat.label}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right: Hero Image — 5 columns  */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 60 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: cubicEase }}
            className="lg:col-span-5 hidden lg:block"
          >
            <div className="relative">
              {/* Glow behind image */}
              <div className="absolute -inset-8 bg-gradient-to-br from-accent/15 via-primary-light/10 to-transparent rounded-[2rem] blur-2xl" />

              <motion.div
                style={{ y: imageY, scale: imageScale }}
                className="relative"
              >
                <img
                  src={heroImage}
                  alt="Familia protegida por First Choice Insurance Group"
                  className="relative rounded-[1.5rem] shadow-2xl shadow-primary/15 w-full object-cover aspect-[3/4]"
                  loading="eager"
                />

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent rounded-[1.5rem]" />
              </motion.div>

              {/* Floating card 1 */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.5 }}
                className="absolute -left-8 top-1/3 glass-panel rounded-2xl p-4 shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                    <ShieldCheck size={20} className="text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-primary text-sm">Todo Cubierto</p>
                    <p className="text-xs text-neutral-400">Auto • Hogar • Negocio</p>
                  </div>
                </div>
              </motion.div>

              {/* Floating card 2 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8 }}
                className="absolute -bottom-4 right-4 glass-panel rounded-2xl px-5 py-3 shadow-xl"
              >
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className="w-7 h-7 rounded-full bg-gradient-to-br from-accent to-primary-light border-2 border-white"
                      />
                    ))}
                  </div>
                  <p className="text-xs text-neutral-500 ml-1">
                    <strong className="text-primary">+500</strong> familias ya confían en nosotros
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="w-6 h-10 rounded-full border-2 border-neutral-300 flex items-start justify-center p-1.5"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="w-1.5 h-1.5 bg-accent rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
