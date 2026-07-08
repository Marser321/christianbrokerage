import { CalendarDays, MessageCircle, Phone } from 'lucide-react'
import { createWhatsappHref, officePhoneDisplay, officePhoneHref } from '../../data/serviceCatalog'
import { GhlCalendarFrame } from '../integrations/GhlCalendarFrame'
import { getCalendarSrc } from '../../lib/calendar'

export function ContactSection() {
  const calendarSrc = getCalendarSrc('VITE_GHL_CALENDAR_HOME', 'home')

  return (
    <section id="contacto" className="bg-primary py-16 text-white md:py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-5 sm:px-6 lg:grid-cols-12 lg:px-8">
        <div className="lg:col-span-5">
          <p className="eyebrow mb-4 text-accent">Contacto</p>
          <h2 className="text-3xl font-serif font-semibold leading-tight text-white md:text-5xl">
            Coordinemos el próximo paso.
          </h2>
          <p className="mt-5 text-base leading-8 text-white/75">
            Escríbenos por WhatsApp, llama a la oficina o usa el calendario cuando esté disponible.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={createWhatsappHref('Hola, quiero agendar una orientación con Christian Brokerage.')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-[#25D366] px-5 py-3 text-sm font-semibold text-white"
            >
              <MessageCircle size={17} />
              WhatsApp
            </a>
            <a
              href={officePhoneHref}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-white/20 px-5 py-3 text-sm font-semibold text-white"
            >
              <Phone size={17} />
              {officePhoneDisplay}
            </a>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="overflow-hidden rounded-lg border border-white/15 bg-white shadow-[0_28px_70px_rgba(0,0,0,0.26)]">
            {calendarSrc ? (
              <GhlCalendarFrame
                src={calendarSrc}
                title="Calendario Christian Brokerage"
                id="ghl-calendar-home"
              />
            ) : (
              <div className="flex min-h-[360px] flex-col items-center justify-center p-8 text-center text-primary">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-md bg-accent/10 text-accent">
                  <CalendarDays size={26} />
                </div>
                <h3 className="font-sans text-xl font-semibold text-primary">Agenda por contacto directo</h3>
                <p className="mt-3 max-w-md text-sm leading-7 text-neutral-600">
                  WhatsApp y teléfono son las vías activas para reservar una orientación.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
