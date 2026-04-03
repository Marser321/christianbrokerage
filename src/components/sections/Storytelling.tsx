import { useRef, useLayoutEffect, useState, useEffect } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { NumberTicker } from '../ui/NumberTicker'
import { Shield, Users, Globe2, HeartHandshake, ArrowRight } from 'lucide-react'
import { scrollTo } from '../../hooks/useSmoothScroll'

import aboutImage from '../../assets/images/about-office.png'
import storyDesk from '../../assets/images/story-desk.png'
import storyFamily from '../../assets/images/story-family.png'
import storyCommitment from '../../assets/images/story-commitment.png'

// Background images per chapter
import bgOrigin from '../../assets/images/bg-origin.png'
import bgMission from '../../assets/images/bg-mission.png'
import bgCommunity from '../../assets/images/bg-community.png'
import bgValues from '../../assets/images/bg-values.png'

gsap.registerPlugin(ScrollTrigger)

/* ── Chapter data ─────────────────────────────────── */
const chapters = [
  {
    id: 'origin',
    badge: 'Nuestro Origen',
    title: 'Nacimos para resolver un problema real',
    body: 'Muchas familias latinas en Florida enfrentaban lo mismo: llamaban a una aseguradora y nadie les hablaba en español. Les daban contratos confusos llenos de letras pequeñas. Inelvis Maytin fundó FCIG para cambiar eso — un lugar donde te atienden en tu idioma, te explican todo con claridad y te tratan como familia.',
    image: aboutImage,
    bgImage: bgOrigin,
    accent: '#10b981',
    bg: '#081a2e',
    blob1: { color: 'rgba(16, 185, 129, 0.25)', x: '-10%', y: '10%', scale: 1 },
    blob2: { color: 'rgba(52, 211, 153, 0.2)', x: '80%', y: '60%', scale: 1.2 },
    icon: Shield,
    stat: { value: 2020, label: 'Año de Fundación', suffix: '' },
  },
  {
    id: 'mission',
    badge: 'Nuestra Misión',
    title: 'Que tú entiendas y tú decidas',
    body: 'El mundo de los seguros puede ser abrumador. Por eso comparamos opciones de varias aseguradoras por ti. No te vendemos algo que no necesitas. Te sentamos, te explicamos cada detalle en español claro, y te damos el poder de decidir con información real. Aquí mandas tú.',
    image: storyDesk,
    bgImage: bgMission,
    accent: '#3b82f6',
    bg: '#0a2540',
    blob1: { color: 'rgba(59, 130, 246, 0.25)', x: '60%', y: '0%', scale: 1.3 },
    blob2: { color: 'rgba(96, 165, 250, 0.2)', x: '10%', y: '80%', scale: 0.9 },
    icon: Globe2,
    stat: { value: 100, label: 'Hablamos Tu Idioma', suffix: '%' },
  },
  {
    id: 'community',
    badge: 'Nuestra Comunidad',
    title: 'Más de 500 familias ya duermen tranquilas',
    body: 'Detrás de cada póliza hay una historia: una familia que protegió su casa antes de la tormenta, un negocio que pudo reabrir después de un imprevisto, un contratista que obtuvo su licencia. No estamos contigo solo cuando firmas. Estamos contigo cuando más nos necesitas.',
    image: storyFamily,
    bgImage: bgCommunity,
    accent: '#f59e0b',
    bg: '#0d2847',
    blob1: { color: 'rgba(245, 158, 11, 0.25)', x: '20%', y: '80%', scale: 0.8 },
    blob2: { color: 'rgba(251, 191, 36, 0.2)', x: '90%', y: '20%', scale: 1.4 },
    icon: Users,
    stat: { value: 500, label: 'Familias Protegidas', suffix: '+' },
  },
  {
    id: 'values',
    badge: 'Nuestro Compromiso',
    title: 'Cero letras pequeñas. Cero sorpresas.',
    body: 'Sabemos lo frustrante que es descubrir que tu seguro no cubría lo que pensabas. Por eso aquí no hay trampas. Te explicamos cada cobertura con palabras simples. Te damos tu cotización en minutos, no en días. Y si tienes dudas después, nos llamas y te respondemos como si fueras de la familia.',
    image: storyCommitment,
    bgImage: bgValues,
    accent: '#8b5cf6',
    bg: '#061629',
    blob1: { color: 'rgba(139, 92, 246, 0.25)', x: '80%', y: '90%', scale: 1.1 },
    blob2: { color: 'rgba(167, 139, 250, 0.2)', x: '-10%', y: '30%', scale: 1.2 },
    icon: HeartHandshake,
    stat: { value: 5, label: 'Tipos de Cobertura', suffix: '' },
  },
]

function MobileChapterCard({ chapter, index, onInView }: { chapter: any, index: number, onInView: (index: number) => void }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { amount: 0.6 })

  useEffect(() => {
    if (isInView) {
      onInView(index)
    }
  }, [isInView, index, onInView])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`relative max-w-xl mx-auto rounded-[2rem] p-8 transition-all duration-500 shadow-2xl glass-dark border ${
        isInView ? 'border-white/20 bg-white/10' : 'border-white/5 bg-white/5'
      }`}
    >
      <div className="absolute top-6 right-8">
        <span
          className="inline-block text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1 rounded-full"
          style={{
            background: `${chapter.accent}30`,
            color: '#fff',
            border: `1px solid ${chapter.accent}40`,
          }}
        >
          Capítulo {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
        style={{ backgroundColor: `${chapter.accent}15` }}
      >
        <chapter.icon size={22} style={{ color: chapter.accent }} />
      </div>
      <h3 className="text-2xl font-serif font-bold text-white mb-4">
        {chapter.title}
      </h3>
      <div
        className="h-0.5 w-12 rounded-full mb-6"
        style={{ backgroundColor: chapter.accent }}
      />
      <p className="text-white/90 leading-relaxed mb-6">{chapter.body}</p>
      <div className="flex items-baseline gap-2 pt-4 border-t border-white/10">
        <span className="text-2xl font-serif font-bold text-white">
          <NumberTicker
            value={chapter.stat.value}
            suffix={chapter.stat.suffix}
            delay={0.1}
          />
        </span>
        <span className="text-white/65 text-xs uppercase tracking-wider">
          {chapter.stat.label}
        </span>
      </div>
    </motion.div>
  )
}

export function Storytelling() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [activeChapter, setActiveChapter] = useState(0)
  const chapterRefs = useRef<(HTMLDivElement | null)[]>([])

  useLayoutEffect(() => {
    // Only pin on desktop
    if (window.innerWidth < 1024) return

    const section = sectionRef.current
    if (!section) return

    const timer = setTimeout(() => {
      // Create a ScrollTrigger for each chapter marker
      chapterRefs.current.forEach((chapterEl, i) => {
        if (!chapterEl) return

        ScrollTrigger.create({
          trigger: chapterEl,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => setActiveChapter(i),
          onEnterBack: () => setActiveChapter(i),
        })
      })

      // Pin the left panel
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: 'bottom bottom',
        pin: '.storytelling-sticky',
        pinSpacing: false,
      })

      ScrollTrigger.refresh()
    }, 150)

    return () => {
      clearTimeout(timer)
      ScrollTrigger.getAll().forEach((st) => {
        if (
          st.trigger === section ||
          chapterRefs.current.includes(st.trigger as HTMLDivElement)
        ) {
          st.kill()
        }
      })
    }
  }, [])

  const current = chapters[activeChapter]

  return (
    <motion.section
      ref={sectionRef}
      id="nosotros"
      className="relative overflow-hidden transition-colors duration-1000 ease-in-out"
      animate={{ backgroundColor: current.bg }}
    >
      {/* ── Dynamic Animated Background Blobs ── */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full blur-[120px] pointer-events-none opacity-80"
        animate={{
          backgroundColor: current.blob1.color,
          left: current.blob1.x,
          top: current.blob1.y,
          scale: current.blob1.scale,
        }}
        transition={{ duration: 1.5, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full blur-[100px] pointer-events-none opacity-60"
        animate={{
          backgroundColor: current.blob2.color,
          left: current.blob2.x,
          top: current.blob2.y,
          scale: current.blob2.scale,
        }}
        transition={{ duration: 1.8, ease: 'easeInOut' }}
      />

      {/* ── Full-screen Background Image with Cross-fade & Parallax ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id + '-bg'}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.15 }}
            animate={{ opacity: 0.45, scale: 1.05 }}
            exit={{ opacity: 0, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <img
              src={current.bgImage}
              alt=""
              className="w-full h-full object-cover"
              aria-hidden="true"
            />
          </motion.div>
        </AnimatePresence>
        {/* Stronger gradient mask to guarantee text readability over any blob/bg combo */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a2540]/70 to-[#0a2540]/50" />
      </div>

      {/* Noise */}
      <div className="noise-overlay absolute inset-0 pointer-events-none mix-blend-overlay opacity-5" />

      {/* ── Desktop: Split pinned layout ── */}
      <div className="hidden lg:block">
        <div className="relative mx-auto max-w-[1400px]">
          <div className="grid grid-cols-2 gap-0">
            {/* LEFT — Sticky visual panel */}
            <div className="storytelling-sticky h-screen flex items-center justify-center p-12 xl:p-16">
              <div className="relative w-full max-w-[520px]">
                {/* Glow ring */}
                <div
                  className="absolute -inset-8 rounded-[2rem] blur-[60px] transition-colors duration-1000"
                  style={{ backgroundColor: `${current.accent}15` }}
                />

                {/* Image container with cross-fade */}
                <div className="relative aspect-[4/5] rounded-[1.5rem] overflow-hidden shadow-2xl">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={current.id}
                      src={current.image}
                      alt={current.badge}
                      className="absolute inset-0 w-full h-full object-cover"
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </AnimatePresence>

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/20 to-transparent" />

                  {/* Chapter indicator on image */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={current.id + '-badge'}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.5 }}
                      >
                        <span
                          className="inline-block text-xs font-semibold tracking-[0.2em] uppercase px-4 py-1.5 rounded-full mb-3"
                          style={{
                            background: `${current.accent}30`,
                            color: current.accent,
                            border: `1px solid ${current.accent}40`,
                          }}
                        >
                          {current.badge}
                        </span>
                        <div className="flex items-baseline gap-2">
                          <span className="text-4xl font-serif font-bold text-white">
                            <NumberTicker
                              value={current.stat.value}
                              suffix={current.stat.suffix}
                              delay={0.1}
                            />
                          </span>
                          <span className="text-white/75 text-sm uppercase tracking-wider">
                            {current.stat.label}
                          </span>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>

                {/* Progress dots */}
                <div className="absolute -right-12 top-1/2 -translate-y-1/2 flex flex-col gap-3">
                  {chapters.map((ch, i) => (
                    <button
                      key={ch.id}
                      className="group relative flex items-center"
                      onClick={() => {
                        const el = chapterRefs.current[i]
                        if (el) {
                          const y = el.getBoundingClientRect().top + window.scrollY - 200
                          scrollTo(y)
                        }
                      }}
                    >
                      <div
                        className="w-3 h-3 rounded-full transition-all duration-500 cursor-pointer"
                        style={{
                          backgroundColor:
                            i === activeChapter ? current.accent : 'rgba(255,255,255,0.2)',
                          transform: i === activeChapter ? 'scale(1.3)' : 'scale(1)',
                          boxShadow:
                            i === activeChapter
                              ? `0 0 12px ${current.accent}60`
                              : 'none',
                        }}
                      />
                      {/* Tooltip */}
                      <span className="absolute left-6 whitespace-nowrap text-xs font-medium text-white/70 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        {ch.badge}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT — Scrolling chapters */}
            <div className="relative">
              {chapters.map((chapter, i) => (
                <div
                  key={chapter.id}
                  ref={(el) => { chapterRefs.current[i] = el }}
                  className="min-h-screen flex items-center"
                >
                  <div className="py-24 px-8 xl:px-16 max-w-[560px]">
                    {/* Chapter number */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: '-20%' }}
                      transition={{ duration: 0.6 }}
                      className="flex items-center gap-4 mb-8"
                    >
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center transition-colors duration-500"
                        style={{ backgroundColor: `${chapter.accent}15` }}
                      >
                        <chapter.icon
                          size={24}
                          style={{ color: chapter.accent }}
                          strokeWidth={2}
                        />
                      </div>
                      <div>
                        <span
                          className="text-[10px] font-bold tracking-[0.3em] uppercase"
                          style={{ color: chapter.accent }}
                        >
                          Capítulo {String(i + 1).padStart(2, '0')}
                        </span>
                        <div className="text-xs text-white/65">{chapter.badge}</div>
                      </div>
                    </motion.div>

                    {/* Title */}
                    <motion.h2
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-20%' }}
                      transition={{ duration: 0.7, delay: 0.1 }}
                      className="text-3xl xl:text-4xl font-serif font-bold text-white leading-[1.15] mb-6"
                    >
                      {chapter.title}
                    </motion.h2>

                    {/* Accent line */}
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true, margin: '-20%' }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="h-1 w-16 rounded-full mb-6 origin-left"
                      style={{ backgroundColor: chapter.accent }}
                    />

                    {/* Body */}
                    <motion.p
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-20%' }}
                      transition={{ duration: 0.7, delay: 0.2 }}
                      className="text-base xl:text-lg text-white/85 leading-relaxed mb-8"
                    >
                      {chapter.body}
                    </motion.p>

                    {/* CTA on last chapter */}
                    {i === chapters.length - 1 && (
                      <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        onClick={() => scrollTo('#contacto')}
                        className="group inline-flex items-center gap-3 bg-accent hover:bg-accent-dark text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30 cursor-pointer"
                      >
                        Hablemos Sin Compromiso
                        <ArrowRight
                          size={18}
                          className="transition-transform group-hover:translate-x-1"
                        />
                      </motion.button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Mobile: Stacked chapters with Scroll-Spy ── */}
      <div className="lg:hidden py-24 px-5 relative z-10">
        <div className="space-y-16">
          {chapters.map((chapter, i) => (
            <MobileChapterCard
              key={chapter.id}
              chapter={chapter}
              index={i}
              onInView={setActiveChapter}
            />
          ))}
          
          {/* Mobile CTA */}
          <div className="max-w-xl mx-auto text-center pt-8">
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              onClick={() => scrollTo('#contacto')}
              className="inline-flex items-center gap-3 bg-accent hover:bg-accent-dark text-white font-semibold px-8 py-4 rounded-full transition-all shadow-lg shadow-accent/20 cursor-pointer"
            >
              Hablemos Sin Compromiso
              <ArrowRight size={18} />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
