import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Building2, CalendarDays, CheckCircle2, MessageCircle, Phone } from 'lucide-react'
import { Hero } from '../components/sections/Hero'
import { NumberTicker } from '../components/ui/NumberTicker'
import { fadeUp, staggerContainer, staggerItem, viewportOnce } from '../lib/motion'
import { useVariant } from '../context/VariantContext'
import { mainCardFramePos, mainCardImage, realPhotoFramePos } from '../data/imageLibrary'
import { diagnosticoHref, homeServicePreviewCount, serviceHref } from '../data/navigationCatalog'
import christianReal from '../assets/images/real/christian-real.jpg'
import damarisReal from '../assets/images/real/damaris-real.jpg'
import damarisWhiteBook from '../assets/images/real/damaris-white-book.jpg'
import {
  createWhatsappHref,
  officePhoneDisplay,
  officePhoneHref,
  serviceVerticals,
} from '../data/serviceCatalog'
import { getCalendarSrc } from '../lib/calendar'

const verticals = [serviceVerticals.seguros, serviceVerticals.taxes, serviceVerticals.inmigracion]

const processSteps = [
  'Escuchamos el caso y pedimos solo documentos relevantes.',
  'Explicamos opciones, tiempos, riesgos y costos antes de avanzar.',
  'Preparamos, emitimos o presentamos con copias claras para el cliente.',
  'Damos seguimiento a renovaciones, cartas, vencimientos o próximos pasos.',
]

function HomeServices() {
  const { density } = useVariant()

  return (
    <section id="servicios" className="bg-surface-2 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-3xl md:mb-14">
          <p className="eyebrow mb-4">Servicios principales</p>
          <h2 className="text-3xl font-serif font-semibold leading-tight text-heading md:text-5xl">
            Tres áreas, un mismo estándar: claridad documental y atención humana.
          </h2>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 gap-5 lg:grid-cols-3"
        >
          {verticals.map((vertical) => (
            <motion.article variants={staggerItem} key={vertical.slug} className="flex min-h-[430px] flex-col overflow-hidden rounded-lg border border-line bg-surface-card shadow-[0_16px_42px_rgba(10,37,64,0.06)]">
              <img
                src={mainCardImage(vertical.slug, density)}
                alt=""
                aria-hidden="true"
                loading="lazy"
                className={`h-56 w-full object-cover ${mainCardFramePos(vertical.slug, density)}`}
              />
              <div
                className="editorial-bg relative flex flex-1 flex-col overflow-hidden"
                style={
                  density === 'combo'
                    ? ({ '--editorial-bg': `url("${mainCardImage(vertical.slug, 'minimal')}")` } as React.CSSProperties)
                    : undefined
                }
              >
                <div className="relative flex flex-1 flex-col p-6">
                  <p className="eyebrow mb-4">{vertical.eyebrow}</p>
                  <h3 className="font-sans text-2xl font-semibold leading-tight text-heading">{vertical.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-muted">{vertical.highlight}</p>
                  <ul className="mt-6 space-y-3">
                    {vertical.services.slice(0, homeServicePreviewCount).map((service) => (
                      <li key={service.id}>
                        <Link
                          to={serviceHref(vertical.slug, service.id)}
                          className="group flex gap-3 rounded-md text-sm leading-6 text-body transition hover:text-heading focus-visible:bg-surface-2 focus-visible:px-2 focus-visible:py-1"
                        >
                          <CheckCircle2 className="mt-0.5 shrink-0 text-accent" size={16} aria-hidden="true" />
                          <span className="underline-offset-4 group-hover:underline">{service.title}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto flex flex-col gap-2 pt-6 sm:flex-row lg:flex-col xl:flex-row">
                    <Link
                      to={diagnosticoHref(vertical.slug)}
                      className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                    >
                      Orientarme
                      <ArrowRight size={16} aria-hidden="true" />
                    </Link>
                    <Link
                      to={`/${vertical.slug}`}
                      className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-md border border-line px-4 py-2.5 text-sm font-semibold text-heading transition hover:border-accent/50 hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                    >
                      Explorar
                      <ArrowRight size={16} aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

      </div>
    </section>
  )
}

function OfficeProof() {
  return (
    <section id="nosotros" className="bg-surface py-16 md:py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-5 sm:px-6 lg:grid-cols-12 lg:items-center lg:px-8">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce} className="lg:col-span-5">
          <p className="eyebrow mb-4">Nosotros</p>
          <h2 className="text-3xl font-serif font-semibold leading-tight text-heading md:text-5xl">
            Más de 30 años de experiencia, en el mismo local de Washington Heights.
          </h2>
          <p className="mt-5 text-base leading-8 text-muted">
            Christian Brokerage es un negocio con raíces en la comunidad latina de Nueva York: atención presencial, certificaciones a la vista y un trato directo en español. Más de tres décadas en servicios financieros y administrativos, desde la misma oficina de siempre.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="border-l border-line pl-4">
              <Building2 className="mb-3 text-accent" size={21} />
              <p className="font-sans text-sm font-semibold text-heading">501 W 161st St</p>
              <p className="mt-1 text-sm leading-6 text-muted">New York, NY 10032 · Washington Heights local.</p>
            </div>
            <div className="border-l border-line pl-4">
              <Phone className="mb-3 text-accent" size={21} />
              <p className="font-sans text-sm font-semibold text-heading">{officePhoneDisplay}</p>
              <p className="mt-1 text-sm leading-6 text-muted">Teléfono, WhatsApp y atención en español.</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid gap-5 lg:col-span-7 sm:grid-cols-2"
        >
          <motion.figure
            variants={staggerItem}
            className="overflow-hidden rounded-lg border border-line bg-surface-card shadow-[0_22px_58px_rgba(10,37,64,0.1)]"
          >
            <img
              src={christianReal}
              alt="Christian Eduardo, fundador de Christian Brokerage, en su oficina"
              className="aspect-[4/5] w-full object-cover object-[center_25%]"
              loading="lazy"
            />
            <figcaption className="p-5">
              <p className="font-sans text-base font-semibold text-heading">Christian Eduardo</p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-accent">Fundador · Preparación de impuestos (EA)</p>
              <p className="mt-3 text-sm leading-6 text-muted">
                Cuenta con amplia experiencia en la preparación de impuestos y gestión administrativa, con énfasis en precisión y cumplimiento.
              </p>
            </figcaption>
          </motion.figure>
          <motion.figure
            variants={staggerItem}
            className="overflow-hidden rounded-lg border border-line bg-surface-card shadow-[0_22px_58px_rgba(10,37,64,0.1)] sm:mt-12"
          >
            <img
              src={damarisReal}
              alt="Damaris Escalante de Christian Brokerage en su oficina"
              className="aspect-[4/5] w-full object-cover object-[center_25%]"
              loading="lazy"
            />
            <figcaption className="p-5">
              <p className="font-sans text-base font-semibold text-heading">Damaris Escalante</p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-accent">Coordinadora de Servicios · Seguros e Inmigración</p>
              <p className="mt-3 text-sm leading-6 text-muted">
                Con más de 25 años de experiencia, ha desarrollado su trayectoria trabajando de forma directa con clientes, especialmente dentro de la comunidad latina de Washington Heights.
              </p>
            </figcaption>
          </motion.figure>
        </motion.div>
      </div>
    </section>
  )
}

function ProcessBand() {
  return (
    <section id="valores" className="border-y border-line bg-surface-card py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 gap-8 md:grid-cols-4"
        >
          {processSteps.map((step, index) => (
            <motion.div variants={staggerItem} key={step} className="border-l border-line pl-5">
              <NumberTicker value={index + 1} className="font-serif text-3xl font-semibold text-accent" />
              <p className="mt-3 text-sm leading-7 text-body">{step}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function HomeBooking() {
  const calendarSrc = getCalendarSrc('VITE_GHL_CALENDAR_HOME', 'home')

  return (
    <section id="contacto" className="booking-navy overflow-hidden bg-surface-invert py-16 text-white md:py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-5 sm:px-6 lg:grid-cols-12 lg:px-8">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce} className="lg:col-span-5">
          <p className="eyebrow mb-4 text-accent">Contacto</p>
          <h2 className="text-3xl font-serif font-semibold leading-tight text-white md:text-5xl">
            Empecemos por ordenar tu caso.
          </h2>
          <p className="mt-5 text-base leading-8 text-white/75">
            Escríbenos qué necesitas resolver y qué documentos tienes a mano. Te orientamos hacia el servicio correcto sin hacerte repetir la historia tres veces.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
            <a
              href={createWhatsappHref('Hola, quiero agendar una orientación con Christian Brokerage.')}
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

          <figure className="mt-8 flex items-center gap-4 border-t border-white/15 pt-6">
            <img
              src={damarisWhiteBook}
              alt="Damaris Escalante, Enrolled Agent de Christian Brokerage"
              className={`h-20 w-16 shrink-0 rounded-lg border border-white/20 object-cover ${realPhotoFramePos('home-contacto')}`}
              loading="lazy"
            />
            <figcaption className="text-sm leading-6 text-white/75">
              <span className="block font-semibold text-white">Te atiende Damaris Escalante</span>
              Enrolled Agent (EA) · atención bilingüe en español.
            </figcaption>
          </figure>
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
                title="Calendario Christian Brokerage"
                id="ghl-calendar-home"
                className="h-[720px] w-full border-0"
                scrolling="no"
              />
            ) : (
              <div className="flex min-h-[420px] flex-col items-center justify-center p-8 text-center text-heading">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-md bg-accent/10 text-accent">
                  <CalendarDays size={26} />
                </div>
                <h3 className="font-sans text-xl font-semibold text-heading">Coordinamos la cita directamente</h3>
                <p className="mt-3 max-w-md text-sm leading-7 text-muted">
                  Mientras conectamos la agenda pública, la vía más rápida es WhatsApp o una llamada a la oficina.
                </p>
                <a
                  href={createWhatsappHref('Hola, quiero reservar una cita con Christian Brokerage.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#20ba59]"
                >
                  <MessageCircle size={16} />
                  Reservar por WhatsApp
                </a>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export function Home() {
  return (
    <>
      <Hero />
      <HomeServices />
      <OfficeProof />
      <ProcessBand />
      <HomeBooking />
    </>
  )
}
