import { motion } from 'framer-motion'
import { ArrowRight, MessageCircle } from 'lucide-react'
import { realPhotoFramePos } from '../../data/imageLibrary'
import type { ServiceVertical } from '../../data/serviceCatalog'
import { createWhatsappHref } from '../../data/serviceCatalog'

type ServiceHeroProps = {
  vertical: ServiceVertical
}

export function ServiceHero({ vertical }: ServiceHeroProps) {
  const secondaryVisual = vertical.visual.secondary

  return (
    <section className={`service-hero service-hero-${vertical.slug} relative overflow-hidden bg-surface pt-28 pb-14 md:pt-36 md:pb-20`}>
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" aria-hidden="true" />
      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-5 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className={secondaryVisual ? 'lg:col-span-6' : 'lg:col-span-7'}
        >
          <p className="eyebrow mb-5">{vertical.eyebrow}</p>
          <h1 className="max-w-4xl text-4xl font-serif font-semibold leading-[1.04] text-heading sm:text-5xl lg:text-6xl">
            {vertical.title}
          </h1>
          <p className="mt-6 max-w-2xl text-xl font-serif leading-relaxed text-heading/80">
            {vertical.highlight}
          </p>
          <p className="mt-5 max-w-2xl text-base leading-8 text-muted md:text-lg">
            {vertical.intro}
          </p>
          {vertical.editorialPanel.disclaimer ? (
            <div className="mt-6 max-w-2xl border-l-2 border-accent bg-surface-card/55 px-4 py-3 text-sm leading-6 text-body">
              {vertical.editorialPanel.disclaimer}
            </div>
          ) : null}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href={`#${vertical.bookingAnchor}`}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-white shadow-[0_14px_35px_rgba(10,37,64,0.18)] transition hover:bg-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              {vertical.ctaPrimary}
              <ArrowRight size={17} />
            </a>
            <a
              href={createWhatsappHref(vertical.whatsappPrompt)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-[#25D366]/40 bg-[#25D366] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#20ba59] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366]"
            >
              <MessageCircle size={17} />
              {vertical.whatsappLabel}
            </a>
            <a
              href={`#servicios-${vertical.slug}`}
              className="inline-flex min-h-12 items-center justify-center rounded-md border border-line bg-surface-card/65 px-6 py-3 text-sm font-semibold text-heading transition hover:border-line hover:bg-surface-card focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              {vertical.ctaSecondary}
            </a>
          </div>
        </motion.div>

        <motion.figure
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className={secondaryVisual ? 'lg:col-span-6' : 'lg:col-span-5'}
        >
          {secondaryVisual ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="overflow-hidden rounded-lg border border-line bg-surface-card shadow-[0_24px_60px_rgba(10,37,64,0.15)]">
                <img
                  src={vertical.visual.src}
                  alt={vertical.visual.alt}
                  className={`aspect-[5/4] w-full object-cover sm:aspect-[4/5] ${realPhotoFramePos(`service-${vertical.slug}`)}`}
                  loading="eager"
                  fetchPriority="high"
                />
              </div>
              <div className="overflow-hidden rounded-lg border border-line bg-surface-card shadow-[0_24px_60px_rgba(10,37,64,0.15)]">
                <img
                  src={secondaryVisual.src}
                  alt={secondaryVisual.alt}
                  className={`aspect-[5/4] w-full object-cover sm:aspect-[4/5] ${realPhotoFramePos(`service-${vertical.slug}-secondary`)}`}
                  loading="eager"
                />
              </div>
            </div>
          ) : (
            <div className="relative overflow-hidden rounded-lg border border-line bg-surface-card shadow-[0_28px_70px_rgba(10,37,64,0.16)]">
              <img
                src={vertical.visual.src}
                alt={vertical.visual.alt}
                className={`aspect-[4/5] w-full object-cover ${realPhotoFramePos(`service-${vertical.slug}`)}`}
                loading="eager"
                fetchPriority="high"
              />
            </div>
          )}
          <figcaption className={`mt-4 ${secondaryVisual ? 'max-w-2xl' : 'max-w-md'} text-sm leading-6 text-muted`}>
            {vertical.visual.caption}
          </figcaption>
        </motion.figure>
      </div>
    </section>
  )
}
