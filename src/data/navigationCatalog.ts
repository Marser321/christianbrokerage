import {
  Building2,
  CalendarDays,
  FileText,
  Globe,
  Home,
  Scale,
  Shield,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { ServiceItem, ServiceSlug } from './serviceCatalog'
import { serviceVerticals } from './serviceCatalog'

export type SiteNavLink = {
  key: string
  label: string
  to: string
  icon: LucideIcon
}

export type ServiceNavItem = {
  serviceId: string
  label: string
  to: string
  desc: string
  icon: LucideIcon
}

export type ServiceNavGroup = {
  label: string
  description: string
  items: ServiceNavItem[]
}

export type AreaNavGroup = {
  key: ServiceSlug
  label: string
  to: string
  icon: LucideIcon
  eyebrow: string
  description: string
  groups: ServiceNavGroup[]
}

export const simpleNavLinks: SiteNavLink[] = [
  { key: 'inicio', label: 'Inicio', to: '/#hero', icon: Home },
  { key: 'nosotros', label: 'Nosotros', to: '/#nosotros', icon: Building2 },
]

export const mobileUtilityLinks: SiteNavLink[] = [
  ...simpleNavLinks,
  { key: 'contacto', label: 'Contacto', to: '/#contacto', icon: CalendarDays },
]

export function serviceHref(slug: ServiceSlug, serviceId: string) {
  return `/${slug}?servicio=${serviceId}`
}

export function diagnosticoHref(slug?: ServiceSlug, serviceId?: string) {
  const params = new URLSearchParams()
  if (slug) params.set('area', slug)
  if (serviceId) params.set('servicio', serviceId)
  const query = params.toString()
  return query ? `/diagnostico?${query}` : '/diagnostico'
}

function serviceById(slug: ServiceSlug, serviceId: string): ServiceItem {
  const service = serviceVerticals[slug].services.find((item) => item.id === serviceId)
  if (!service) throw new Error(`Servicio no encontrado: ${slug}/${serviceId}`)
  return service
}

function item(slug: ServiceSlug, serviceId: string): ServiceNavItem {
  const service = serviceById(slug, serviceId)
  return {
    serviceId,
    label: service.title,
    to: serviceHref(slug, serviceId),
    desc: service.turnaround,
    icon: service.icon,
  }
}

export const areaNavGroups: AreaNavGroup[] = [
  {
    key: 'seguros',
    label: 'Seguros',
    to: '/seguros',
    icon: Shield,
    eyebrow: serviceVerticals.seguros.eyebrow,
    description: 'Coberturas personales, comerciales y servicios vinculados a protección.',
    groups: [
      {
        label: 'Vehículos',
        description: 'Auto personal, taxi y operación TLC.',
        items: [item('seguros', 'auto-personal'), item('seguros', 'tlc')],
      },
      {
        label: 'Negocio y propiedad',
        description: 'Pólizas para operar, cerrar o proteger activos.',
        items: [item('seguros', 'negocio'), item('seguros', 'casa')],
      },
      {
        label: 'Familia y protección',
        description: 'Vida, identidad y seguridad cotidiana.',
        items: [item('seguros', 'salud-vida'), item('seguros', 'identidad'), item('seguros', 'alarmas')],
      },
    ],
  },
  {
    key: 'taxes',
    label: 'Taxes',
    to: '/taxes',
    icon: Scale,
    eyebrow: serviceVerticals.taxes.eyebrow,
    description: 'Declaraciones, ITIN, empresas y representación tributaria.',
    groups: [
      {
        label: 'Declaraciones',
        description: 'Preparación personal y revisión del ciclo fiscal.',
        items: [item('taxes', 'taxes-personales')],
      },
      {
        label: 'Negocio',
        description: 'Registros y declaraciones comerciales.',
        items: [item('taxes', 'taxes-comerciales')],
      },
      {
        label: 'Internacional',
        description: 'Impuestos internacionales para individuos y corporaciones.',
        items: [item('taxes', 'impuestos-internacionales')],
      },
      {
        label: 'IRS e identidad fiscal',
        description: 'ITIN, cartas, auditorías y deudas tributarias.',
        items: [item('taxes', 'itin'), item('taxes', 'auditorias')],
      },
      {
        label: 'Planificación',
        description: 'Retiro, anualidades y ahorro educativo.',
        items: [item('taxes', 'retiro'), item('taxes', 'universidad')],
      },
    ],
  },
  {
    key: 'inmigracion',
    label: 'Inmigración',
    to: '/inmigracion',
    icon: Globe,
    eyebrow: serviceVerticals.inmigracion.eyebrow,
    description: 'Soporte documental, traducciones y trámites administrativos.',
    groups: [
      {
        label: 'Familia y estatus',
        description: 'Peticiones familiares, permiso de trabajo y ajuste.',
        items: [item('inmigracion', 'i130'), item('inmigracion', 'ajuste-estatus')],
      },
      {
        label: 'Ciudadanía',
        description: 'Naturalización (N-400) y Certificado de Ciudadanía (N-600).',
        items: [item('inmigracion', 'n400')],
      },
      {
        label: 'Consular',
        description: 'Citas, formularios y paquetes para consulado.',
        items: [item('inmigracion', 'consular')],
      },
    ],
  },
  {
    key: 'otros',
    label: 'Otros Servicios',
    to: '/otros',
    icon: FileText,
    eyebrow: serviceVerticals.otros.eyebrow,
    description: 'Notaría, divorcios, traducciones y formación de compañías.',
    groups: [
      {
        label: 'Documentos y notaría',
        description: 'Traducciones certificadas y notarización.',
        items: [item('otros', 'traducciones')],
      },
      {
        label: 'Legal y familia',
        description: 'Asistencia documental en divorcios.',
        items: [item('otros', 'divorcios')],
      },
      {
        label: 'Negocio',
        description: 'Formación de compañías.',
        items: [item('otros', 'empresas')],
      },
    ],
  },
]

export const footerServiceLinks = [
  ...areaNavGroups.map((area) => ({ label: area.label, href: area.to })),
  { label: 'Traducciones y notaría', href: serviceHref('otros', 'traducciones') },
]

export const footerCompanyLinks = [
  { label: 'Nosotros', href: '/#nosotros' },
  { label: 'Proceso', href: '/#valores' },
  { label: 'Contacto', href: '/#contacto' },
]

export const homeServicePreviewCount = 4
