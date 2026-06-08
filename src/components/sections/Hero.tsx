import { motion } from 'framer-motion'
import { ArrowRight, Award, MapPin, MessageCircle, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import damarisDeskBlue from '../../assets/images/real/damaris-desk-blue.jpg'
import { createWhatsappHref } from '../../data/serviceCatalog'

const proofPoints = [
  { icon: Award, value: 'EA / CAA', label: 'Autoridad IRS e ITIN' },
  { icon: ShieldCheck, value: 'Seguros', label: 'Auto, TLC, casa y negocio' },
  { icon: MapPin, value: 'NYC', label: 'Oficina local bilingüe' },
]

export function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden bg-surface pt-28 pb-12 md:pt-36 md:pb-16">
      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-5 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7"
        >
          <p className="eyebrow mb-5">Washington Heights · Nueva York</p>
          <h1 className="max-w-4xl text-5xl font-serif font-semibold leading-[0.98] text-heading sm:text-6xl lg:text-7xl">
            Christian Brokerage
          </h1>
          <p className="mt-6 max-w-2xl text-2xl font-serif leading-snug text-heading/80 md:text-3xl">
            Seguros, taxes e inmigración con criterio local, documentación clara y trato humano.
          </p>
          <p className="mt-5 max-w-2xl text-base leading-8 text-muted md:text-lg">
            Atendemos a familias, conductores, dueños de negocio y contribuyentes que necesitan resolver procesos importantes sin perderse entre formularios, términos técnicos o promesas vacías.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href="#contacto"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-white shadow-[0_14px_35px_rgba(10,37,64,0.18)] transition hover:bg-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              Agendar orientación
              <ArrowRight size={17} />
            </a>
            <a
              href={createWhatsappHref('Hola, vengo del sitio web y necesito información de Christian Brokerage.')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-[#25D366] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#20ba59] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366]"
            >
              <MessageCircle size={17} />
              WhatsApp
            </a>
            <a
              href="#servicios"
              className="inline-flex min-h-12 items-center justify-center rounded-md border border-line bg-surface-card/65 px-6 py-3 text-sm font-semibold text-heading transition hover:border-line hover:bg-surface-card focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              Ver servicios
            </a>
          </div>

          <div className="mt-9 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {proofPoints.map((point) => (
              <div key={point.label} className="border-l border-line pl-4">
                <point.icon className="mb-3 text-accent" size={20} />
                <p className="font-sans text-lg font-semibold text-heading">{point.value}</p>
                <p className="mt-1 text-sm leading-6 text-muted">{point.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.figure
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5"
        >
          <div className="overflow-hidden rounded-lg border border-line bg-surface-card shadow-[0_28px_70px_rgba(10,37,64,0.16)]">
            <img
              src={damarisDeskBlue}
              alt="Damaris de Christian Brokerage atendiendo desde la oficina"
              className="aspect-[4/5] w-full object-cover"
              loading="eager"
            />
          </div>
          <figcaption className="mt-4 text-sm leading-6 text-muted">
            Atención directa desde una oficina real: procesos de seguros, taxes e inmigración con documentos sobre la mesa.
          </figcaption>
        </motion.figure>
      </div>

      <div className="relative z-10 mx-auto mt-10 max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 border-y border-line bg-surface-card/70 md:grid-cols-3">
          {[
            { label: 'Seguros', to: '/seguros', text: 'Cotizaciones, pólizas y certificados para vida diaria y negocio.' },
            { label: 'Taxes', to: '/taxes', text: 'Declaraciones, ITIN, empresas y cartas del IRS.' },
            { label: 'Inmigración', to: '/inmigracion', text: 'Organización documental, traducciones y soporte administrativo.' },
          ].map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="group flex min-h-28 flex-col justify-between border-b border-line p-5 transition hover:bg-surface-card md:border-b-0 md:border-r last:md:border-r-0"
            >
              <span className="font-sans text-sm font-semibold text-heading">{item.label}</span>
              <span className="mt-3 text-sm leading-6 text-muted">{item.text}</span>
              <ArrowRight className="mt-4 text-accent transition group-hover:translate-x-1" size={16} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
