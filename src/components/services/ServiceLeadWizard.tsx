import { useEffect, useMemo, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import type { LucideIcon } from 'lucide-react'
import { ArrowRight, CheckCircle2, Clock, FileText, MessageCircle, Send } from 'lucide-react'
import type { ServiceItem, ServiceSlug, ServiceVertical } from '../../data/serviceCatalog'
import { createWhatsappHref, serviceVerticals } from '../../data/serviceCatalog'

type WizardSlug = ServiceSlug | 'unsure'
type ContactPreference = 'whatsapp' | 'phone' | 'email'
type Timeline = 'week' | 'month' | 'guidance'
type FieldName = 'fullName' | 'phone' | 'email'

export type ServiceLeadSelection = {
  slug?: WizardSlug
  serviceId?: string | null
  version?: number
}

export type ServiceLeadPayload = {
  serviceSlug: WizardSlug
  serviceId: string | null
  serviceTitle: string
  fullName: string
  phone: string
  email: string
  contactPreference: ContactPreference
  timeline: Timeline
  message: string
  utm_source: string
  utm_medium: string
  utm_campaign: string
  utm_content: string
  utm_term: string
  gclid: string
  fbclid: string
  page_url: string
  referrer: string
}

type WizardServiceOption = {
  id: string | null
  slug: WizardSlug
  icon: LucideIcon
  title: string
  summary: string
  turnaround: string
  requirements: string
  proTip: string
}

type FormState = {
  fullName: string
  phone: string
  email: string
  contactPreference: ContactPreference
  timeline: Timeline
  message: string
}

type ServiceLeadWizardProps = {
  id?: string
  className?: string
  selection?: ServiceLeadSelection
  verticalHint?: ServiceVertical
}

const verticalList = [serviceVerticals.seguros, serviceVerticals.taxes, serviceVerticals.inmigracion]
const trackedParamNames = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'gclid', 'fbclid'] as const
type TrackedParamName = (typeof trackedParamNames)[number]
const memoryTrackedParams: Partial<Record<TrackedParamName, string>> = {}

const defaultFormState: FormState = {
  fullName: '',
  phone: '',
  email: '',
  contactPreference: 'whatsapp',
  timeline: 'guidance',
  message: '',
}

const areaCopy: Record<WizardSlug, { label: string; desc: string; icon: LucideIcon }> = {
  seguros: {
    label: 'Seguros',
    desc: 'Auto, TLC, casa, negocio, vida y proteccion familiar.',
    icon: serviceVerticals.seguros.trust[0]!.icon,
  },
  taxes: {
    label: 'Taxes',
    desc: 'Declaraciones, ITIN, empresas, cartas y representacion IRS.',
    icon: serviceVerticals.taxes.trust[0]!.icon,
  },
  inmigracion: {
    label: 'Inmigracion',
    desc: 'Documentos, traducciones y soporte administrativo migratorio.',
    icon: serviceVerticals.inmigracion.trust[0]!.icon,
  },
  unsure: {
    label: 'No estoy seguro',
    desc: 'Cuéntanos el caso y te orientamos hacia la ruta correcta.',
    icon: MessageCircle,
  },
}

const timelineOptions: Array<{ value: Timeline; label: string; desc: string }> = [
  { value: 'week', label: 'Esta semana', desc: 'Necesito avanzar pronto.' },
  { value: 'month', label: 'Este mes', desc: 'Estoy organizando documentos.' },
  { value: 'guidance', label: 'Solo orientación', desc: 'Quiero entender opciones.' },
]

const contactOptions: Array<{ value: ContactPreference; label: string }> = [
  { value: 'whatsapp', label: 'WhatsApp' },
  { value: 'phone', label: 'Llamada' },
  { value: 'email', label: 'Email' },
]

function persistTrackedParams() {
  if (typeof window === 'undefined') return
  const params = new URLSearchParams(window.location.search)

  for (const name of trackedParamNames) {
    const value = params.get(name)
    if (!value) continue

    memoryTrackedParams[name] = value
    try {
      window.sessionStorage.setItem(name, value)
    } catch {
      continue
    }
  }
}

function readTrackedParam(name: TrackedParamName) {
  if (typeof window === 'undefined') return ''

  const params = new URLSearchParams(window.location.search)
  const fromUrl = params.get(name)
  if (fromUrl) {
    memoryTrackedParams[name] = fromUrl
    return fromUrl
  }

  const fromMemory = memoryTrackedParams[name]
  if (fromMemory) return fromMemory

  try {
    return window.sessionStorage.getItem(name) ?? ''
  } catch {
    return ''
  }
}

function collectTracking() {
  return {
    utm_source: readTrackedParam('utm_source'),
    utm_medium: readTrackedParam('utm_medium'),
    utm_campaign: readTrackedParam('utm_campaign'),
    utm_content: readTrackedParam('utm_content'),
    utm_term: readTrackedParam('utm_term'),
    gclid: readTrackedParam('gclid'),
    fbclid: readTrackedParam('fbclid'),
    page_url: typeof window === 'undefined' ? '' : window.location.href,
    referrer: typeof document === 'undefined' ? '' : document.referrer,
  }
}

function findService(serviceId: string | null | undefined) {
  if (!serviceId) return null

  for (const vertical of verticalList) {
    const service = vertical.services.find((item) => item.id === serviceId)
    if (service) return { vertical, service }
  }

  return null
}

function serviceToOption(vertical: ServiceVertical, service: ServiceItem): WizardServiceOption {
  return {
    id: service.id,
    slug: vertical.slug,
    icon: service.icon,
    title: service.title,
    summary: service.summary,
    turnaround: service.turnaround,
    requirements: service.requirements,
    proTip: service.proTip,
  }
}

function createGeneralOption(): WizardServiceOption {
  return {
    id: null,
    slug: 'unsure',
    icon: MessageCircle,
    title: 'Orientación general',
    summary: 'Si todavía no sabes qué servicio corresponde, empezamos por ordenar el caso y ubicar la ruta correcta.',
    turnaround: 'Primera respuesta',
    requirements: 'Describe el caso, fechas importantes y documentos que ya tienes disponibles.',
    proTip: 'Una buena orientación inicial evita empezar por el formulario, póliza o trámite equivocado.',
  }
}

function getServiceOptions(selectedSlug: WizardSlug): WizardServiceOption[] {
  if (selectedSlug === 'unsure') {
    return [
      createGeneralOption(),
      ...verticalList.flatMap((vertical) => vertical.services.slice(0, 2).map((service) => serviceToOption(vertical, service))),
    ]
  }

  return serviceVerticals[selectedSlug].services.map((service) => serviceToOption(serviceVerticals[selectedSlug], service))
}

function inputClass(hasError: boolean) {
  return `mt-2 w-full rounded-md border bg-surface-card px-3 py-3 text-sm text-heading transition placeholder:text-muted/65 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
    hasError ? 'border-red-500' : 'border-line hover:border-accent/50'
  }`
}

function validate(form: FormState) {
  const errors: Partial<Record<FieldName, string>> = {}
  const phonePattern = /^(?:\+?1[\s.-]?)?(?:\(?\d{3}\)?[\s.-]?)\d{3}[\s.-]?\d{4}$/
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!form.fullName.trim()) errors.fullName = 'Escribe tu nombre completo.'
  if (!phonePattern.test(form.phone.trim())) errors.phone = 'Usa un teléfono válido de EE.UU.'
  if (!emailPattern.test(form.email.trim())) errors.email = 'Usa un email válido.'

  return errors
}

function createWhatsappMessage(payload: ServiceLeadPayload) {
  return [
    'Hola, completé el diagnóstico de servicios en la web.',
    `Servicio: ${payload.serviceTitle}`,
    `Preferencia: ${payload.contactPreference}`,
    `Urgencia: ${payload.timeline}`,
  ].join('\n')
}

export function ServiceLeadWizard({ id = 'service-lead-wizard', className = '', selection, verticalHint }: ServiceLeadWizardProps) {
  const [selectedSlug, setSelectedSlug] = useState<WizardSlug>(selection?.slug ?? verticalHint?.slug ?? 'unsure')
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(
    selection?.serviceId ?? verticalHint?.services[0]?.id ?? null,
  )
  const [form, setForm] = useState<FormState>(defaultFormState)
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({})
  const [submittedPayload, setSubmittedPayload] = useState<ServiceLeadPayload | null>(null)
  const fieldRefs = useRef<Record<FieldName, HTMLInputElement | null>>({
    fullName: null,
    phone: null,
    email: null,
  })

  const serviceOptions = useMemo(() => getServiceOptions(selectedSlug), [selectedSlug])
  const selectedMatch = findService(selectedServiceId)
  const selectedService = selectedMatch?.service ?? null
  const selectedOption = selectedMatch ? serviceToOption(selectedMatch.vertical, selectedMatch.service) : createGeneralOption()

  useEffect(() => {
    persistTrackedParams()
  }, [])

  const updateForm = (field: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }))
    if (field === 'fullName' || field === 'phone' || field === 'email') {
      setErrors((current) => ({ ...current, [field]: undefined }))
    }
    setSubmittedPayload(null)
  }

  const selectArea = (slug: WizardSlug) => {
    setSelectedSlug(slug)
    setSelectedServiceId(slug === 'unsure' ? null : serviceVerticals[slug].services[0]?.id ?? null)
    setSubmittedPayload(null)
  }

  const selectService = (option: WizardServiceOption) => {
    setSelectedSlug(option.slug)
    setSelectedServiceId(option.id)
    setSubmittedPayload(null)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const nextErrors = validate(form)
    setErrors(nextErrors)

    const firstError = (Object.keys(nextErrors) as FieldName[])[0]
    if (firstError) {
      fieldRefs.current[firstError]?.focus()
      return
    }

    const payload: ServiceLeadPayload = {
      serviceSlug: selectedMatch?.vertical.slug ?? selectedSlug,
      serviceId: selectedService?.id ?? null,
      serviceTitle: selectedService?.title ?? 'Orientación general',
      fullName: form.fullName.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      contactPreference: form.contactPreference,
      timeline: form.timeline,
      message: form.message.trim(),
      ...collectTracking(),
    }

    setSubmittedPayload(payload)
  }

  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={`scroll-mt-28 overflow-hidden rounded-lg border border-line bg-surface-card shadow-[0_18px_50px_rgba(10,37,64,0.08)] ${className}`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="border-b border-line bg-surface px-5 py-7 md:px-7 lg:border-b-0 lg:border-r">
          <p className="eyebrow mb-4">Diagnóstico interactivo</p>
          <h2 id={`${id}-title`} className="text-3xl font-serif font-semibold leading-tight text-heading md:text-4xl">
            Encuentra el servicio correcto antes de dejar tus datos.
          </h2>
          <p className="mt-4 text-sm leading-7 text-muted">
            Selecciona el área, confirma el servicio y deja un resumen claro para que el equipo pueda responder con contexto.
          </p>

          <div className="mt-7">
            <h3 className="font-sans text-sm font-semibold uppercase text-accent">1. Área</h3>
            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {(Object.keys(areaCopy) as WizardSlug[]).map((slug) => {
                const Icon = areaCopy[slug].icon
                const active = selectedSlug === slug

                return (
                  <button
                    key={slug}
                    type="button"
                    aria-pressed={active}
                    onClick={() => selectArea(slug)}
                    className={`group min-h-[132px] rounded-md border p-4 text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                      active
                        ? 'border-accent bg-accent/10 text-heading'
                        : 'border-line bg-surface-card text-body hover:border-accent/45 hover:bg-surface-2'
                    }`}
                  >
                    <span className="flex items-start gap-3">
                      <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-md ${active ? 'bg-primary text-white' : 'bg-accent/10 text-accent'}`}>
                        <Icon size={19} aria-hidden="true" />
                      </span>
                      <span>
                        <span className="block font-sans text-sm font-semibold text-heading">{areaCopy[slug].label}</span>
                        <span className="mt-1 block text-xs leading-5 text-muted">{areaCopy[slug].desc}</span>
                      </span>
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="mt-7">
            <h3 className="font-sans text-sm font-semibold uppercase text-accent">2. Servicio</h3>
            <div className="mt-3 max-h-[360px] space-y-2 overflow-y-auto pr-1" data-lenis-prevent>
              {serviceOptions.map((option) => {
                const Icon = option.icon
                const active = selectedServiceId === option.id && selectedSlug === option.slug

                return (
                  <button
                    key={`${option.slug}-${option.id ?? 'general'}`}
                    type="button"
                    aria-pressed={active}
                    onClick={() => selectService(option)}
                    className={`flex w-full gap-3 rounded-md border p-3 text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                      active
                        ? 'border-accent bg-accent/10'
                        : 'border-line bg-surface-card hover:border-accent/45 hover:bg-surface-2'
                    }`}
                  >
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-accent/10 text-accent">
                      <Icon size={17} aria-hidden="true" />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-sans text-sm font-semibold leading-snug text-heading">{option.title}</span>
                      <span className="mt-1 line-clamp-2 block text-xs leading-5 text-muted">{option.summary}</span>
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        <div className="bg-surface-card px-5 py-7 md:px-7">
          <div className="rounded-md border border-line bg-surface p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="eyebrow mb-2">Ficha de orientación</p>
                <h3 className="font-sans text-xl font-semibold leading-tight text-heading">{selectedOption.title}</h3>
              </div>
              <CheckCircle2 className="mt-1 shrink-0 text-accent" size={22} aria-hidden="true" />
            </div>
            <p className="mt-4 text-sm leading-7 text-muted">{selectedOption.summary}</p>
            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="rounded-md border border-line bg-surface-card p-4">
                <Clock className="mb-3 text-accent" size={18} aria-hidden="true" />
                <p className="font-sans text-xs font-semibold uppercase text-heading">Tiempo estimado</p>
                <p className="mt-2 text-sm leading-6 text-muted">{selectedOption.turnaround}</p>
              </div>
              <div className="rounded-md border border-line bg-surface-card p-4">
                <FileText className="mb-3 text-accent" size={18} aria-hidden="true" />
                <p className="font-sans text-xs font-semibold uppercase text-heading">Documentos base</p>
                <p className="mt-2 text-sm leading-6 text-muted">{selectedOption.requirements}</p>
              </div>
            </div>
            <p className="mt-4 border-l-2 border-accent bg-accent/10 px-4 py-3 font-serif text-base leading-7 text-heading/80">
              {selectedOption.proTip}
            </p>
          </div>

          <form className="mt-6" noValidate onSubmit={handleSubmit}>
            <h3 className="font-sans text-sm font-semibold uppercase text-accent">3. Resumen del lead</h3>

            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor={`${id}-fullName`} className="font-sans text-sm font-semibold text-heading">
                  Nombre completo
                </label>
                <input
                  ref={(node) => {
                    fieldRefs.current.fullName = node
                  }}
                  id={`${id}-fullName`}
                  name="fullName"
                  type="text"
                  autoComplete="name"
                  value={form.fullName}
                  onChange={(event) => updateForm('fullName', event.target.value)}
                  aria-invalid={Boolean(errors.fullName)}
                  aria-describedby={errors.fullName ? `${id}-fullName-error` : undefined}
                  className={inputClass(Boolean(errors.fullName))}
                />
                {errors.fullName ? (
                  <p id={`${id}-fullName-error`} className="mt-2 text-sm font-semibold text-red-600">
                    {errors.fullName}
                  </p>
                ) : null}
              </div>

              <div>
                <label htmlFor={`${id}-phone`} className="font-sans text-sm font-semibold text-heading">
                  Teléfono móvil
                </label>
                <input
                  ref={(node) => {
                    fieldRefs.current.phone = node
                  }}
                  id={`${id}-phone`}
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  value={form.phone}
                  onChange={(event) => updateForm('phone', event.target.value)}
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={errors.phone ? `${id}-phone-error` : undefined}
                  placeholder="Ej. (212) 555-0100…"
                  className={inputClass(Boolean(errors.phone))}
                />
                {errors.phone ? (
                  <p id={`${id}-phone-error`} className="mt-2 text-sm font-semibold text-red-600">
                    {errors.phone}
                  </p>
                ) : null}
              </div>

              <div>
                <label htmlFor={`${id}-email`} className="font-sans text-sm font-semibold text-heading">
                  Email
                </label>
                <input
                  ref={(node) => {
                    fieldRefs.current.email = node
                  }}
                  id={`${id}-email`}
                  name="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  spellCheck={false}
                  value={form.email}
                  onChange={(event) => updateForm('email', event.target.value)}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? `${id}-email-error` : undefined}
                  placeholder="Ej. nombre@email.com…"
                  className={inputClass(Boolean(errors.email))}
                />
                {errors.email ? (
                  <p id={`${id}-email-error`} className="mt-2 text-sm font-semibold text-red-600">
                    {errors.email}
                  </p>
                ) : null}
              </div>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <p className="font-sans text-sm font-semibold text-heading">Preferencia de contacto</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {contactOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      aria-pressed={form.contactPreference === option.value}
                      onClick={() => updateForm('contactPreference', option.value)}
                      className={`min-h-10 rounded-md border px-3 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                        form.contactPreference === option.value
                          ? 'border-accent bg-accent/10 text-heading'
                          : 'border-line text-muted hover:border-accent/45 hover:text-heading'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="font-sans text-sm font-semibold text-heading">Urgencia</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {timelineOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      aria-pressed={form.timeline === option.value}
                      onClick={() => updateForm('timeline', option.value)}
                      title={option.desc}
                      className={`min-h-10 rounded-md border px-3 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                        form.timeline === option.value
                          ? 'border-accent bg-accent/10 text-heading'
                          : 'border-line text-muted hover:border-accent/45 hover:text-heading'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-5">
              <label htmlFor={`${id}-message`} className="font-sans text-sm font-semibold text-heading">
                ¿Qué necesitas resolver?
              </label>
              <textarea
                id={`${id}-message`}
                name="message"
                rows={4}
                value={form.message}
                onChange={(event) => updateForm('message', event.target.value)}
                placeholder="Ej. Tengo una carta, una renovación o una fecha límite…"
                className="mt-2 w-full resize-y rounded-md border border-line bg-surface-card px-3 py-3 text-sm leading-6 text-heading transition placeholder:text-muted/65 hover:border-accent/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              />
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                type="submit"
                className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                Preparar resumen
                <Send size={16} aria-hidden="true" />
              </button>
              <a
                href={createWhatsappHref(`Hola, necesito orientación de Christian Brokerage sobre ${selectedOption.title}.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-line px-5 py-3 text-sm font-semibold text-heading transition hover:border-[#25D366]/50 hover:text-[#128C7E] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                WhatsApp
                <ArrowRight size={16} aria-hidden="true" />
              </a>
            </div>

            <p className="mt-3 text-xs leading-5 text-muted" aria-live="polite">
              Mock visual: este formulario prepara el payload interno; la conexión real a GHL queda para la siguiente fase.
            </p>
          </form>

          {submittedPayload ? (
            <div className="mt-6 rounded-md border border-accent/30 bg-accent/10 p-5" role="status" aria-live="polite">
              <h3 className="font-sans text-lg font-semibold text-heading">Resumen preparado</h3>
              <p className="mt-2 text-sm leading-7 text-body">
                El lead mock quedó armado para {submittedPayload.serviceTitle}. Incluye servicio, preferencia, urgencia, URL,
                referrer y UTMs disponibles.
              </p>
              <a
                href={createWhatsappHref(createWhatsappMessage(submittedPayload))}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#20ba59] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366]"
              >
                Enviar resumen por WhatsApp
                <MessageCircle size={16} aria-hidden="true" />
              </a>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}
