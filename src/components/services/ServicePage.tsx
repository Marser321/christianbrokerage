import { useEffect } from 'react'
import { CheckCircle2 } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import type { ServiceItem, ServiceVertical } from '../../data/serviceCatalog'
import { useVariant } from '../../context/VariantContext'
import { verticalFramePos, verticalImage } from '../../data/imageLibrary'
import { BookingBlock } from './BookingBlock'
import { ServiceCardGrid } from './ServiceCardGrid'
import { ServiceDrawer } from './ServiceDrawer'
import { ServiceHero } from './ServiceHero'
import { TrustBand } from './TrustBand'

type ServicePageProps = {
  vertical: ServiceVertical
}

export function ServicePage({ vertical }: ServicePageProps) {
  const [searchParams, setSearchParams] = useSearchParams()
  const { density } = useVariant()
  const serviceId = searchParams.get('servicio')
  const activeService = serviceId ? vertical.services.find((item) => item.id === serviceId) ?? null : null

  useEffect(() => {
    if (!serviceId || activeService) return

    const nextParams = new URLSearchParams(searchParams)
    nextParams.delete('servicio')
    setSearchParams(nextParams, { replace: true })
  }, [activeService, searchParams, serviceId, setSearchParams])

  const openService = (service: ServiceItem) => {
    const nextParams = new URLSearchParams(searchParams)
    nextParams.set('servicio', service.id)
    setSearchParams(nextParams)
  }

  const closeService = () => {
    const nextParams = new URLSearchParams(searchParams)
    nextParams.delete('servicio')
    setSearchParams(nextParams, { replace: true })
  }

  return (
    <div className={`service-page service-page-${vertical.slug} bg-surface text-body`}>
      <ServiceHero vertical={vertical} />
      <TrustBand items={vertical.trust} />
      <ServiceCardGrid vertical={vertical} onOpen={openService} />

      <section className="bg-surface py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-5 sm:px-6 lg:grid-cols-12 lg:px-8">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-4">{vertical.editorialPanel.eyebrow}</p>
            <h2 className="text-3xl font-serif font-semibold leading-tight text-heading md:text-5xl">
              {vertical.editorialPanel.title}
            </h2>
            <figure className="mt-8 overflow-hidden rounded-lg border border-line shadow-[0_18px_48px_rgba(10,37,64,0.1)]">
              <img
                src={verticalImage(vertical.slug, density)}
                alt=""
                aria-hidden="true"
                loading="lazy"
                className={`aspect-[5/4] w-full object-cover ${verticalFramePos(vertical.slug, density)}`}
              />
            </figure>
          </div>
          <div className="lg:col-span-7">
            <p className="text-lg leading-9 text-body">{vertical.editorialPanel.body}</p>
            <ul className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
              {vertical.editorialPanel.bullets.map((item) => (
                <li key={item} className="rounded-lg border border-line bg-surface-card p-5 text-sm leading-7 text-body">
                  <CheckCircle2 className="mb-4 text-accent" size={20} />
                  {item}
                </li>
              ))}
            </ul>
            {vertical.editorialPanel.disclaimer ? (
              <p className="mt-6 border-l-2 border-accent bg-surface-2 px-4 py-3 text-sm leading-7 text-body">
                {vertical.editorialPanel.disclaimer}
              </p>
            ) : null}
          </div>
        </div>
      </section>

      <BookingBlock vertical={vertical} />
      <ServiceDrawer service={activeService} vertical={vertical} onClose={closeService} />
    </div>
  )
}
