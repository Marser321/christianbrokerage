// Registro de imágenes (public/images/**), generadas con scripts/optimize-images.mjs
// según el manifiesto. Cada slot tiene versión editorial (base) y fotográfica (-foto).
// Densidad "minimal" → editorial · "rich"/"combo" → fotográfica (personas al frente).
// En "combo" el set editorial reaparece como acentos puntuales (ver verticalImage,
// drawer y Home), pero las superficies "de personas" usan la foto igual que en "rich".
import type { Density } from '../context/VariantContext'

const BASE = '/images'
// Superficies de personas: foto en rich y combo, editorial solo en minimal.
const sfx = (d: Density) => (d === 'minimal' ? '' : '-foto')

// service.id (serviceCatalog) → slug del manifiesto (carpeta services/).
export const serviceImageKey: Record<string, string> = {
  'auto-personal': 'seg-auto',
  tlc: 'seg-tlc',
  negocio: 'seg-negocio',
  casa: 'seg-casa',
  'salud-vida': 'seg-salud',
  hipotecas: 'seg-hipoteca',
  identidad: 'seg-identidad',
  alarmas: 'seg-alarma',
  'taxes-personales': 'tax-personal',
  'taxes-comerciales': 'tax-comercial',
  empresas: 'tax-empresas',
  itin: 'tax-itin',
  auditorias: 'tax-auditoria',
  retiro: 'tax-retiro',
  universidad: 'tax-529',
  i130: 'inm-i130',
  'ajuste-estatus': 'inm-ajuste',
  n400: 'inm-n400',
  traducciones: 'inm-trad',
  consular: 'inm-consular',
}

/** Imagen de un servicio (banner de card / cabecera de drawer) por su id. */
export const serviceImage = (serviceId: string, density: Density): string =>
  `${BASE}/services/${serviceImageKey[serviceId] ?? 'seg-auto'}${sfx(density)}.webp`

/** Still-life / foto vertical por vertical (acento del panel editorial).
 *  En "combo" se muestra a propósito el still-life editorial (objetos) para que la
 *  página combine personas (banners) + objetos (panel); la foto solo en "completo". */
export const verticalImage = (slug: string, density: Density): string =>
  `${BASE}/verticals/${slug}${density === 'rich' ? '-foto' : ''}.webp`

/** Banner/fondo de las 3 tarjetas principales del Home. */
export const mainCardImage = (slug: string, density: Density): string =>
  `${BASE}/cards/main-${slug}${sfx(density)}.webp`

/** Fondo del drawer por vertical (banda superior). */
export const drawerImage = (slug: string, density: Density): string =>
  `${BASE}/drawer/drawer-${slug}${sfx(density)}.webp`

/** Fondo del mega-menú por grupo (neutral | seguros | taxes | inmigracion). */
export const menuImage = (group: string, density: Density): string =>
  `${BASE}/menu/menu-${group}${sfx(density)}.webp`

/** Grupo de navegación (Navbar) → slug de menú del manifiesto. */
export const menuGroupKey: Record<string, string> = {
  inicio: 'neutral',
  seguros: 'seguros',
  taxes: 'taxes',
  inmigracion: 'inmigracion',
  nosotros: 'neutral',
}

// ===== Encuadre de banners (object-position) =====
// El recorte que cortaba cabezas era sobre todo VERTICAL: las fotos llevan a la
// persona abajo-derecha con el rostro en la zona media-alta, así que el ancla por
// defecto sube el punto de recorte. Editorial (still-life) deja el tercio superior
// vacío, por eso baja. El eje horizontal queda a la derecha (texto/scrim a la izq.).
const FRAME_DEFAULT_FOTO = 'object-[right_30%]'
const FRAME_DEFAULT_EDITORIAL = 'object-[right_65%]'

/** Overrides por servicio para los outliers (cabezas más altas/bajas), afinados por captura. */
export const serviceFraming: Record<string, { foto?: string; editorial?: string }> = {
  // p.ej. 'auto-personal': { foto: 'object-[right_22%]' },
}

/** Clase de object-position para el banner de un servicio según la densidad activa. */
export const framePos = (serviceId: string, density: Density): string => {
  const isFoto = density !== 'minimal'
  const override = serviceFraming[serviceId]
  if (isFoto) return override?.foto ?? FRAME_DEFAULT_FOTO
  return override?.editorial ?? FRAME_DEFAULT_EDITORIAL
}
