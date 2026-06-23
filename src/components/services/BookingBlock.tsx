import { CalendarDays, MessageCircle, Phone } from 'lucide-react'
import { motion } from 'framer-motion'
import type { ServiceVertical } from '../../data/serviceCatalog'
import { createWhatsappHref, officePhoneDisplay, officePhoneHref } from '../../data/serviceCatalog'
import { useLanguage } from '../../context/LanguageContext'
import { getCalendarSrc } from '../../lib/calendar'
import { fadeUp, viewportOnce } from '../../lib/motion'

type BookingBlockProps = {
  vertical: ServiceVertical
}

export function BookingBlock({ vertical }: BookingBlockProps) {
  const calendarSrc = getCalendarSrc(vertical.calendarEnv, vertical.slug, vertical.calendarUrl)
  const { tr } = useLanguage()

  return (
    <section id={vertical.bookingAnchor} className="booking-navy overflow-hidden bg-surface-invert py-16 text-white md:py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-5 sm:px-6 lg:grid-cols-12 lg:px-8">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce} className="lg:col-span-5">
          <p className="eyebrow mb-4 text-accent">{tr('Agenda')}</p>
          <h2 className="text-3xl font-serif font-semibold leading-tight text-white md:text-5xl">{vertical.bookingTitle}</h2>
          <p className="mt-5 text-base leading-8 text-white/75">{vertical.bookingCopy}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
            <a
              href={createWhatsappHref(vertical.whatsappPrompt)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-[#25D366] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#20ba59] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <MessageCircle size={17} />
              WhatsApp
            </a>
            <a
              href={officePhoneHref}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:border-accent hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <Phone size={17} />
              {officePhoneDisplay}
            </a>
          </div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="lg:col-span-7"
        >
          <div className="overflow-hidden rounded-lg border border-white/15 bg-surface-card shadow-[0_28px_70px_rgba(0,0,0,0.26)]">
            {calendarSrc ? (
              <iframe
                src={calendarSrc}
                title={`${tr('Calendario')} ${vertical.eyebrow}`}
                id={`ghl-calendar-${vertical.slug}`}
                className="h-[720px] w-full border-0"
                scrolling="no"
              />
            ) : (
              <div className="flex min-h-[420px] flex-col items-center justify-center p-8 text-center text-heading">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-md bg-accent/10 text-accent">
                  <CalendarDays size={26} />
                </div>
                <h3 className="font-sans text-xl font-semibold text-heading">{tr('Coordinamos tu cita directamente')}</h3>
                <p className="mt-3 max-w-md text-sm leading-7 text-muted">
                  {tr('Escríbenos por WhatsApp o llama a la oficina para reservar el horario más conveniente. El calendario se activará cuando el equipo conecte la agenda pública.')}
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={createWhatsappHref(vertical.whatsappPrompt)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#20ba59]"
                  >
                    <MessageCircle size={16} />
                    WhatsApp
                  </a>
                  <a
                    href={officePhoneHref}
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-line px-5 py-2.5 text-sm font-semibold text-heading transition hover:border-accent hover:text-accent"
                  >
                    <Phone size={16} />
                    {tr('Llamar')}
                  </a>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
