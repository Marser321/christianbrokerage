import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { AlertTriangle, ArrowRight, Check, Clock, FileText, MessageCircle, X } from 'lucide-react'
import type { ServiceItem, ServiceVertical } from '../../data/serviceCatalog'
import { createWhatsappHref } from '../../data/serviceCatalog'
import { useVariant } from '../../context/VariantContext'
import { framePos, serviceImage } from '../../data/imageLibrary'

type DrawerTab = 'overview' | 'requirements' | 'risks'

type ServiceDrawerProps = {
  service: ServiceItem | null
  vertical: ServiceVertical
  onClose: () => void
  onRequestLead: (service: ServiceItem) => void
}

const tabs: Array<{ id: DrawerTab; label: string }> = [
  { id: 'overview', label: 'Cómo funciona' },
  { id: 'requirements', label: 'Requisitos' },
  { id: 'risks', label: 'Consejos' },
]

export function ServiceDrawer({ service, vertical, onClose, onRequestLead }: ServiceDrawerProps) {
  const [tabState, setTabState] = useState<{ serviceId: string | null; tab: DrawerTab }>({
    serviceId: null,
    tab: 'overview',
  })
  const activeTab = tabState.serviceId === service?.id ? tabState.tab : 'overview'
  const selectTab = (tab: DrawerTab) => setTabState({ serviceId: service?.id ?? null, tab })
  const { density } = useVariant()

  useEffect(() => {
    if (!service) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [service, onClose])

  return (
    <AnimatePresence>
      {service ? (
        <div className="fixed inset-0 z-[70] flex justify-end">
          <motion.button
            type="button"
            aria-label="Cerrar detalle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-primary/60 backdrop-blur-sm"
          />

          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-labelledby="service-drawer-title"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 32, stiffness: 260 }}
            className="relative z-10 flex h-full w-full flex-col overflow-y-auto bg-surface shadow-[-24px_0_70px_rgba(10,37,64,0.25)] sm:max-w-2xl"
          >
            <div className="relative h-40 shrink-0 overflow-hidden">
              <img
                src={serviceImage(service.id, density)}
                alt=""
                aria-hidden="true"
                className={`absolute inset-0 h-full w-full object-cover ${framePos(service.id, density)}`}
              />
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-surface via-surface/78 to-surface/25" />
              <div className="absolute inset-0 flex flex-col justify-end p-5 md:px-8">
                <p className="eyebrow mb-1">{vertical.eyebrow}</p>
                <h2 id="service-drawer-title" className="max-w-[80%] text-2xl font-serif font-semibold leading-tight text-heading md:text-3xl">
                  {service.title}
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Cerrar"
                className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-md border border-line bg-surface-card/85 text-heading backdrop-blur transition hover:border-accent hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <X size={18} aria-hidden="true" />
              </button>
            </div>

            <div className="sticky top-0 z-20 border-b border-line bg-surface/95 px-5 py-3 backdrop-blur md:px-8">
              <div className="flex gap-2 overflow-x-auto" role="tablist" aria-label="Detalle del servicio">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={activeTab === tab.id}
                    onClick={() => selectTab(tab.id)}
                    className={`min-h-10 shrink-0 rounded-md px-4 py-2 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                      activeTab === tab.id
                        ? 'bg-primary text-white'
                        : 'border border-line bg-surface-card text-muted hover:border-accent/40 hover:text-heading'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div
              className="editorial-bg flex-1 overflow-hidden px-5 pt-4 pb-7 md:px-8"
              style={
                density === 'combo'
                  ? ({ '--editorial-bg': `url("${serviceImage(service.id, 'minimal')}")` } as React.CSSProperties)
                  : undefined
              }
            >
              {activeTab === 'overview' ? (
                <div className="space-y-8">
                  <section>
                    <h3 className="mb-3 font-sans text-sm font-semibold uppercase text-accent">Qué es</h3>
                    <p className="text-base leading-8 text-body">{service.glossaryDefinition}</p>
                  </section>
                  <section>
                    <h3 className="mb-3 font-sans text-sm font-semibold uppercase text-accent">Quién suele necesitarlo</h3>
                    <ul className="space-y-3">
                      {service.whoNeedsIt.map((item) => (
                        <li key={item} className="flex gap-3 text-sm leading-7 text-body">
                          <Check size={17} className="mt-1 shrink-0 text-accent" aria-hidden="true" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                  <section>
                    <h3 className="mb-3 font-sans text-sm font-semibold uppercase text-accent">Paso a paso</h3>
                    <ol className="space-y-3">
                      {service.howItWorks.map((step, index) => (
                        <li key={step} className="flex gap-3 text-sm leading-7 text-body">
                          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-white">
                            {index + 1}
                          </span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  </section>
                </div>
              ) : null}

              {activeTab === 'requirements' ? (
                <div className="space-y-7">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="rounded-lg border border-line bg-surface-card p-5">
                      <Clock className="mb-3 text-accent" size={20} aria-hidden="true" />
                      <h3 className="font-sans text-sm font-semibold text-heading">Tiempo estimado</h3>
                      <p className="mt-2 text-sm leading-6 text-muted">{service.turnaround}</p>
                    </div>
                    <div className="rounded-lg border border-line bg-surface-card p-5">
                      <FileText className="mb-3 text-accent" size={20} aria-hidden="true" />
                      <h3 className="font-sans text-sm font-semibold text-heading">Documentos base</h3>
                      <p className="mt-2 text-sm leading-6 text-muted">{service.requirements}</p>
                      <p className="mt-2 text-xs leading-5 text-muted/80">
                        Después de tu consulta podríamos solicitar información o documentos adicionales según tu caso.
                      </p>
                    </div>
                  </div>
                  <section>
                    <h3 className="mb-3 font-sans text-sm font-semibold uppercase text-accent">Incluye</h3>
                    <ul className="space-y-3">
                      {service.premiumInclusions.map((item) => (
                        <li key={item} className="flex gap-3 rounded-md bg-surface-card px-4 py-3 text-sm leading-7 text-body">
                          <Check size={17} className="mt-1 shrink-0 text-accent" aria-hidden="true" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                </div>
              ) : null}

              {activeTab === 'risks' ? (
                <div className="space-y-7">
                  <section className="rounded-lg border border-accent/30 bg-accent/10 p-5">
                    <h3 className="mb-2 font-sans text-sm font-semibold uppercase text-heading">Consejo del equipo</h3>
                    <p className="font-serif text-lg leading-8 text-heading/80">{service.proTip}</p>
                  </section>
                  <section>
                    <h3 className="mb-3 font-sans text-sm font-semibold uppercase text-accent">Errores comunes</h3>
                    <ul className="space-y-3">
                      {service.commonMistakes.map((mistake) => (
                        <li key={mistake} className="flex gap-3 rounded-md border border-red-300/40 bg-red-500/10 px-4 py-3 text-sm leading-7 text-red-700 dark:text-red-300">
                          <AlertTriangle size={17} className="mt-1 shrink-0" aria-hidden="true" />
                          <span>{mistake}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                  <section>
                    <h3 className="mb-3 font-sans text-sm font-semibold uppercase text-accent">Preguntas frecuentes</h3>
                    <div className="space-y-3">
                      {service.faqs.map((faq) => (
                        <details key={faq.q} className="rounded-md border border-line bg-surface-card p-4">
                          <summary className="cursor-pointer font-sans text-sm font-semibold text-heading">{faq.q}</summary>
                          <p className="mt-3 text-sm leading-7 text-muted">{faq.a}</p>
                        </details>
                      ))}
                    </div>
                  </section>
                </div>
              ) : null}
            </div>

            <div className="sticky bottom-0 border-t border-line bg-surface/95 px-5 py-4 backdrop-blur md:px-8">
              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => onRequestLead(service)}
                  className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  Solicitar orientación
                  <ArrowRight size={17} aria-hidden="true" />
                </button>
                <a
                  href={createWhatsappHref(`${vertical.whatsappPrompt} Servicio: ${service.title}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-md border border-line px-5 py-3 text-sm font-semibold text-heading transition hover:border-[#25D366]/50 hover:text-[#128C7E] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  WhatsApp
                  <MessageCircle size={17} aria-hidden="true" />
                </a>
              </div>
            </div>
          </motion.aside>
        </div>
      ) : null}
    </AnimatePresence>
  )
}
