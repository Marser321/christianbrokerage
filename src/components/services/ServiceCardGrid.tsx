import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Clock, FileText } from 'lucide-react'
import type { ServiceItem, ServiceVertical } from '../../data/serviceCatalog'
import { useVariant } from '../../context/VariantContext'
import { framePos, serviceImage } from '../../data/imageLibrary'
import { diagnosticoHref } from '../../data/navigationCatalog'

type ServiceCardGridProps = {
  vertical: ServiceVertical
  onOpen: (service: ServiceItem) => void
}

export function ServiceCardGrid({ vertical, onOpen }: ServiceCardGridProps) {
  const { density } = useVariant()

  return (
    <section id={`servicios-${vertical.slug}`} className="bg-surface-2 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-3xl md:mb-14">
          <p className="eyebrow mb-4">Servicios</p>
          <h2 className="text-3xl font-serif font-semibold leading-tight text-heading md:text-5xl">
            Elige el trámite o cobertura que necesitas resolver.
          </h2>
          <p className="mt-5 text-base leading-8 text-muted">
            Cada tarjeta resume lo esencial. El detalle completo queda en una vista lateral para comparar sin saturar la página.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {vertical.services.map((service, index) => (
            <motion.article
              id={service.id}
              key={service.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.45, delay: Math.min(index * 0.05, 0.25) }}
              className="group flex min-h-[420px] flex-col overflow-hidden rounded-lg border border-line bg-surface-card shadow-[0_16px_42px_rgba(10,37,64,0.06)] transition hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_22px_58px_rgba(10,37,64,0.11)]"
            >
              {/* Banner: imagen con el sujeto a la derecha; icono + título sobre la zona limpia (izquierda).
                  El encuadre (framePos) sube el rostro para no cortar cabezas en las fotos. */}
              <div className="relative aspect-[3/2] overflow-hidden">
                <img
                  src={serviceImage(service.id, density)}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  className={`absolute inset-0 h-full w-full object-cover ${framePos(service.id, density)} transition duration-500 group-hover:scale-[1.03]`}
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-r from-surface-card via-surface-card/72 to-transparent"
                />
                <div className="absolute inset-0 flex flex-col p-4">
                  <div className="flex items-start justify-between gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-md bg-primary text-white shadow-sm">
                      <service.icon size={20} aria-hidden="true" />
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-sm bg-surface-card/85 px-2.5 py-1 text-xs font-semibold text-muted backdrop-blur">
                      <Clock size={13} aria-hidden="true" />
                      {service.turnaround}
                    </span>
                  </div>
                  <h3 className="mt-auto flex max-w-[82%] items-center gap-1.5 font-sans text-lg font-semibold leading-tight text-heading">
                    {service.title}
                    <ArrowRight
                      size={16}
                      aria-hidden="true"
                      className="shrink-0 -translate-x-1 text-accent opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                    />
                  </h3>
                </div>
              </div>

              {/* Cuerpo */}
              <div className="flex flex-1 flex-col p-6 pt-5">
                <p className="text-sm leading-7 text-muted">{service.summary}</p>

                <ul className="mt-5 space-y-2">
                  {service.features.slice(0, 3).map((feature) => (
                    <li key={feature} className="flex gap-2 text-sm leading-6 text-body">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-6">
                  <div className="mb-4 flex items-start gap-2 border-t border-line pt-4 text-xs leading-5 text-muted">
                    <FileText size={15} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
                    <span>{service.requirements}</span>
                  </div>
                  <div className="flex flex-col gap-2 sm:flex-row">
                    <Link
                      to={diagnosticoHref(vertical.slug, service.id)}
                      className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                    >
                      Orientarme
                      <ArrowRight size={15} aria-hidden="true" />
                    </Link>
                    <button
                      type="button"
                      onClick={() => onOpen(service)}
                      className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-md border border-line px-4 py-2.5 text-sm font-semibold text-heading transition hover:border-accent/50 hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                    >
                      Ver detalle
                      <FileText size={15} aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
