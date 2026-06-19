import { useEffect, useMemo, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import type { LucideIcon } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock,
  FileSpreadsheet,
  FileText,
  Globe,
  Loader2,
  MessageCircle,
  Phone,
  Send,
  ShieldCheck,
} from 'lucide-react'
import type { ServiceItem, ServiceSlug, ServiceVertical } from '../../data/serviceCatalog'
import {
  createWhatsappHref,
  officePhoneDisplay,
  officePhoneHref,
  serviceVerticals,
} from '../../data/serviceCatalog'
import { useLanguage, useLocalizedServiceVerticals } from '../../context/LanguageContext'
import { submitLead } from '../../lib/leads'
import { EASE_BRAND } from '../../lib/motion'

type WizardSlug = ServiceSlug | 'unsure'
type ContactPreference = 'whatsapp' | 'phone' | 'email'
type Timeline = 'week' | 'month' | 'guidance'
type FieldName = 'fullName' | 'phone' | 'email'
type Step = 'situation' | 'service' | 'result' | 'timeline' | 'contact' | 'done'
type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error'

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

export type DiagnosticoInitialState = {
  step: Step
  slug: WizardSlug
  serviceId: string | null
}

type DiagnosticoWizardProps = {
  id?: string
  initial?: DiagnosticoInitialState
}

const verticalList = [serviceVerticals.seguros, serviceVerticals.taxes, serviceVerticals.inmigracion, serviceVerticals.otros]
const trackedParamNames = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'gclid', 'fbclid'] as const
type TrackedParamName = (typeof trackedParamNames)[number]
const memoryTrackedParams: Partial<Record<TrackedParamName, string>> = {}

const SERVICE_PREVIEW_COUNT = 5
const validSlugs: WizardSlug[] = ['seguros', 'taxes', 'inmigracion', 'otros', 'unsure']

const defaultFormState: FormState = {
  fullName: '',
  phone: '',
  email: '',
  contactPreference: 'whatsapp',
  timeline: 'guidance',
  message: '',
}

type SituationCard = { slug: WizardSlug; label: string; desc: string; tag: string; icon: LucideIcon }

const situationCards: SituationCard[] = [
  {
    slug: 'seguros',
    label: 'Quiero proteger algo',
    desc: 'Mi carro, mi casa, mi negocio, mi familia o mi taxi/TLC.',
    tag: 'Seguros',
    icon: ShieldCheck,
  },
  {
    slug: 'taxes',
    label: 'Tengo que resolver impuestos o algo del IRS',
    desc: 'Declarar taxes, sacar o renovar ITIN, o me llegó una carta del IRS.',
    tag: 'Taxes',
    icon: FileSpreadsheet,
  },
  {
    slug: 'inmigracion',
    label: 'Estoy con un trámite de inmigración',
    desc: 'Petición familiar, permiso de trabajo, residencia, ciudadanía o cita consular.',
    tag: 'Inmigración',
    icon: Globe,
  },
  {
    slug: 'otros',
    label: 'Necesito un documento o trámite',
    desc: 'Notaría, traducción certificada, divorcio o abrir una compañía (LLC).',
    tag: 'Otros servicios',
    icon: FileText,
  },
]

const unsureCard: SituationCard = {
  slug: 'unsure',
  label: 'No estoy seguro / son varias cosas',
  desc: 'Cuéntanos el caso con tus palabras y te orientamos hacia la ruta correcta.',
  tag: 'Te orientamos',
  icon: MessageCircle,
}

const serviceStepHelper: Record<ServiceSlug, string> = {
  seguros: 'Estas son las protecciones más pedidas. ¿No ves la tuya? Elige “Muéstrame todo” o pide orientación.',
  taxes: 'Estos son los trámites de impuestos más comunes. Si dudas, abajo tienes “No sé cuál es”.',
  inmigracion: 'Estos son los trámites migratorios que más acompañamos. ¿No es ninguno? Pide orientación abajo.',
  otros: 'Notaría, traducciones, divorcios y compañías. Si dudas, elige “No sé cuál es”.',
}

const timelineOptions: Array<{ value: Timeline; label: string; desc: string }> = [
  { value: 'week', label: 'Esta semana', desc: 'Necesito avanzar pronto.' },
  { value: 'month', label: 'Este mes', desc: 'Estoy juntando documentos.' },
  { value: 'guidance', label: 'Solo orientación', desc: 'Quiero entender mis opciones primero.' },
]

const contactOptions: Array<{ value: ContactPreference; label: string }> = [
  { value: 'whatsapp', label: 'WhatsApp' },
  { value: 'phone', label: 'Llamada' },
  { value: 'email', label: 'Email' },
]

const stepProgress: Record<Exclude<Step, 'done'>, number> = {
  situation: 1,
  service: 2,
  result: 2,
  timeline: 3,
  contact: 4,
}

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

export function findService(serviceId: string | null | undefined) {
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

function createGeneralOption(tr: (text: string) => string): WizardServiceOption {
  return {
    id: null,
    slug: 'unsure',
    icon: MessageCircle,
    title: tr('Orientación general'),
    summary: tr('Si todavía no sabes qué servicio corresponde, empezamos por ordenar el caso y ubicar la ruta correcta.'),
    turnaround: tr('Primera respuesta el mismo día hábil'),
    requirements: tr('Describe el caso, las fechas importantes y los documentos que ya tienes disponibles.'),
    proTip: tr('Una buena orientación inicial evita empezar por el formulario, póliza o trámite equivocado.'),
  }
}

function contactLabel(value: ContactPreference, tr: (text: string) => string = (text) => text) {
  return tr(contactOptions.find((option) => option.value === value)?.label ?? value)
}

function timelineLabel(value: Timeline, tr: (text: string) => string = (text) => text) {
  return tr(timelineOptions.find((option) => option.value === value)?.label ?? value)
}

function inputClass(hasError: boolean) {
  return `mt-2 w-full rounded-md border bg-surface-card px-3 py-3 text-sm text-heading transition placeholder:text-muted/65 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
    hasError ? 'border-red-500' : 'border-line hover:border-accent/50'
  }`
}

function validate(form: FormState, tr: (text: string) => string) {
  const errors: Partial<Record<FieldName, string>> = {}
  const phonePattern = /^(?:\+?1[\s.-]?)?(?:\(?\d{3}\)?[\s.-]?)\d{3}[\s.-]?\d{4}$/
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!form.fullName.trim()) errors.fullName = tr('Escribe tu nombre completo.')
  if (!phonePattern.test(form.phone.trim())) errors.phone = tr('Usa un teléfono válido de EE.UU.')
  if (!emailPattern.test(form.email.trim())) errors.email = tr('Usa un email válido.')

  return errors
}

function createWhatsappMessage(payload: ServiceLeadPayload, tr: (text: string) => string) {
  const lines = [
    tr('Hola, completé el diagnóstico en la web.'),
    `${tr('Nombre:')} ${payload.fullName}`,
    `${tr('Servicio:')} ${payload.serviceTitle}`,
    `${tr('Preferencia:')} ${contactLabel(payload.contactPreference, tr)}`,
    `${tr('Urgencia:')} ${timelineLabel(payload.timeline, tr)}`,
  ]
  if (payload.message) lines.push(`${tr('Detalle:')} ${payload.message}`)
  return lines.join('\n')
}

/** Traduce los query params `?area=&servicio=` al estado inicial del stepper. */
export function resolveInitialFromParams(area: string | null, servicio: string | null): DiagnosticoInitialState {
  const match = findService(servicio)
  if (match) {
    return { step: 'result', slug: match.vertical.slug, serviceId: match.service.id }
  }

  if (area && (validSlugs as string[]).includes(area)) {
    return { step: 'service', slug: area as WizardSlug, serviceId: null }
  }

  return { step: 'situation', slug: 'unsure', serviceId: null }
}

const defaultInitial: DiagnosticoInitialState = { step: 'situation', slug: 'unsure', serviceId: null }

export function DiagnosticoWizard({ id = 'diagnostico-wizard', initial = defaultInitial }: DiagnosticoWizardProps) {
  const { tr } = useLanguage()
  const localizedVerticals = useLocalizedServiceVerticals()
  const localizedVerticalList = useMemo(
    () => [localizedVerticals.seguros, localizedVerticals.taxes, localizedVerticals.inmigracion, localizedVerticals.otros],
    [localizedVerticals],
  )
  const [step, setStep] = useState<Step>(initial.step)
  const [selectedSlug, setSelectedSlug] = useState<WizardSlug>(initial.slug)
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(initial.serviceId)
  const [showAllServices, setShowAllServices] = useState(false)
  const [form, setForm] = useState<FormState>(defaultFormState)
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({})
  const [status, setStatus] = useState<SubmitStatus>('idle')
  const [submittedPayload, setSubmittedPayload] = useState<ServiceLeadPayload | null>(null)

  const fieldRefs = useRef<Record<FieldName, HTMLInputElement | null>>({ fullName: null, phone: null, email: null })
  const headingRef = useRef<HTMLHeadingElement | null>(null)
  const isFirstStep = useRef(true)
  const reduceMotion = useReducedMotion()

  const selectedMatch = useMemo(() => {
    if (!selectedServiceId) return null

    for (const vertical of localizedVerticalList) {
      const service = vertical.services.find((item) => item.id === selectedServiceId)
      if (service) return { vertical, service }
    }

    return null
  }, [localizedVerticalList, selectedServiceId])
  const selectedVertical = selectedMatch?.vertical ?? null
  const selectedOption = selectedMatch ? serviceToOption(selectedMatch.vertical, selectedMatch.service) : createGeneralOption(tr)

  const serviceOptions = useMemo<WizardServiceOption[]>(() => {
    if (selectedSlug === 'unsure') return []
    const vertical = localizedVerticals[selectedSlug]
    return vertical.services.map((service) => serviceToOption(vertical, service))
  }, [localizedVerticals, selectedSlug])

  const visibleServices = showAllServices ? serviceOptions : serviceOptions.slice(0, SERVICE_PREVIEW_COUNT)
  const hiddenCount = serviceOptions.length - visibleServices.length

  useEffect(() => {
    persistTrackedParams()
  }, [])

  // Mueve el foco al título de cada paso (sin robarlo en el primer render).
  useEffect(() => {
    if (isFirstStep.current) {
      isFirstStep.current = false
      return
    }
    headingRef.current?.focus()
  }, [step])

  const updateForm = (field: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }))
    if (field === 'fullName' || field === 'phone' || field === 'email') {
      setErrors((current) => ({ ...current, [field]: undefined }))
    }
  }

  const selectSituation = (slug: WizardSlug) => {
    setSelectedSlug(slug)
    setSelectedServiceId(null)
    setShowAllServices(false)
    setStatus('idle')
    setStep('service')
  }

  const selectService = (option: WizardServiceOption) => {
    setSelectedSlug(option.slug)
    setSelectedServiceId(option.id)
    setStatus('idle')
    setStep('result')
  }

  const chooseGeneral = () => {
    setSelectedServiceId(null)
    setStatus('idle')
    setStep('result')
  }

  const goBack = () => {
    setStatus('idle')
    if (step === 'service') setStep('situation')
    else if (step === 'result') setStep(selectedSlug === 'unsure' ? 'situation' : 'service')
    else if (step === 'timeline') setStep('result')
    else if (step === 'contact') setStep('timeline')
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const nextErrors = validate(form, tr)
    setErrors(nextErrors)

    const firstError = (Object.keys(nextErrors) as FieldName[])[0]
    if (firstError) {
      fieldRefs.current[firstError]?.focus()
      return
    }

    const payload: ServiceLeadPayload = {
      serviceSlug: selectedMatch?.vertical.slug ?? selectedSlug,
      serviceId: selectedMatch?.service.id ?? null,
      serviceTitle: selectedOption.title,
      fullName: form.fullName.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      contactPreference: form.contactPreference,
      timeline: form.timeline,
      message: form.message.trim(),
      ...collectTracking(),
    }

    setSubmittedPayload(payload)
    setStatus('submitting')
    const result = await submitLead(payload)
    setStatus(result.ok ? 'success' : 'error')
    setStep('done')
  }

  const directWhatsappHref = createWhatsappHref(
    selectedOption.title && selectedOption.title !== tr('Orientación general')
      ? `${tr('Hola, necesito orientación de Christian Brokerage sobre')} ${selectedOption.title}.`
      : tr('Hola, necesito orientación de Christian Brokerage.'),
  )
  const bookingHref = selectedVertical ? `/${selectedVertical.slug}#${selectedVertical.bookingAnchor}` : '/#contacto'
  const firstName = submittedPayload?.fullName.split(' ')[0] ?? ''

  const headingText =
    step === 'service' && selectedSlug === 'unsure' ? tr('Cuéntanos un poco más') : tr(stepTitle[step])
  const progress = step === 'done' ? 4 : stepProgress[step]

  const transition = reduceMotion ? { duration: 0 } : { duration: 0.32, ease: EASE_BRAND }
  const motionProps = reduceMotion
    ? { initial: false as const }
    : { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -12 } }

  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="overflow-hidden rounded-xl border border-line bg-surface-card shadow-[0_18px_50px_rgba(10,37,64,0.08)]"
    >
      {step !== 'done' ? (
        <div className="border-b border-line bg-surface px-5 py-4 md:px-7">
          <div className="flex items-center justify-between gap-4">
            {step !== 'situation' ? (
              <button
                type="button"
                onClick={goBack}
                className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-sm font-semibold text-muted transition hover:text-heading focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <ArrowLeft size={16} aria-hidden="true" />
                {tr('Atrás')}
              </button>
            ) : (
              <span className="text-sm font-semibold text-muted">{tr('Diagnóstico')}</span>
            )}
            <span className="text-xs font-semibold uppercase tracking-wide text-muted">
              {tr('Paso')} {progress} {tr('de')} 4
            </span>
          </div>
          <div
            className="mt-3 flex gap-1.5"
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={1}
            aria-valuemax={4}
            aria-valuetext={`${tr('Paso')} ${progress} ${tr('de')} 4: ${headingText}`}
          >
            {[1, 2, 3, 4].map((segment) => (
              <span
                key={segment}
                className={`h-1.5 flex-1 rounded-full transition-colors ${segment <= progress ? 'bg-accent' : 'bg-line'}`}
              />
            ))}
          </div>
        </div>
      ) : null}

      <p className="sr-only" aria-live="polite">
        {step !== 'done' ? `${tr('Paso')} ${progress} ${tr('de')} 4: ${headingText}` : tr('Diagnóstico completado.')}
      </p>

      <div className="px-5 py-7 md:px-8 md:py-9">
        <AnimatePresence mode="wait">
          <motion.div key={step} {...motionProps} transition={transition}>
            {step === 'situation' ? (
              <div>
                <p className="eyebrow mb-3">{tr('Paso 1')}</p>
                <h2 ref={headingRef} tabIndex={-1} id={`${id}-title`} className="text-2xl font-serif font-semibold leading-tight text-heading outline-none md:text-3xl">
                  {tr('¿Qué necesitas resolver?')}
                </h2>
                <p className="mt-3 text-sm leading-7 text-muted">
                  {tr('Elige lo que más se parezca a tu caso. Si no estás seguro, no importa: hay una opción para eso.')}
                </p>
                <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {situationCards.map((card) => (
                    <SituationButton key={card.slug} card={card} active={selectedSlug === card.slug} onClick={() => selectSituation(card.slug)} tr={tr} />
                  ))}
                  <div className="sm:col-span-2">
                    <SituationButton card={unsureCard} active={selectedSlug === 'unsure'} dashed onClick={() => selectSituation('unsure')} tr={tr} />
                  </div>
                </div>
              </div>
            ) : null}

            {step === 'service' ? (
              <div>
                <p className="eyebrow mb-3">{tr('Paso 2')}</p>
                <h2 ref={headingRef} tabIndex={-1} id={`${id}-title`} className="text-2xl font-serif font-semibold leading-tight text-heading outline-none md:text-3xl">
                  {headingText}
                </h2>

                {selectedSlug === 'unsure' ? (
                  <div className="mt-4">
                    <p className="text-sm leading-7 text-muted">
                      {tr('En una o dos frases, ¿qué necesitas? (opcional) Con eso preparamos tu orientación.')}
                    </p>
                    <textarea
                      rows={4}
                      value={form.message}
                      onChange={(event) => updateForm('message', event.target.value)}
                      placeholder={tr('Ej. Me llegó una carta, tengo una renovación, o quiero abrir un negocio…')}
                      className="mt-3 w-full resize-y rounded-md border border-line bg-surface-card px-3 py-3 text-sm leading-6 text-heading transition placeholder:text-muted/65 hover:border-accent/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                    />
                    <button
                      type="button"
                      onClick={chooseGeneral}
                      className="mt-5 inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                    >
                      {tr('Ver qué recomendamos')}
                      <ArrowRight size={16} aria-hidden="true" />
                    </button>
                  </div>
                ) : (
                  <div className="mt-4">
                    <p className="text-sm leading-7 text-muted">{tr(serviceStepHelper[selectedSlug])}</p>
                    <div className="mt-4 space-y-2">
                      {visibleServices.map((option) => (
                        <ServiceRow key={`${option.slug}-${option.id}`} option={option} onClick={() => selectService(option)} />
                      ))}
                    </div>
                    {hiddenCount > 0 ? (
                      <button
                        type="button"
                        onClick={() => setShowAllServices(true)}
                        className="mt-3 text-sm font-semibold text-accent underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                      >
                        {tr('Ver más opciones')} (+{hiddenCount})
                      </button>
                    ) : null}
                    <button
                      type="button"
                      onClick={chooseGeneral}
                      className="mt-4 flex w-full items-center gap-3 rounded-md border border-dashed border-line bg-surface px-4 py-3 text-left text-sm text-muted transition hover:border-accent/45 hover:text-heading focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                    >
                      <MessageCircle size={17} className="shrink-0 text-accent" aria-hidden="true" />
                      {tr('No sé cuál es — prefiero que me orienten')}
                    </button>
                  </div>
                )}
              </div>
            ) : null}

            {step === 'result' ? (
              <div>
                <p className="eyebrow mb-3">{tr('Esto es lo que recomendamos')}</p>
                <div className="rounded-lg border border-line bg-surface p-5 md:p-6">
                  <div className="flex items-start justify-between gap-4">
                    <h2 ref={headingRef} tabIndex={-1} id={`${id}-title`} className="font-serif text-2xl font-semibold leading-tight text-heading outline-none">
                      {selectedOption.title}
                    </h2>
                    <CheckCircle2 className="mt-1 shrink-0 text-accent" size={24} aria-hidden="true" />
                  </div>
                  <p className="mt-4 text-sm leading-7 text-muted">{selectedOption.summary}</p>
                  <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div className="rounded-md border border-line bg-surface-card p-4">
                      <Clock className="mb-3 text-accent" size={18} aria-hidden="true" />
                      <p className="font-sans text-xs font-semibold uppercase text-heading">{tr('Tiempo estimado')}</p>
                      <p className="mt-2 text-sm leading-6 text-muted">{selectedOption.turnaround}</p>
                    </div>
                    <div className="rounded-md border border-line bg-surface-card p-4">
                      <FileText className="mb-3 text-accent" size={18} aria-hidden="true" />
                      <p className="font-sans text-xs font-semibold uppercase text-heading">{tr('Documentos base')}</p>
                      <p className="mt-2 text-sm leading-6 text-muted">{selectedOption.requirements}</p>
                    </div>
                  </div>
                  <p className="mt-4 border-l-2 border-accent bg-accent/10 px-4 py-3 font-serif text-base leading-7 text-heading/80">
                    {selectedOption.proTip}
                  </p>
                </div>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => setStep('timeline')}
                    className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  >
                    {tr('Sí, esto es — continuar')}
                    <ArrowRight size={16} aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={goBack}
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-line px-5 py-3 text-sm font-semibold text-heading transition hover:border-accent/50 hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  >
                    {tr('No era esto — ver otras opciones')}
                  </button>
                </div>
              </div>
            ) : null}

            {step === 'timeline' ? (
              <div>
                <p className="eyebrow mb-3">{tr('Paso 3')}</p>
                <h2 ref={headingRef} tabIndex={-1} id={`${id}-title`} className="text-2xl font-serif font-semibold leading-tight text-heading outline-none md:text-3xl">
                  {tr('¿Para cuándo lo necesitas?')}
                </h2>
                <div className="mt-5" role="group" aria-label={tr('Urgencia')}>
                  <div className="flex flex-wrap gap-2">
                    {timelineOptions.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        aria-pressed={form.timeline === option.value}
                        onClick={() => updateForm('timeline', option.value)}
                        title={tr(option.desc)}
                        className={`min-h-11 rounded-md border px-4 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                          form.timeline === option.value
                            ? 'border-accent bg-accent/10 text-heading'
                            : 'border-line text-muted hover:border-accent/45 hover:text-heading'
                        }`}
                      >
                        {tr(option.label)}
                      </button>
                    ))}
                  </div>
                </div>

                <h3 className="mt-7 font-sans text-sm font-semibold text-heading">{tr('¿Cómo prefieres que te contactemos?')}</h3>
                <div className="mt-3" role="group" aria-label={tr('Preferencia de contacto')}>
                  <div className="flex flex-wrap gap-2">
                    {contactOptions.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        aria-pressed={form.contactPreference === option.value}
                        onClick={() => updateForm('contactPreference', option.value)}
                        className={`min-h-11 rounded-md border px-4 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                          form.contactPreference === option.value
                            ? 'border-accent bg-accent/10 text-heading'
                            : 'border-line text-muted hover:border-accent/45 hover:text-heading'
                        }`}
                      >
                        {tr(option.label)}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setStep('contact')}
                  className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  {tr('Continuar')}
                  <ArrowRight size={16} aria-hidden="true" />
                </button>
              </div>
            ) : null}

            {step === 'contact' ? (
              <form noValidate onSubmit={handleSubmit}>
                <p className="eyebrow mb-3">{tr('Paso 4')}</p>
                <h2 ref={headingRef} tabIndex={-1} id={`${id}-title`} className="text-2xl font-serif font-semibold leading-tight text-heading outline-none md:text-3xl">
                  {tr('Último paso: ¿a quién contactamos?')}
                </h2>
                <p className="mt-3 text-sm leading-7 text-muted">
                  {tr('Solo usamos estos datos para responderte sobre tu caso. Sin spam.')}
                </p>

                <div className="mt-5 space-y-4">
                  <div>
                    <label htmlFor={`${id}-fullName`} className="font-sans text-sm font-semibold text-heading">
                      {tr('Nombre completo')}
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

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor={`${id}-phone`} className="font-sans text-sm font-semibold text-heading">
                        {tr('Teléfono móvil')}
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
                        placeholder="Ej. (212) 555-0100"
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
                        {tr('Email')}
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
                        placeholder="nombre@email.com"
                        className={inputClass(Boolean(errors.email))}
                      />
                      {errors.email ? (
                        <p id={`${id}-email-error`} className="mt-2 text-sm font-semibold text-red-600">
                          {errors.email}
                        </p>
                      ) : null}
                    </div>
                  </div>

                  <div>
                    <label htmlFor={`${id}-message`} className="font-sans text-sm font-semibold text-heading">
                      {tr('¿Algo que debamos saber? (opcional)')}
                    </label>
                    <textarea
                      id={`${id}-message`}
                      name="message"
                      rows={3}
                      value={form.message}
                      onChange={(event) => updateForm('message', event.target.value)}
                      placeholder={tr('Ej. tengo una carta, una renovación o una fecha límite…')}
                      className="mt-2 w-full resize-y rounded-md border border-line bg-surface-card px-3 py-3 text-sm leading-6 text-heading transition placeholder:text-muted/65 hover:border-accent/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                    />
                  </div>
                </div>

                <div className="mt-6 rounded-md border border-line bg-surface-2 p-4 text-sm">
                  <p className="font-sans text-xs font-semibold uppercase tracking-wide text-muted">{tr('Tu resumen')}</p>
                  <dl className="mt-3 space-y-2">
                    <SummaryRow label={tr('Servicio')} value={selectedOption.title} onEdit={() => setStep('situation')} tr={tr} />
                    <SummaryRow label={tr('Urgencia')} value={timelineLabel(form.timeline, tr)} onEdit={() => setStep('timeline')} tr={tr} />
                    <SummaryRow label={tr('Contacto')} value={contactLabel(form.contactPreference, tr)} onEdit={() => setStep('timeline')} tr={tr} />
                  </dl>
                </div>

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
                >
                  {status === 'submitting' ? (
                    <>
                      {tr('Enviando…')}
                      <Loader2 size={16} className="animate-spin" aria-hidden="true" />
                    </>
                  ) : (
                    <>
                      {tr('Enviar y recibir respuesta')}
                      <Send size={16} aria-hidden="true" />
                    </>
                  )}
                </button>

                <p className="mt-3 text-xs leading-5 text-muted">
                  {tr('Al enviar aceptas que te contactemos sobre tu consulta. No compartimos tus datos con terceros ni te suscribimos a nada.')}
                </p>
              </form>
            ) : null}

            {step === 'done' ? (
              <div role="status" aria-live="polite">
                {status === 'success' ? (
                  <>
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/15 text-accent">
                      <CheckCircle2 size={30} aria-hidden="true" />
                    </span>
                    <h2 ref={headingRef} tabIndex={-1} id={`${id}-title`} className="mt-5 font-serif text-2xl font-semibold leading-tight text-heading outline-none md:text-3xl">
                      {firstName ? `${tr('¡Listo')}, ${firstName}! ${tr('Recibimos tu caso.')}` : `${tr('¡Listo!')} ${tr('Recibimos tu caso.')}`}
                    </h2>
                    <p className="mt-3 text-sm leading-7 text-muted">
                      {tr('Te vamos a contactar por')} {contactLabel(submittedPayload?.contactPreference ?? 'whatsapp', tr)} {tr('para ayudarte con')}{' '}
                      “{submittedPayload?.serviceTitle}”. {tr('Solemos responder el mismo día hábil, en español.')}
                    </p>
                    <p className="mt-4 text-sm font-semibold text-heading">{tr('¿Prefieres adelantar? Estos son los siguientes pasos:')}</p>
                  </>
                ) : (
                  <>
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/15 text-accent">
                      <MessageCircle size={28} aria-hidden="true" />
                    </span>
                    <h2 ref={headingRef} tabIndex={-1} id={`${id}-title`} className="mt-5 font-serif text-2xl font-semibold leading-tight text-heading outline-none md:text-3xl">
                      {tr('Casi listo — terminemos por WhatsApp.')}
                    </h2>
                    <p className="mt-3 text-sm leading-7 text-muted">
                      {tr('Tu resumen está preparado. Para asegurarnos de no perder tu caso, toca el botón y nos llega al instante con todo el contexto.')}
                    </p>
                  </>
                )}

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={submittedPayload ? createWhatsappHref(createWhatsappMessage(submittedPayload, tr)) : directWhatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-[#25D366] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#20ba59] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366]"
                  >
                    {status === 'success' ? tr('Enviar resumen por WhatsApp') : tr('Continuar por WhatsApp')}
                    <MessageCircle size={16} aria-hidden="true" />
                  </a>
                  {status === 'success' ? (
                    <a
                      href={bookingHref}
                      className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-line px-5 py-3 text-sm font-semibold text-heading transition hover:border-accent/50 hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                    >
                      {tr('Agendar una llamada')}
                      <CalendarDays size={16} aria-hidden="true" />
                    </a>
                  ) : (
                    <a
                      href={officePhoneHref}
                      className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-line px-5 py-3 text-sm font-semibold text-heading transition hover:border-accent/50 hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                    >
                      {tr('Llamar')} {officePhoneDisplay}
                      <Phone size={16} aria-hidden="true" />
                    </a>
                  )}
                </div>
              </div>
            ) : null}
          </motion.div>
        </AnimatePresence>
      </div>

      {step !== 'done' ? (
        <div className="flex flex-col gap-2 border-t border-line bg-surface px-5 py-4 text-sm text-muted sm:flex-row sm:items-center sm:justify-between md:px-7">
          <span>{tr('¿Prefieres hablar directo?')}</span>
          <div className="flex flex-wrap gap-4">
            <a
              href={directWhatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-semibold text-heading transition hover:text-[#128C7E] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <MessageCircle size={16} aria-hidden="true" />
              WhatsApp
            </a>
            <a
              href={officePhoneHref}
              className="inline-flex items-center gap-1.5 font-semibold text-heading transition hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <Phone size={16} aria-hidden="true" />
              {officePhoneDisplay}
            </a>
          </div>
        </div>
      ) : null}
    </section>
  )
}

const stepTitle: Record<Step, string> = {
  situation: '¿Qué necesitas resolver?',
  service: 'Bien. ¿Cuál de estos se acerca más?',
  result: 'Esto es lo que recomendamos',
  timeline: '¿Para cuándo lo necesitas?',
  contact: 'Último paso: ¿a quién contactamos?',
  done: 'Diagnóstico completado',
}

function SituationButton({
  card,
  active,
  dashed = false,
  onClick,
  tr,
}: {
  card: SituationCard
  active: boolean
  dashed?: boolean
  onClick: () => void
  tr: (text: string) => string
}) {
  const Icon = card.icon
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`group flex h-full w-full items-start gap-3 rounded-md border p-4 text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
        active
          ? 'border-accent bg-accent/10'
          : `${dashed ? 'border-dashed bg-surface' : 'border-line bg-surface-card'} hover:border-accent/45 hover:bg-surface-2`
      }`}
    >
      <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-md ${active ? 'bg-primary text-white' : 'bg-accent/10 text-accent'}`}>
        <Icon size={19} aria-hidden="true" />
      </span>
      <span className="min-w-0">
        <span className="block font-sans text-sm font-semibold leading-snug text-heading">{tr(card.label)}</span>
        <span className="mt-1 block text-xs leading-5 text-muted">{tr(card.desc)}</span>
        <span className="mt-2 inline-block text-[11px] font-semibold uppercase tracking-wide text-accent/80">{tr(card.tag)}</span>
      </span>
    </button>
  )
}

function ServiceRow({ option, onClick }: { option: WizardServiceOption; onClick: () => void }) {
  const Icon = option.icon
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-3 rounded-md border border-line bg-surface-card p-3 text-left transition hover:border-accent/45 hover:bg-surface-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-accent/10 text-accent">
        <Icon size={17} aria-hidden="true" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-sans text-sm font-semibold leading-snug text-heading">{option.title}</span>
        <span className="mt-0.5 line-clamp-1 block text-xs leading-5 text-muted">{option.summary}</span>
      </span>
      <ArrowRight size={16} className="shrink-0 text-accent" aria-hidden="true" />
    </button>
  )
}

function SummaryRow({ label, value, onEdit, tr }: { label: string; value: string; onEdit: () => void; tr: (text: string) => string }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <dt className="shrink-0 text-muted">{label}</dt>
      <dd className="flex min-w-0 items-baseline gap-2 text-right">
        <span className="truncate font-semibold text-heading">{value}</span>
        <button
          type="button"
          onClick={onEdit}
          className="shrink-0 text-xs font-semibold text-accent underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          {tr('Editar')}
        </button>
      </dd>
    </div>
  )
}
