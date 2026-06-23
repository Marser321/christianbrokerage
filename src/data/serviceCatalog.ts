import type { LucideIcon } from 'lucide-react'
import {
  Award,
  Bell,
  Briefcase,
  Car,
  FileSpreadsheet,
  FileText,
  Globe,
  GraduationCap,
  Heart,
  HeartHandshake,
  Home,
  Landmark,
  PiggyBank,
  Scale,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Users,
} from 'lucide-react'
import damarisCoralDesk from '../assets/images/real/damaris-coral-desk.jpg'
import damarisGrayBook from '../assets/images/real/damaris-gray-book.jpg'
import damarisWhiteBook from '../assets/images/real/damaris-white-book.jpg'

export type ServiceSlug = 'seguros' | 'taxes' | 'inmigracion' | 'otros'

export type ServiceFaq = {
  q: string
  a: string
}

export type ServiceItem = {
  id: string
  icon: LucideIcon
  title: string
  summary: string
  features: string[]
  turnaround: string
  requirements: string
  proTip: string
  premiumInclusions: string[]
  glossaryDefinition: string
  whoNeedsIt: string[]
  howItWorks: string[]
  commonMistakes: string[]
  faqs: ServiceFaq[]
}

export type TrustPoint = {
  icon: LucideIcon
  title: string
  desc: string
}

export type EditorialPanel = {
  eyebrow: string
  title: string
  body: string
  bullets: string[]
  disclaimer?: string
}

export type ServiceVertical = {
  slug: ServiceSlug
  eyebrow: string
  title: string
  highlight: string
  intro: string
  ctaPrimary: string
  ctaSecondary: string
  whatsappLabel: string
  whatsappPrompt: string
  calendarEnv: string
  calendarUrl: string
  bookingAnchor: string
  bookingTitle: string
  bookingCopy: string
  visual: {
    src: string
    alt: string
    caption: string
  }
  trust: TrustPoint[]
  editorialPanel: EditorialPanel
  services: ServiceItem[]
}

export const officePhoneDisplay = '(212) 923-2610'
export const officePhoneHref = 'tel:+12129232610'
export const whatsappBase = 'https://wa.me/12129232610'

// Calendarios públicos de GoHighLevel. Se usan como valor por defecto cuando no
// hay variable de entorno; el env (VITE_GHL_CALENDAR_*) sigue teniendo prioridad.
export const HOME_CALENDAR_URL = 'https://app.christianbrokerageusa.com/widget/booking/8eNNrLbmwjcNO21JQOJB'
export const SERVICE_CALENDAR_URL =
  'https://app.christianbrokerageusa.com/widget/bookings/kenia-ocumares-personal-calendar-1pi_8qxbs'

export function createWhatsappHref(message: string) {
  return `${whatsappBase}?text=${encodeURIComponent(message)}`
}

const insuranceServices: ServiceItem[] = [
  {
    id: 'auto-personal',
    icon: Car,
    title: 'Seguro de Auto Personal',
    summary: 'Cotizamos cobertura para conductores y familias con opciones de responsabilidad civil, collision, comprehensive y asistencia en carretera.',
    features: ['Licencias de EE.UU. o internacionales', 'Planes de pago flexibles', 'Revisión de tarifa en renovaciones'],
    turnaround: 'Mismo día',
    requirements: 'Licencia, registro o título del vehículo, dirección y póliza anterior si existe.',
    proTip: 'No elijas solo el mínimo estatal. Un límite bajo puede dejar tu patrimonio expuesto si ocurre un accidente serio.',
    premiumInclusions: ['Comparación entre aseguradoras activas', 'Tarjetas de seguro digitales', 'Acompañamiento en cambios de vehículo o conductores'],
    glossaryDefinition: 'Protección financiera para daños, responsabilidad civil y pérdidas relacionadas con el uso de un vehículo personal.',
    whoNeedsIt: ['Propietarios de autos particulares', 'Familias con más de un conductor', 'Conductores nuevos en Nueva York'],
    howItWorks: ['Revisamos licencia, vehículo e historial.', 'Comparamos opciones de cobertura y deducible.', 'Emitimos la póliza y tarjetas de seguro.', 'Damos seguimiento en renovación o reclamos.'],
    commonMistakes: ['No declarar a todos los conductores del hogar.', 'Comprar por precio sin revisar deducibles y exclusiones.'],
    faqs: [
      { q: '¿Puedo cotizar con licencia internacional?', a: 'Sí. Revisamos aseguradoras que aceptan distintos perfiles de licencia y documentación.' },
      { q: '¿Qué diferencia hay entre collision y comprehensive?', a: 'Collision cubre choques; comprehensive cubre eventos como robo, vandalismo, ramas, granizo o daños no causados por una colisión.' },
    ],
  },
  {
    id: 'tlc',
    icon: ShieldCheck,
    title: 'Seguro de Taxi, TLC y Black Car',
    summary: 'Soporte para conductores, bases y vehículos comerciales regulados por la TLC en Nueva York, incluyendo servicio black car y for-hire.',
    features: ['Certificados FH-1', 'Especialidad en NY TLC y black car', 'Soporte para renovaciones'],
    turnaround: 'Mismo día según elegibilidad',
    requirements: 'Licencia TLC, información de base, registro del vehículo e historial de manejo.',
    proTip: 'Evita lapsos de cobertura. Un solo día sin póliza activa puede generar multas y suspensión operativa.',
    premiumInclusions: ['Carga de certificados cuando aplica', 'Revisión de vencimientos', 'Orientación bilingüe para cambios de base o vehículo'],
    glossaryDefinition: 'Seguro comercial requerido para vehículos que transportan pasajeros a cambio de una tarifa dentro de la jurisdicción TLC, incluido el servicio black car.',
    whoNeedsIt: ['Conductores de plataformas en NY', 'Propietarios de vehículos TLC y black car', 'Pequeñas flotas de transporte'],
    howItWorks: ['Validamos datos TLC y vehículo.', 'Cotizamos pólizas comerciales elegibles.', 'Emitimos documentos y certificados.', 'Recordamos renovaciones críticas.'],
    commonMistakes: ['Esperar al último día para renovar.', 'Operar con conductores no declarados correctamente.'],
    faqs: [
      { q: '¿Cuánto tarda el certificado?', a: 'Cuando la póliza está emitida y pagada, el certificado se procesa de forma prioritaria.' },
      { q: '¿Puedo pagar mensual?', a: 'En muchos casos sí. Depende de la aseguradora, historial y estructura de la póliza.' },
    ],
  },
  {
    id: 'negocio',
    icon: Briefcase,
    title: 'Seguro de Negocio y General Liability',
    summary: 'Coberturas para contratistas, tiendas, restaurantes, oficinas y negocios que necesitan certificados de seguro confiables.',
    features: ['COI para contratos', 'Responsabilidad civil general', 'Opciones para BOP y Workers Comp'],
    turnaround: '24 a 48 horas',
    requirements: 'Nombre legal, EIN, actividad, ingresos estimados, nómina y requisitos del contrato si aplica.',
    proTip: 'Si tu cliente pide Additional Insured, envía el contrato antes de cotizar para evitar correcciones de último minuto.',
    premiumInclusions: ['Emisión de certificados', 'Revisión de cláusulas frecuentes', 'Preparación para auditorías de nómina'],
    glossaryDefinition: 'Cobertura que protege al negocio frente a reclamaciones por lesiones, daños a propiedad ajena y ciertos gastos de defensa.',
    whoNeedsIt: ['Contratistas y subcontratistas', 'Comercios con atención al público', 'Negocios que presentan certificados a clientes'],
    howItWorks: ['Analizamos actividad y exposición.', 'Diseñamos límites y endosos.', 'Emitimos póliza y certificados.', 'Acompañamos renovaciones y auditorías.'],
    commonMistakes: ['Declarar una actividad distinta a la real.', 'No revisar requisitos del contrato antes de aceptar un trabajo.'],
    faqs: [
      { q: '¿Qué es un COI?', a: 'Es el certificado que demuestra tu cobertura ante clientes, landlords o contratistas principales.' },
      { q: '¿Workers Comp es lo mismo?', a: 'No. Workers Comp cubre empleados; General Liability cubre reclamaciones de terceros.' },
    ],
  },
  {
    id: 'casa',
    icon: Home,
    title: 'Casa, Apartamento y Propiedad',
    summary: 'Protección para propietarios, inquilinos y condominios con revisión de estructura, pertenencias y responsabilidad civil.',
    features: ['Homeowners, renters y condo', 'Evidencia de seguro para banco o landlord', 'Descuentos por paquetes'],
    turnaround: 'Mismo día',
    requirements: 'Dirección, datos del inmueble, ocupación, valor de pertenencias y datos del banco si aplica.',
    proTip: 'El valor de reconstrucción no siempre coincide con el precio de mercado. Esa diferencia importa al momento del reclamo.',
    premiumInclusions: ['Revisión de deducibles', 'Coberturas para pertenencias', 'Cartas para banco o landlord'],
    glossaryDefinition: 'Póliza que protege vivienda, pertenencias personales y responsabilidad civil según el tipo de ocupación.',
    whoNeedsIt: ['Propietarios de vivienda', 'Inquilinos que quieren proteger pertenencias', 'Dueños de multifamily o condo'],
    howItWorks: ['Levantamos datos de la propiedad.', 'Calculamos límites recomendados.', 'Comparamos paquetes con auto u otras pólizas.', 'Emitimos evidencia para banco o arrendador.'],
    commonMistakes: ['No asegurar bienes personales de valor.', 'Asumir que inundación siempre está incluida.'],
    faqs: [
      { q: '¿Renter’s insurance vale la pena?', a: 'Sí. Suele ser accesible y protege pertenencias y responsabilidad personal.' },
      { q: '¿El banco requiere seguro?', a: 'Si tienes un préstamo sobre la propiedad, el banco normalmente exige cobertura activa.' },
    ],
  },
  {
    id: 'salud-vida',
    icon: Heart,
    title: 'Vida y Gastos Finales',
    summary: 'Protección de vida y coberturas de gastos finales con enfoque familiar, explicadas con claridad antes de firmar.',
    features: ['Vida a término o permanente', 'Cobertura de gastos finales', 'Opciones sin exámenes invasivos'],
    turnaround: 'Consulta de 30 minutos',
    requirements: 'Identificación, edad, beneficiarios deseados, miembros del hogar y necesidades de cobertura.',
    proTip: 'Define beneficiarios y monto de cobertura pensando en deudas, gastos finales e ingresos que tu familia necesitaría reemplazar.',
    premiumInclusions: ['Comparación por presupuesto familiar', 'Explicación clara de beneficios y exclusiones', 'Acompañamiento en la solicitud'],
    glossaryDefinition: 'Soluciones de seguro de vida y de gastos finales para proteger económicamente a la familia y cubrir los costos finales.',
    whoNeedsIt: ['Padres con dependientes', 'Personas con deudas o ingresos que proteger', 'Adultos que desean planificar gastos finales'],
    howItWorks: ['Identificamos necesidad y presupuesto.', 'Revisamos elegibilidad y opciones.', 'Completamos solicitud.', 'Damos seguimiento a aprobación y documentos.'],
    commonMistakes: ['Subestimar el monto de cobertura necesario.', 'Comprar una póliza sin entender exclusiones.'],
    faqs: [
      { q: '¿Qué diferencia hay entre vida a término y permanente?', a: 'La vida a término cubre un periodo definido; la permanente dura toda la vida y puede acumular valor. Revisamos cuál conviene a tu caso.' },
      { q: '¿Hay planes de gastos finales para mayores?', a: 'Sí, existen opciones simplificadas según edad y salud.' },
    ],
  },
  {
    id: 'identidad',
    icon: Shield,
    title: 'Protección de Identidad',
    summary: 'Monitoreo y respuestas ante robo de identidad, alertas crediticias y documentación sensible.',
    features: ['Monitoreo de señales de riesgo', 'Guía de pasos correctivos', 'Protección familiar'],
    turnaround: 'Activación según plan',
    requirements: 'Datos de identidad, correo de contacto y perfil de protección deseado.',
    proTip: 'Una alerta temprana puede evitar meses de trámites con bancos, crédito y agencias.',
    premiumInclusions: ['Orientación en reportes', 'Revisión de cuentas comprometidas', 'Educación preventiva'],
    glossaryDefinition: 'Servicio orientado a detectar uso indebido de datos personales y guiar acciones de mitigación.',
    whoNeedsIt: ['Familias con documentos sensibles', 'Personas que recibieron cartas de data breach', 'Negocios que manejan información de clientes'],
    howItWorks: ['Identificamos riesgos.', 'Activamos monitoreo o medidas preventivas.', 'Guiamos reportes si hay incidente.', 'Revisamos siguientes pasos.'],
    commonMistakes: ['Ignorar avisos de filtración.', 'Compartir documentos por canales inseguros.'],
    faqs: [
      { q: '¿Esto reemplaza mi banco?', a: 'No. Complementa tus medidas bancarias y de crédito.' },
      { q: '¿También sirve para familias?', a: 'Sí. Puede cubrir varios miembros según el plan.' },
    ],
  },
  {
    id: 'alarmas',
    icon: Bell,
    title: 'Alarmas y Seguridad',
    summary: 'Orientación para sistemas de alarma y seguridad que pueden apoyar la protección de casas, apartamentos y negocios.',
    features: ['Opciones para casa, apartamento o negocio', 'Integración con descuentos', 'Instalación coordinada'],
    turnaround: 'Según disponibilidad',
    requirements: 'Dirección, tipo de propiedad, puntos de acceso y prioridad de monitoreo.',
    proTip: 'Algunas aseguradoras reconocen descuentos por alarmas certificadas; conviene guardar evidencia de instalación.',
    premiumInclusions: ['Recomendación según riesgo', 'Documentación para aseguradora', 'Coordinación con proveedores'],
    glossaryDefinition: 'Sistemas de prevención, detección y monitoreo para proteger propiedades y reducir riesgo operativo.',
    whoNeedsIt: ['Propietarios de vivienda', 'Comercios con inventario', 'Landlords o multifamilies'],
    howItWorks: ['Revisamos puntos vulnerables.', 'Sugerimos tipo de sistema.', 'Coordinamos proveedor.', 'Documentamos instalación para pólizas.'],
    commonMistakes: ['Comprar equipo sin monitoreo adecuado.', 'No informar a la aseguradora sobre el sistema instalado.'],
    faqs: [
      { q: '¿Puede bajar mi prima?', a: 'En algunas pólizas sí, depende de aseguradora y certificación.' },
      { q: '¿Es solo para casas?', a: 'No. También aplica a oficinas, tiendas y propiedades comerciales.' },
    ],
  },
]

const taxServices: ServiceItem[] = [
  {
    id: 'taxes-personales',
    icon: FileSpreadsheet,
    title: 'Declaración Personal',
    summary: 'Preparación federal y estatal para W-2, 1099, dependientes, créditos y escenarios multiestatales.',
    features: ['E-file seguro', 'Créditos familiares y educativos', 'Depósito directo'],
    turnaround: '24 a 48 horas',
    requirements: 'W-2/1099, IDs, SSN o ITIN, dependientes, cuenta bancaria y declaraciones anteriores si aplica.',
    proTip: 'Trae formularios 1098-T y gastos elegibles si hay estudios; pueden cambiar el resultado de tu reembolso.',
    premiumInclusions: ['Revisión de créditos aplicables', 'Archivo digital protegido', 'Explicación clara antes de enviar'],
    glossaryDefinition: 'Declaración anual de ingresos ante IRS y estado para calcular impuestos, créditos y reembolsos.',
    whoNeedsIt: ['Empleados W-2', 'Contratistas 1099', 'Familias con dependientes'],
    howItWorks: ['Recibimos documentos.', 'Revisamos ingresos y créditos.', 'Preparamos federal y estatal.', 'Enviamos por e-file con autorización.'],
    commonMistakes: ['Omitir ingresos 1099 pequeños.', 'Reclamar dependientes sin cumplir reglas del IRS.'],
    faqs: [
      { q: '¿Cuánto tarda el reembolso?', a: 'El IRS suele procesar e-file con depósito directo más rápido, aunque los tiempos varían por caso.' },
      { q: '¿Pueden declarar años anteriores?', a: 'Sí, revisamos documentos y años pendientes.' },
    ],
  },
  {
    id: 'taxes-comerciales',
    icon: Landmark,
    title: 'Taxes Comerciales',
    summary: 'Preparación para LLC, corporaciones, 1099, balances, gastos deducibles y planificación del ciclo fiscal.',
    features: ['1120, 1120-S y 1065', 'Estimados trimestrales', 'Revisión de bookkeeping'],
    turnaround: '3 a 5 días hábiles',
    requirements: 'EIN, registros de ingresos/gastos, estados bancarios, nómina y declaración previa.',
    proTip: 'La separación entre cuentas personales y comerciales es una defensa básica para tu negocio.',
    premiumInclusions: ['Conciliación de cierre', 'Plan fiscal anual', 'Soporte ante cartas relacionadas'],
    glossaryDefinition: 'Declaración fiscal de entidades comerciales para reportar ingresos, deducciones, pérdidas y obligaciones.',
    whoNeedsIt: ['Dueños de LLC o corporación', 'Contratistas con gastos de negocio', 'Empresas con empleados'],
    howItWorks: ['Organizamos registros.', 'Clasificamos deducciones.', 'Preparamos formularios.', 'Planificamos pagos del siguiente ciclo.'],
    commonMistakes: ['Mezclar gastos personales y comerciales.', 'Presentar tarde la declaración de S-Corp o partnership.'],
    faqs: [
      { q: '¿Necesito bookkeeping mensual?', a: 'Para negocios activos, sí ayuda a reducir estrés y errores al cierre.' },
      { q: '¿Qué pasa si mi negocio tuvo pérdidas?', a: 'Se reportan correctamente y se revisa su impacto fiscal.' },
    ],
  },
  {
    id: 'itin',
    icon: Award,
    title: 'ITIN y Acceptance Agent',
    summary: 'Tramitación o renovación de ITIN con revisión documental y preparación del paquete W-7 junto a la declaración.',
    features: ['CAA autorizado', 'Certificación en oficina', 'Sin enviar pasaporte cuando aplica'],
    turnaround: 'Envío en 24 horas tras firma',
    requirements: 'Pasaporte vigente o documentos aceptables, declaración de taxes y datos personales.',
    proTip: 'Un Acceptance Agent puede certificar documentos elegibles para que no tengas que enviar tu pasaporte original al IRS.',
    premiumInclusions: ['Preparación W-7', 'Certificación documental', 'Seguimiento de tiempos del IRS'],
    glossaryDefinition: 'Número de identificación tributaria para personas que necesitan declarar taxes y no califican para Seguro Social.',
    whoNeedsIt: ['Personas sin SSN que declaran taxes', 'Cónyuges o dependientes elegibles', 'Contribuyentes que renuevan ITIN vencido'],
    howItWorks: ['Revisamos identidad.', 'Preparamos W-7 y declaración.', 'Certificamos documentos elegibles.', 'Enviamos paquete al IRS.'],
    commonMistakes: ['Enviar pasaporte original sin necesidad.', 'Solicitar ITIN sin declaración cuando el caso no tiene excepción válida.'],
    faqs: [
      { q: '¿Retienen mi pasaporte?', a: 'Cuando aplica la certificación CAA, revisamos el documento en oficina y el cliente lo conserva.' },
      { q: '¿Cuánto tarda el IRS?', a: 'El procesamiento puede tomar varias semanas, especialmente en temporada alta.' },
    ],
  },
  {
    id: 'auditorias',
    icon: Scale,
    title: 'Cartas, Auditorías y Deudas IRS',
    summary: 'Representación y respuesta ante avisos, auditorías, balances pendientes, planes de pago y alivios disponibles.',
    features: ['Enrolled Agents', 'Form 2848', 'Planes de pago'],
    turnaround: 'Respuesta inicial en 24 a 48 horas',
    requirements: 'Carta IRS o estatal, declaraciones previas, identificaciones y soportes del año cuestionado.',
    proTip: 'Nunca ignores una carta. Muchas tienen plazos de 30 o 90 días para responder antes de escalar.',
    premiumInclusions: ['Lectura técnica del aviso', 'Comunicación con agencias', 'Estrategia de resolución'],
    glossaryDefinition: 'Servicio de representación tributaria para resolver disputas, avisos, auditorías y deudas ante autoridades fiscales.',
    whoNeedsIt: ['Personas con cartas CP o LT', 'Negocios con balances pendientes', 'Contribuyentes bajo auditoría'],
    howItWorks: ['Leemos el aviso.', 'Solicitamos autorización si aplica.', 'Reunimos evidencia.', 'Respondemos o negociamos la solución.'],
    commonMistakes: ['Responder sin entender el código del aviso.', 'No guardar recibos o pruebas del año auditado.'],
    faqs: [
      { q: '¿Qué es un Enrolled Agent?', a: 'Un profesional autorizado a nivel federal para representar contribuyentes ante el IRS.' },
      { q: '¿Pueden negociar pagos?', a: 'Sí, revisamos elegibilidad para planes, alivios y otras alternativas.' },
    ],
  },
  {
    id: 'retiro',
    icon: PiggyBank,
    title: 'Retiro y Anualidades',
    summary: 'Orientación sobre estrategias de retiro, IRA, rollover y anualidades con lectura fiscal responsable.',
    features: ['IRA tradicional o Roth', 'Rollover 401(k)', 'Ingreso futuro planificado'],
    turnaround: 'Consulta de 45 minutos',
    requirements: 'Edad, ingresos, cuentas existentes, objetivos y horizonte de retiro.',
    proTip: 'La diferencia entre Roth y tradicional no es solo fiscal hoy; también afecta tus retiros futuros.',
    premiumInclusions: ['Mapa de opciones', 'Revisión de impacto fiscal', 'Seguimiento de contribuciones'],
    glossaryDefinition: 'Herramientas de ahorro e ingreso futuro con reglas fiscales específicas.',
    whoNeedsIt: ['Trabajadores independientes', 'Personas con 401(k) anterior', 'Familias que planifican jubilación'],
    howItWorks: ['Analizamos perfil.', 'Comparamos opciones.', 'Preparamos documentos.', 'Revisamos aportes y próximos pasos.'],
    commonMistakes: ['Retirar fondos temprano sin medir penalidades.', 'Dejar cuentas antiguas sin monitoreo.'],
    faqs: [
      { q: '¿Esto es preparación de taxes?', a: 'No solamente. Integra lectura fiscal y planificación financiera básica.' },
      { q: '¿Puedo transferir una 401(k)?', a: 'Sí, revisamos si un rollover es conveniente.' },
    ],
  },
  {
    id: 'universidad',
    icon: GraduationCap,
    title: 'Ahorro Universitario',
    summary: 'Planificación de ahorro educativo, planes 529 y documentación para familias que preparan estudios futuros.',
    features: ['Planes 529', 'Metas por beneficiario', 'Lectura de beneficios fiscales'],
    turnaround: 'Diseño en 48 horas',
    requirements: 'Datos del beneficiario, meta de ahorro, plazo y presupuesto familiar.',
    proTip: 'Un plan 529 puede ofrecer ventajas fiscales si se usa para gastos educativos calificados.',
    premiumInclusions: ['Diseño de meta', 'Explicación de reglas de uso', 'Revisión anual de aportes'],
    glossaryDefinition: 'Estrategias de ahorro destinadas a cubrir gastos educativos calificados.',
    whoNeedsIt: ['Padres y abuelos', 'Familias con hijos en edad escolar', 'Personas que desean planificar estudios'],
    howItWorks: ['Definimos meta educativa.', 'Revisamos opciones.', 'Preparamos apertura.', 'Programamos aportes y revisiones.'],
    commonMistakes: ['Usar fondos para gastos no calificados.', 'Empezar demasiado tarde sin meta clara.'],
    faqs: [
      { q: '¿Solo sirve para universidad?', a: 'Puede cubrir distintos gastos educativos calificados según reglas del plan.' },
      { q: '¿Hay beneficio estatal?', a: 'Depende del estado y del plan elegido; lo revisamos contigo.' },
    ],
  },
]

const immigrationServices: ServiceItem[] = [
  {
    id: 'i130',
    icon: HeartHandshake,
    title: 'Peticiones Familiares I-130',
    summary: 'Preparación ordenada de formularios, evidencias de relación y traducciones para procesos familiares.',
    features: ['Pruebas de relación', 'Traducciones certificadas', 'Seguimiento documental'],
    turnaround: '5 a 7 días hábiles',
    requirements: 'Actas, IDs, prueba de estatus, evidencia de relación y documentos traducidos cuando aplique.',
    proTip: 'La calidad del paquete importa: evidencias claras, traducciones completas e índice reducen fricción.',
    premiumInclusions: ['Checklist por caso', 'Organización de evidencias', 'Copias digitales del expediente'],
    glossaryDefinition: 'Petición usada para demostrar una relación familiar calificada ante USCIS.',
    whoNeedsIt: ['Ciudadanos que piden familiares inmediatos', 'Residentes que piden cónyuge o hijos', 'Familias con documentos extranjeros'],
    howItWorks: ['Revisamos elegibilidad documental.', 'Ordenamos pruebas civiles y relación.', 'Preparamos formularios.', 'Armamos paquete para presentación.'],
    commonMistakes: ['Enviar actas sin traducción certificada.', 'Presentar poca evidencia en casos matrimoniales.'],
    faqs: [
      { q: '¿Ustedes son abogados?', a: 'No somos bufete. Brindamos asistencia administrativa y documental; los asuntos legales se derivan a abogado cuando corresponde.' },
      { q: '¿Pueden traducir mis actas?', a: 'Sí, ofrecemos traducciones certificadas para documentos elegibles.' },
    ],
  },
  {
    id: 'ajuste-estatus',
    icon: ShieldCheck,
    title: 'Permiso de Trabajo y Ajuste',
    summary: 'Soporte administrativo para I-765, I-485 y paquetes de ajuste con revisión de documentos y formularios.',
    features: ['Permiso de trabajo', 'Paquete I-485', 'Respuesta documental ante RFE'],
    turnaround: '7 días hábiles',
    requirements: 'Pasaporte, I-94, fotos, acta, examen médico sellado si aplica y documentos del patrocinador.',
    proTip: 'El Affidavit of Support se revisa con lupa. Ingresos, taxes y evidencia del sponsor deben estar alineados.',
    premiumInclusions: ['Checklist por formulario', 'Revisión de sponsor', 'Preparación previa a biométricos o entrevista'],
    glossaryDefinition: 'Proceso para solicitar residencia desde dentro de EE.UU. y autorización de empleo mientras se procesa el caso.',
    whoNeedsIt: ['Personas elegibles por petición familiar', 'Solicitantes con entrada documentada', 'Beneficiarios con patrocinador calificado'],
    howItWorks: ['Validamos documentos base.', 'Preparamos formularios.', 'Organizamos soportes financieros.', 'Armamos expediente y copias.'],
    commonMistakes: ['Abrir el sobre médico sellado.', 'No probar ingresos suficientes del sponsor.'],
    faqs: [
      { q: '¿Cuánto tarda el permiso?', a: 'Los tiempos cambian por categoría y oficina. Revisamos el escenario actual al preparar el caso.' },
      { q: '¿Qué pasa si el sponsor no califica?', a: 'Se puede evaluar un joint sponsor si cumple los requisitos.' },
    ],
  },
  {
    id: 'n400',
    icon: Globe,
    title: 'Ciudadanía N-400 y N-600',
    summary: 'Preparación documental para naturalización (N-400) y para el Certificado de Ciudadanía (N-600) cuando los padres hacen ciudadanos a sus hijos menores de edad.',
    features: ['Naturalización N-400', 'Certificado de Ciudadanía N-600', 'Historial de viajes y guía de civismo'],
    turnaround: '3 a 5 días hábiles',
    requirements: 'Green Card, ID estatal, viajes fuera de EE.UU., taxes y cambios de nombre o estado civil. Para N-600: prueba de ciudadanía del padre/madre y documentos del menor.',
    proTip: 'Viajes largos y deudas fiscales sin acuerdo activo pueden afectar el análisis del caso.',
    premiumInclusions: ['Auditoría documental', 'Material de estudio', 'Simulación de preguntas frecuentes'],
    glossaryDefinition: 'El N-400 es la solicitud de naturalización para residentes permanentes elegibles; el N-600 es la solicitud del Certificado de Ciudadanía para hijos menores que adquieren la ciudadanía a través de un padre o madre ciudadano.',
    whoNeedsIt: ['Residentes permanentes de 5 años', 'Residentes casados con ciudadano por 3 años', 'Padres que tramitan el Certificado de Ciudadanía (N-600) para sus hijos menores'],
    howItWorks: ['Revisamos presencia física y viajes.', 'Organizamos taxes y documentos.', 'Preparamos N-400 o N-600 según el caso.', 'Entregamos guía de preparación.'],
    commonMistakes: ['Omitir viajes prolongados.', 'No resolver impuestos pendientes antes de aplicar.'],
    faqs: [
      { q: '¿Puedo aplicar a los 3 años?', a: 'Si cumples requisitos por matrimonio con ciudadano, puede aplicar. Revisamos documentos antes.' },
      { q: '¿Qué es el N-600 y cuándo aplica?', a: 'Es el Certificado de Ciudadanía. Aplica cuando un padre o madre ciudadano transmite la ciudadanía a su hijo menor de edad; te ayudamos a documentar esa relación y a preparar la solicitud.' },
    ],
  },
  {
    id: 'consular',
    icon: ShieldAlert,
    title: 'Soporte Consular',
    summary: 'Organización de citas, formularios y paquetes documentales para procesos consulares y trámites relacionados.',
    features: ['Citas consulares', 'Formularios administrativos', 'Paquete para entrevista'],
    turnaround: '2 a 5 días hábiles',
    requirements: 'Pasaporte, aviso o cita, caso NVC si aplica, documentos civiles y financieros.',
    proTip: 'Lleva al consulado copias consistentes con lo cargado digitalmente; discrepancias provocan retrasos.',
    premiumInclusions: ['Checklist del consulado', 'Organización de carpeta', 'Revisión de documentos cargados'],
    glossaryDefinition: 'Asistencia administrativa para trámites ante consulados, embajadas o portales oficiales relacionados.',
    whoNeedsIt: ['Personas con entrevistas consulares', 'Familias con procesos NVC', 'Clientes renovando pasaportes o documentos'],
    howItWorks: ['Revisamos requisitos.', 'Organizamos formularios y soportes.', 'Armamos carpeta.', 'Preparamos recordatorio de cita.'],
    commonMistakes: ['Llegar sin confirmación de cita.', 'No traducir o actualizar documentos vencidos.'],
    faqs: [
      { q: '¿Gestionan la entrevista?', a: 'Ayudamos con organización documental y formularios; la decisión depende de la autoridad correspondiente.' },
      { q: '¿Trabajan con NVC?', a: 'Sí, brindamos soporte administrativo para organizar documentos civiles y financieros.' },
    ],
  },
]

const otrosServices: ServiceItem[] = [
  {
    id: 'traducciones',
    icon: FileText,
    title: 'Traducciones y Notaría',
    summary: 'Traducciones certificadas, affidavits y notarizaciones presenciales para trámites oficiales.',
    features: ['USCIS-friendly', 'Notaría en oficina', 'PDF y copia física'],
    turnaround: 'Mismo día según volumen',
    requirements: 'Documento legible, nombre completo, destino del trámite y formato requerido.',
    proTip: 'USCIS exige certificado de traducción firmado; no basta traducir el texto en una hoja aparte.',
    premiumInclusions: ['Formato claro', 'Certificación de exactitud', 'Entrega digital y física'],
    glossaryDefinition: 'Servicio de traducción certificada y validación notarial para documentos civiles o administrativos.',
    whoNeedsIt: ['Personas con actas extranjeras', 'Solicitantes de inmigración', 'Clientes que necesitan poderes o declaraciones'],
    howItWorks: ['Recibimos documento.', 'Traducimos y certificamos.', 'Notarizamos si corresponde.', 'Entregamos copia lista para presentar.'],
    commonMistakes: ['Firmar documentos antes del notario.', 'Enviar traducciones sin certificado.'],
    faqs: [
      { q: '¿Acepta USCIS estas traducciones?', a: 'Preparamos traducciones certificadas con carta de exactitud, formato usado comúnmente para USCIS.' },
      { q: '¿Necesito ir a la oficina?', a: 'Para notarización presencial sí; traducciones pueden coordinarse digitalmente según documento.' },
    ],
  },
  {
    id: 'divorcios',
    icon: Scale,
    title: 'Divorcios',
    summary: 'Asistencia administrativa y documental para procesos de divorcio: preparación de formularios, traducciones y organización del expediente.',
    features: ['Preparación de formularios', 'Traducciones certificadas', 'Organización del expediente'],
    turnaround: 'Según el caso',
    requirements: 'Identificaciones, acta de matrimonio, datos de la pareja y documentos relacionados al proceso.',
    proTip: 'Reúne actas y documentos consistentes desde el inicio; los errores u omisiones suelen retrasar el proceso.',
    premiumInclusions: ['Checklist por caso', 'Traducción y notarización cuando aplica', 'Copias digitales del expediente'],
    glossaryDefinition: 'Apoyo administrativo y documental para organizar y preparar la papelería de un proceso de divorcio.',
    whoNeedsIt: ['Personas que inician un divorcio', 'Clientes con documentos en otro idioma', 'Familias que necesitan organizar su papelería'],
    howItWorks: ['Revisamos el caso y los documentos.', 'Preparamos y traducimos formularios.', 'Notarizamos lo que corresponda.', 'Entregamos el expediente listo para presentar.'],
    commonMistakes: ['Presentar formularios incompletos.', 'Enviar documentos sin traducción certificada.'],
    faqs: [
      { q: '¿Ustedes son abogados?', a: 'No somos bufete. Brindamos asistencia administrativa y documental; los asuntos legales se derivan a un abogado cuando corresponde.' },
      { q: '¿Pueden traducir y notarizar los documentos?', a: 'Sí, ofrecemos traducciones certificadas y notarización presencial para documentos elegibles.' },
    ],
  },
  {
    id: 'empresas',
    icon: Briefcase,
    title: 'Formación de Compañías',
    summary: 'Registro de LLC o corporación, EIN, documentos base y orientación para operar con estructura clara.',
    features: ['LLC o corporación', 'EIN federal', 'Operating agreement'],
    turnaround: '48 a 72 horas',
    requirements: 'Nombre deseado, socios, dirección, actividad y estructura preferida.',
    proTip: 'Elegir entidad por moda puede salir caro. La estructura correcta depende de ingresos, riesgo y plan fiscal.',
    premiumInclusions: ['Registro estatal', 'EIN y documentos base', 'Checklist inicial de cumplimiento'],
    glossaryDefinition: 'Proceso legal-administrativo para crear una entidad separada de la persona que la opera.',
    whoNeedsIt: ['Emprendedores', 'Contratistas independientes', 'Negocios que empiezan a contratar'],
    howItWorks: ['Definimos estructura.', 'Verificamos nombre y datos.', 'Presentamos registro.', 'Entregamos documentos y próximos pasos.'],
    commonMistakes: ['Crear una entidad y no mantener registros.', 'No entender obligaciones anuales o estatales.'],
    faqs: [
      { q: '¿LLC o corporación?', a: 'Depende de actividad, socios, impuestos y objetivos. Lo revisamos en consulta.' },
      { q: '¿El EIN llega rápido?', a: 'En muchos casos se obtiene de forma rápida si la información está completa.' },
    ],
  },
]

export const serviceVerticals: Record<ServiceSlug, ServiceVertical> = {
  seguros: {
    slug: 'seguros',
    eyebrow: 'Seguros personales y comerciales',
    title: 'Protección clara para familia, carro, casa y negocio.',
    highlight: 'Comparamos opciones reales y te explicamos qué estás comprando antes de firmar.',
    intro: 'Un equipo bilingüe en Nueva York que organiza coberturas, certificados y renovaciones sin vender humo ni esconder letras pequeñas.',
    ctaPrimary: 'Cotizar cobertura',
    ctaSecondary: 'Ver servicios',
    whatsappLabel: 'Cotizar por WhatsApp',
    whatsappPrompt: 'Hola, necesito cotizar un seguro con Christian Brokerage.',
    calendarEnv: 'VITE_GHL_CALENDAR_SEGUROS',
    calendarUrl: SERVICE_CALENDAR_URL,
    bookingAnchor: 'agendar-seguro',
    bookingTitle: 'Agenda una llamada para cotizar seguro',
    bookingCopy: 'Usa el calendario si está disponible o escríbenos por WhatsApp e incluye los documentos que tengas a mano.',
    visual: {
      src: damarisCoralDesk,
      alt: 'Damaris Escalante de Christian Brokerage atendiendo en su oficina',
      caption: 'Cotizaciones y certificados gestionados desde una oficina local, con seguimiento humano.',
    },
    trust: [
      { icon: ShieldCheck, title: 'Cobertura explicada', desc: 'Deducibles, límites y exclusiones en lenguaje claro.' },
      { icon: Briefcase, title: 'Soporte comercial', desc: 'COI, General Liability y necesidades de contratistas.' },
      { icon: Users, title: 'Atención bilingüe', desc: 'Acompañamiento en español durante emisión y renovación.' },
    ],
    editorialPanel: {
      eyebrow: 'Criterio antes que precio',
      title: 'Una póliza barata puede salir cara si no protege lo que realmente importa.',
      body: 'El enfoque editorial para seguros es simple: menos promesa abstracta y más lectura concreta del riesgo. Revisamos uso, documentos, vencimientos y requisitos de terceros antes de recomendar.',
      bullets: ['Auto, TLC y black car con foco en continuidad operativa.', 'Negocios con certificados y cláusulas revisadas.', 'Casa y vida con explicación de escenarios reales.'],
    },
    services: insuranceServices,
  },
  taxes: {
    slug: 'taxes',
    eyebrow: 'Taxes, ITIN y representación IRS',
    title: 'Preparación fiscal con autoridad, orden y respaldo.',
    highlight: 'Declaraciones, empresas, ITIN y cartas del IRS manejadas por un equipo que entiende el sistema.',
    intro: 'Nos enfocamos en precisión, documentación y explicación. El cliente sabe qué se envía, por qué se envía y qué viene después.',
    ctaPrimary: 'Preparar mis taxes',
    ctaSecondary: 'Ver servicios fiscales',
    whatsappLabel: 'Consultar por WhatsApp',
    whatsappPrompt: 'Hola, necesito ayuda con taxes o un trámite del IRS.',
    calendarEnv: 'VITE_GHL_CALENDAR_TAXES',
    calendarUrl: SERVICE_CALENDAR_URL,
    bookingAnchor: 'agendar-taxes',
    bookingTitle: 'Programa una revisión fiscal',
    bookingCopy: 'Ten a mano cartas del IRS, W-2, 1099, declaraciones previas o documentos de empresa. Si es ITIN, menciona si es solicitud nueva o renovación.',
    visual: {
      src: damarisGrayBook,
      alt: 'Damaris Escalante, Enrolled Agent de Christian Brokerage, revisando educación financiera',
      caption: 'Planeación fiscal con criterio: declaraciones, ITIN y representación ante el IRS.',
    },
    trust: [
      { icon: Award, title: 'IRS Acceptance Agent', desc: 'Proceso ITIN con certificación documental cuando aplica.' },
      { icon: Scale, title: 'Enrolled Agents', desc: 'Representación tributaria autorizada ante el IRS.' },
      { icon: FileSpreadsheet, title: 'Archivo ordenado', desc: 'Preparación pensada para auditorías, bancos y continuidad.' },
    ],
    editorialPanel: {
      eyebrow: 'Fisco sin improvisar',
      title: 'Los taxes no son un formulario: son una foto financiera que debe sostenerse.',
      body: 'Por eso cuidamos consistencia entre ingresos, negocio, créditos, ITIN, cartas y planes futuros como retiro o educación. La estética acompaña esa misma disciplina: sobria, legible y confiable.',
      bullets: ['Preparación personal y comercial.', 'ITIN con Acceptance Agent.', 'Respuesta ante avisos, auditorías y balances pendientes.'],
    },
    services: taxServices,
  },
  inmigracion: {
    slug: 'inmigracion',
    eyebrow: 'Acompañamiento documental migratorio',
    title: 'Trámites migratorios con orden, cuidado y transparencia.',
    highlight: 'Preparamos expedientes administrativos, traducciones y checklists con una regla: claridad desde el primer día.',
    intro: 'Cada caso necesita documentos consistentes, expectativas realistas y comunicación humana. Te ayudamos a organizar el proceso sin prometer resultados que dependen de agencias oficiales.',
    ctaPrimary: 'Revisar documentos',
    ctaSecondary: 'Ver trámites',
    whatsappLabel: 'Consultar por WhatsApp',
    whatsappPrompt: 'Hola, necesito orientación administrativa para un trámite migratorio.',
    calendarEnv: 'VITE_GHL_CALENDAR_INMIGRACION',
    calendarUrl: SERVICE_CALENDAR_URL,
    bookingAnchor: 'agendar-inmigracion',
    bookingTitle: 'Reserva una orientación documental',
    bookingCopy: 'La llamada sirve para ordenar documentos, tiempos y próximos pasos administrativos. Para asesoría legal, te indicaremos cuándo corresponde consultar a un abogado.',
    visual: {
      src: damarisWhiteBook,
      alt: 'Damaris Escalante de Christian Brokerage en atención al cliente',
      caption: 'Acompañamiento presencial y bilingüe para expedientes que requieren cuidado.',
    },
    trust: [
      { icon: HeartHandshake, title: 'Acompañamiento humano', desc: 'Documentos, formularios y seguimiento con calma.' },
      { icon: FileText, title: 'Traducciones certificadas', desc: 'Actas y documentos preparados para presentación.' },
      { icon: ShieldAlert, title: 'Transparencia legal', desc: 'No somos bufete; derivamos cuando el caso requiere abogado.' },
    ],
    editorialPanel: {
      eyebrow: 'Transparencia primero',
      title: 'Organizar un expediente también es cuidar a la persona detrás del trámite.',
      body: 'Inmigración necesita tacto. Reducimos ruido visual y verbal para que el visitante encuentre servicios, requisitos y límites de responsabilidad sin sentirse empujado.',
      bullets: ['Peticiones familiares y ajuste de estatus.', 'Ciudadanía N-400 y N-600.', 'Soporte administrativo consular.'],
      disclaimer: 'Christian Brokerage no es un bufete de abogados y no ofrece asesoría legal migratoria. Brindamos asistencia administrativa, traducciones, notarías y organización documental.',
    },
    services: immigrationServices,
  },
  otros: {
    slug: 'otros',
    eyebrow: 'Notaría, divorcios, traducciones y empresas',
    title: 'Otros servicios para tus trámites personales y de negocio.',
    highlight: 'Notaría, divorcios, traducciones certificadas y formación de compañías, con la misma claridad documental de siempre.',
    intro: 'Reunimos en un solo lugar los trámites que no encajan en seguros, taxes o inmigración pero que igual necesitan orden, traducciones y acompañamiento bilingüe.',
    ctaPrimary: 'Solicitar orientación',
    ctaSecondary: 'Ver servicios',
    whatsappLabel: 'Consultar por WhatsApp',
    whatsappPrompt: 'Hola, necesito ayuda con un trámite de notaría, divorcio, traducción o formación de compañía.',
    calendarEnv: 'VITE_GHL_CALENDAR_OTROS',
    calendarUrl: SERVICE_CALENDAR_URL,
    bookingAnchor: 'agendar-otros',
    bookingTitle: 'Agenda una orientación',
    bookingCopy: 'Cuéntanos qué trámite necesitas resolver y qué documentos tienes a mano. Te indicamos los próximos pasos y, cuando el caso requiere abogado, te lo decimos con claridad.',
    visual: {
      src: damarisWhiteBook,
      alt: 'Damaris Escalante de Christian Brokerage organizando documentos',
      caption: 'Trámites de notaría, traducciones y empresas gestionados desde una oficina local.',
    },
    trust: [
      { icon: FileText, title: 'Traducciones certificadas', desc: 'Documentos con carta de exactitud listos para presentar.' },
      { icon: Scale, title: 'Asistencia documental', desc: 'Divorcios y trámites organizados; derivamos a abogado cuando corresponde.' },
      { icon: Briefcase, title: 'Formación de compañías', desc: 'LLC o corporación, EIN y documentos base.' },
    ],
    editorialPanel: {
      eyebrow: 'Todo en un solo lugar',
      title: 'Trámites distintos, el mismo estándar de orden y transparencia.',
      body: 'Agrupamos notaría, divorcios, traducciones y formación de compañías para que no tengas que buscar en varios lugares. Preparamos, traducimos y organizamos; lo legal se deriva a un abogado cuando el caso lo requiere.',
      bullets: ['Traducciones certificadas y notaría.', 'Asistencia documental en divorcios.', 'Formación de LLC o corporación.'],
      disclaimer: 'Christian Brokerage no es un bufete de abogados y no ofrece asesoría legal. Brindamos asistencia administrativa, traducciones, notarías y organización documental.',
    },
    services: otrosServices,
  },
}
