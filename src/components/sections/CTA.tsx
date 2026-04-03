import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft,
  Phone,
  Mail,
  User,
  Shield,
  CheckCircle2,
  Calendar,
  MessageCircle,
  Sparkles,
} from 'lucide-react'

import bgAuto from '../../assets/images/bg-service-auto.png'
import bgHome from '../../assets/images/bg-service-home.png'
import bgCommercial from '../../assets/images/bg-service-commercial.png'
import bgContractor from '../../assets/images/bg-service-contractor.png'
import bgHealth from '../../assets/images/bg-service-health.png'

type InsuranceType = 'auto' | 'hogar' | 'negocio' | 'contratista' | 'salud' | null

const insuranceOptions = [
  { id: 'auto' as const, label: 'Auto Personal', icon: '🚗', color: '#3b82f6', bgImage: bgAuto },
  { id: 'hogar' as const, label: 'Hogar / Inundación', icon: '🏠', color: '#10b981', bgImage: bgHome },
  { id: 'negocio' as const, label: 'Comercial', icon: '💼', color: '#f59e0b', bgImage: bgCommercial },
  { id: 'contratista' as const, label: 'Contratista', icon: '🔧', color: '#8b5cf6', bgImage: bgContractor },
  { id: 'salud' as const, label: 'Salud y Vida', icon: '❤️', color: '#ef4444', bgImage: bgHealth },
]

const cubicEase = [0.16, 1, 0.3, 1] as const

const stepVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
    scale: 0.98,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: cubicEase },
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 80 : -80,
    opacity: 0,
    scale: 0.98,
    transition: { duration: 0.3 },
  }),
}

export function ContactSection() {
  const [step, setStep] = useState(0)
  const [direction, setDirection] = useState(0)
  const [selectedType, setSelectedType] = useState<InsuranceType>(null)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSelectType = (id: InsuranceType) => {
    setSelectedType(id)
    // Avance automático súper veloz para reducir fricción
    setTimeout(() => {
      setDirection(1)
      setStep(1)
    }, 200)
  }

  const goBack = () => {
    setDirection(-1)
    setStep(0)
  }

  const handleSubmit = () => {
    // Aquí se integraría con CRM / GoHighLevel
    console.log('Form submitted:', { selectedType, ...formData })
    setIsSubmitted(true)
  }

  const canProceedSubmit = formData.name.length > 0 && formData.phone.length > 0

  const activeOption = insuranceOptions.find(o => o.id === selectedType)
  const currentBg = activeOption?.bgImage

  return (
    <section id="contacto" className="relative py-24 md:py-36 overflow-hidden bg-[#081a2e] text-white">
      {/* Fondo Dinámico con textura suave para el look $25k */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <AnimatePresence mode="wait">
          {currentBg ? (
            <motion.div
              key={currentBg}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
              className="absolute inset-0"
            >
              <img
                src={currentBg}
                alt="Fondo"
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-[#081a2e]/75" />
            </motion.div>
          ) : (
            <motion.div
              key="default-bg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0 bg-[#081a2e]"
            >
              <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[140px]" />
              <div className="absolute bottom-20 left-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[140px]" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Lado Izquierdo: Copy enfocado */}
          <div className="lg:sticky lg:top-32">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 text-accent font-semibold text-xs tracking-[0.25em] uppercase mb-5"
            >
              <span className="w-8 h-px bg-accent" />
              Contacto Directo
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.7, ease: cubicEase }}
              className="text-4xl md:text-5xl lg:text-[3.2rem] font-serif font-bold text-white mb-6 leading-[1.1]"
            >
              Tu protección empieza con{' '}
              <span className="gradient-text text-glow">una conversación</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg text-white/80 mb-10 leading-relaxed"
            >
              Sin presión, sin compromiso. Cuéntanos qué necesitas y te contactaremos con opciones a tu medida.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="space-y-4 mb-10"
            >
              {[
                { icon: Sparkles, text: 'Opciones directas sin tanta vuelta' },
                { icon: Shield, text: 'Completamente gratis y seguro' },
                { icon: MessageCircle, text: 'Hablamos en tu idioma' },
                { icon: Calendar, text: 'Tú eliges cómo procedemos' },
              ].map((item, i) => (
                <motion.div
                  key={item.text}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.08 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <item.icon size={16} className="text-accent" />
                  </div>
                  <p className="text-sm font-medium text-white/80">{item.text}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Fricción eliminada: Contacto secundario sutil */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
              className="flex items-center gap-6 mt-12 pt-8 border-t border-white/10"
            >
              <a href="tel:3059741833" className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm font-medium">
                <Phone size={16} /> 305-974-1833
              </a>
              <a href="mailto:info@thefcig.com" className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm font-medium">
                <Mail size={16} /> info@thefcig.com
              </a>
            </motion.div>
          </div>

          {/* Lado Derecho: Flujo Súper Ágil de 2 Pasos */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="relative"
          >
            <div className="glass-dark bg-[#0a2540]/60 rounded-3xl border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.5)] backdrop-blur-2xl overflow-hidden relative z-10 transition-colors duration-700">
              <div className="p-7 md:p-10 min-h-[460px] flex flex-col justify-center">
                <AnimatePresence mode="wait" custom={direction}>
                  {isSubmitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center justify-center text-center py-8"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                        className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(16,185,129,0.3)]"
                      >
                        <CheckCircle2 size={40} className="text-accent" />
                      </motion.div>
                      <h3 className="text-3xl font-serif font-bold text-white mb-4">
                        ¡Recibido!
                      </h3>
                      <p className="text-white/70 max-w-sm text-lg leading-relaxed">
                        Un agente especializado de FCIG se comunicará contigo al <strong>{formData.phone}</strong> muy pronto. 
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key={step}
                      custom={direction}
                      variants={stepVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      className="flex-1 w-full"
                    >
                      {/* Paso Único - Selección Táctil Veloz */}
                      {step === 0 && (
                        <div className="h-full flex flex-col">
                          <h3 className="text-2xl md:text-3xl font-serif font-bold text-white mb-2 text-center">
                            ¿Qué te gustaría asegurar?
                          </h3>
                          <p className="text-sm text-white/60 mb-8 text-center px-4">
                            Selecciona una opción para avanzar
                          </p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                            {insuranceOptions.map((option) => (
                              <button
                                key={option.id}
                                onClick={() => handleSelectType(option.id)}
                                className={`group flex items-center gap-4 p-4 rounded-xl border border-white/10 bg-white/5 hover:border-white/30 hover:bg-white/10 transition-all duration-300 text-left cursor-pointer ${option.id === 'salud' ? 'md:col-span-2 justify-center' : ''}`}
                              >
                                <span className="text-3xl group-hover:scale-110 transition-transform duration-300">{option.icon}</span>
                                <span className="text-base font-medium text-white/90 group-hover:text-white">
                                  {option.label}
                                </span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Paso 2: Teléfono e Inbox (Fricción Cero) */}
                      {step === 1 && (
                        <div className="h-full flex flex-col">
                          <div className="flex items-center gap-3 mb-6">
                            <button onClick={goBack} className="p-2 rounded-full hover:bg-white/10 text-white/50 hover:text-white transition-colors cursor-pointer">
                              <ArrowLeft size={18} />
                            </button>
                            <div>
                              <h3 className="text-2xl font-serif font-bold text-white leading-tight">
                                Excelente elección.
                              </h3>
                              <p className="text-sm text-white/60">
                                Dinos a dónde te contactamos y listo.
                              </p>
                            </div>
                          </div>
                          
                          <div className="space-y-5 mt-4">
                            <div>
                              <label className="flex items-center gap-2 text-sm font-medium text-white/70 mb-2">
                                <User size={14} /> Pónme un nombre
                              </label>
                              <input
                                autoFocus
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="Tu nombre"
                                className="w-full px-5 py-4 rounded-xl bg-white/[0.03] border border-white/10 focus:border-accent focus:bg-white/[0.05] text-white transition-all outline-none text-base"
                              />
                            </div>
                            <div>
                              <label className="flex items-center gap-2 text-sm font-medium text-white/70 mb-2">
                                <Phone size={14} /> WhatsApp o Teléfono
                              </label>
                              <input
                                type="tel"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                placeholder="(305) 555-0123"
                                className="w-full px-5 py-4 rounded-xl bg-white/[0.03] border border-white/10 focus:border-accent focus:bg-white/[0.05] text-white transition-all outline-none text-base font-mono tracking-wide"
                              />
                            </div>
                            
                            <motion.button
                              whileHover={{ scale: 1.02, y: -2 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={handleSubmit}
                              disabled={!canProceedSubmit}
                              className={`w-full flex items-center justify-center gap-2 px-8 py-4.5 mt-8 rounded-xl text-base font-bold transition-all cursor-pointer ${
                                canProceedSubmit
                                  ? 'bg-accent text-white shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:shadow-[0_0_40px_rgba(16,185,129,0.5)] view-cursor-hover'
                                  : 'bg-white/5 text-white/30 cursor-not-allowed'
                              }`}
                            >
                              <Sparkles size={18} />
                              Hablemos Pronto
                            </motion.button>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
            
            {/* Elementos decorativos 3D sutiles para el container derecho */}
            <motion.div 
              className="absolute -top-10 -right-10 w-40 h-40 border border-white/5 rounded-full pointer-events-none"
              animate={{ rotate: 360, scale: [1, 1.05, 1] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
