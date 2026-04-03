import { useRef, useLayoutEffect, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Car,
  Home,
  Building2,
  HardHat,
  HeartPulse,
  ArrowRight,
} from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { scrollTo } from '../../hooks/useSmoothScroll'

// Nuevos emblemas hiperrealistas 3D
import imgAuto from '../../assets/images/3d_emblem_auto.png'
import imgHome from '../../assets/images/3d_emblem_home.png'
import imgCommercial from '../../assets/images/3d_emblem_commercial.png'
import imgContractor from '../../assets/images/3d_emblem_hardhat.png'
import imgHealth from '../../assets/images/3d_emblem_health.png'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    icon: Car,
    title: 'Seguro de Auto',
    desc: '¿Y si chocas mañana? No te preocupes. Comparamos entre varias aseguradoras para encontrar el plan que te protege sin vaciar tu bolsillo.',
    color: '#3b82f6',
    gradient: 'from-blue-500/10 to-blue-600/5',
    number: '01',
    bgImage: imgAuto,
  },
  {
    icon: Home,
    title: 'Hogar e Inundaciones',
    desc: 'Tu casa es tu mayor inversión. La cubrimos contra tormentas, inundaciones y lo inesperado. Tú duermes tranquilo; nosotros velamos por tu hogar.',
    color: '#10b981',
    gradient: 'from-emerald-500/10 to-emerald-600/5',
    number: '02',
    bgImage: imgHome,
  },
  {
    icon: Building2,
    title: 'Comercial y Negocios',
    desc: 'Construiste tu negocio con esfuerzo. Lo protegemos con coberturas claras: desde daños en tu local hasta la cobertura de tus empleados.',
    color: '#f59e0b',
    gradient: 'from-amber-500/10 to-amber-600/5',
    number: '03',
    bgImage: imgCommercial,
  },
  {
    icon: HardHat,
    title: 'Contratistas',
    desc: 'Eres contratista y necesitas tu licencia, fianza y seguro de responsabilidad. Te ayudamos a conseguirlo rápido, sin vueltas.',
    color: '#8b5cf6',
    gradient: 'from-violet-500/10 to-violet-600/5',
    number: '04',
    bgImage: imgContractor,
  },
  {
    icon: HeartPulse,
    title: 'Salud y Vida',
    desc: 'La salud de tu familia no puede esperar. Encontramos planes que se ajustan a tu presupuesto, para que todos estén protegidos.',
    color: '#ef4444',
    gradient: 'from-red-500/10 to-red-600/5',
    number: '05',
    bgImage: imgHealth,
  },
]

function MobileServiceCard({ service, index, onInView }: { service: any, index: number, onInView: (i: number) => void }) {
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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`relative rounded-3xl p-8 mb-8 overflow-hidden`}
    >
      {/* Background Emblem for mobile */}
      <img
        src={service.bgImage}
        alt=""
        className="absolute inset-0 w-full h-full object-cover mix-blend-screen opacity-50 z-0 pointer-events-none scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] via-[#0A1628]/80 to-transparent z-0" />

      <div className="relative z-10">
        <div
          className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.gradient} backdrop-blur-xl border border-white/10 flex items-center justify-center mb-6`}
        >
          <service.icon size={22} style={{ color: service.color }} />
        </div>
        <h3 className="text-2xl font-serif font-bold text-white mb-3">
          {service.title}
        </h3>
        <p className="text-neutral-300 leading-relaxed mb-6">
          {service.desc}
        </p>
        <button
          onClick={() => scrollTo('#contacto')}
          className="inline-flex items-center gap-2 text-sm font-semibold text-accent cursor-pointer"
        >
          Hablemos <ArrowRight size={16} />
        </button>
      </div>
    </motion.div>
  )
}

export function Services() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useLayoutEffect(() => {
    if (window.innerWidth < 1024) return

    const track = trackRef.current
    const section = sectionRef.current
    if (!track || !section) return

    let mainTween: gsap.core.Tween;
    const ctx = gsap.context(() => {
      // Use mathematically exact distance to prevent zero-distance bugs on first mount.
      const getDistance = () => (services.length - 1) * window.innerWidth;

      // 1. Move the entire track horizontally
      mainTween = gsap.to(track, {
        x: () => -getDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          end: () => `+=${getDistance()}`,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const maxIndex = services.length - 1
            const calculatedIndex = Math.min(Math.round(self.progress * maxIndex), maxIndex)
            setActiveIndex(calculatedIndex)
          }
        },
      })

      // 2. Parallax Complex Effect for internal items (Images and Texts move backwards slightly inside the moving track)
      const parallaxImages = gsap.utils.toArray('.parallax-emblem') as HTMLElement[]
      parallaxImages.forEach((img) => {
        gsap.fromTo(img, 
          { x: '15vw', scale: 0.8 }, 
          {
            x: '-15vw',
            scale: 1.1,
            ease: 'none',
            scrollTrigger: {
              trigger: img.parentElement, // The individual 100vw slide
              containerAnimation: mainTween,
              start: 'left right',
              end: 'right left',
              scrub: true,
            }
          }
        )
      })

      const parallaxTexts = gsap.utils.toArray('.parallax-text') as HTMLElement[]
      parallaxTexts.forEach((txt) => {
        gsap.fromTo(txt, 
          { x: '-10vw', opacity: 0 }, 
          {
            x: '5vw',
            opacity: 1,
            ease: 'power1.out',
            scrollTrigger: {
              trigger: txt.parentElement?.parentElement, 
              containerAnimation: mainTween,
              start: 'left center', // Start entering
              end: 'right center',
              scrub: true,
            }
          }
        )
      })

      setTimeout(() => {
        ScrollTrigger.refresh()
      }, 200)
    })

    return () => {
      ctx.revert()
    }
  }, [])

  return (
    <section ref={sectionRef} id="servicios" className="relative overflow-hidden bg-[#000000]">
      {/* Desktop: Full-Screen Horizontal scroll */}
      <div className="hidden lg:block relative z-10 h-screen w-full">
        
        {/* Fixed Title Tracker */}
        <div className="absolute top-0 left-0 right-0 z-20 pt-20 pb-6 px-16 pointer-events-none">
          <div className="flex items-end justify-between">
            <div>
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 text-accent font-semibold text-xs tracking-[0.25em] uppercase mb-4"
              >
                <span className="w-8 h-px bg-accent" />
                Nuestros Seguros
              </motion.span>
            </div>
            
            {/* Dynamic Counter */}
            <div className="text-white/20 font-serif text-5xl font-bold">
              0{activeIndex + 1} <span className="text-xl text-white/10">/ 05</span>
            </div>
          </div>
        </div>

        {/* Horizontal track */}
        <div
          ref={trackRef}
          className="flex h-screen items-center"
        >
          {services.map((service, index) => (
            <div
              key={service.title}
              className="w-screen h-screen flex-shrink-0 flex items-center relative"
            >
              <div className="absolute inset-0 z-0  flex items-center justify-center lg:justify-end xl:pr-32">
                {/* 3D Emblem Floating */}
                <img 
                  src={service.bgImage} 
                  alt="" 
                  className="parallax-emblem w-[120vh] h-[120vh] max-w-none object-cover mix-blend-screen opacity-80 pointer-events-none select-none"
                />
              </div>

              {/* Text Content */}
              <div className="relative z-10 w-full max-w-7xl mx-auto px-16 grid grid-cols-12">
                <div className="parallax-text col-span-12 lg:col-span-6 xl:col-span-5 flex flex-col justify-center">
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient} border border-white/10 backdrop-blur-2xl flex items-center justify-center mb-8 shadow-2xl`}
                  >
                    <service.icon size={30} style={{ color: service.color }} />
                  </div>
                  
                  <h2 className="text-5xl lg:text-7xl font-serif font-bold text-white leading-[1.05] mb-8">
                    {service.title}
                  </h2>
                  
                  <p className="text-lg text-neutral-300 leading-relaxed mb-10 border-l-2 border-white/10 pl-6">
                    {service.desc}
                  </p>
                  
                  <div>
                    <button
                      onClick={() => scrollTo('#contacto')}
                      className="group inline-flex items-center justify-center gap-4 bg-white text-black px-8 py-4 rounded-full font-bold text-sm tracking-wide transition-all duration-300 hover:bg-accent hover:text-white hover:scale-105 cursor-pointer shadow-[0_10px_40px_rgba(255,255,255,0.1)]"
                    >
                      Proteger Ahora
                      <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-2" />
                    </button>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* Mobile/Tablet: Vertical Standard */}
      <div className="lg:hidden py-24 md:py-36 px-6 relative z-10 bg-[#0A1628]">
        <div className="mx-auto max-w-4xl relative">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-accent font-semibold text-xs tracking-[0.25em] uppercase mb-4"
          >
            <span className="w-8 h-px bg-accent" />
            Nuestros Seguros
          </motion.span>

          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-white mb-6 leading-[1.1]">
            Soluciones a <br /><span className="gradient-text">tu medida</span>
          </h2>

          <div className="mt-16 flex flex-col gap-12">
            {services.map((service, index) => (
              <MobileServiceCard
                key={service.title}
                service={service}
                index={index}
                onInView={setActiveIndex}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
