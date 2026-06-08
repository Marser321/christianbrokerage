import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowRight,
  Building2,
  CalendarDays,
  ChevronDown,
  FileText,
  Globe,
  Home,
  Menu,
  Phone,
  Scale,
  Shield,
  Users,
  X,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { ThemedLogo } from '../ui/ThemedLogo'
import { useVariant } from '../../context/VariantContext'
import { menuGroupKey, menuImage } from '../../data/imageLibrary'
import { officePhoneDisplay, officePhoneHref, serviceVerticals } from '../../data/serviceCatalog'
import { scrollTo } from '../../hooks/useSmoothScroll'

type MenuItem = {
  label: string
  to: string
  desc: string
  icon: LucideIcon
}

type NavGroup = {
  key: string
  label: string
  to: string
  icon: LucideIcon
  eyebrow: string
  description: string
  items: MenuItem[]
}

const homeItems: MenuItem[] = [
  { label: 'Presentación', to: '/#hero', desc: 'Inicio y propuesta principal.', icon: Home },
  { label: 'Servicios', to: '/#servicios', desc: 'Áreas principales de la firma.', icon: Shield },
  { label: 'Nosotros', to: '/#nosotros', desc: 'Oficina, presencia local y certificaciones.', icon: Building2 },
  { label: 'Proceso', to: '/#valores', desc: 'Cómo organizamos cada caso.', icon: FileText },
  { label: 'Contacto', to: '/#contacto', desc: 'Agenda, teléfono y WhatsApp.', icon: CalendarDays },
]

const aboutItems: MenuItem[] = [
  { label: 'Presencia local', to: '/#nosotros', desc: 'Fotos reales, oficina y trato presencial.', icon: Building2 },
  { label: 'Proceso de trabajo', to: '/#valores', desc: 'Escuchar, explicar, preparar y dar seguimiento.', icon: FileText },
  { label: 'Agenda', to: '/#contacto', desc: 'Coordinar una orientación con el equipo.', icon: CalendarDays },
]

function serviceItems(slug: keyof typeof serviceVerticals): MenuItem[] {
  return serviceVerticals[slug].services.map((service) => ({
    label: service.title,
    to: `/${slug}#${service.id}`,
    desc: service.turnaround,
    icon: service.icon,
  }))
}

const navGroups: NavGroup[] = [
  {
    key: 'inicio',
    label: 'Inicio',
    to: '/#hero',
    icon: Home,
    eyebrow: 'Inicio',
    description: 'Accesos rápidos a las secciones principales de la página inicial.',
    items: homeItems,
  },
  {
    key: 'seguros',
    label: 'Seguros',
    to: '/seguros',
    icon: Shield,
    eyebrow: serviceVerticals.seguros.eyebrow,
    description: 'Coberturas personales, comerciales y servicios vinculados a protección.',
    items: serviceItems('seguros'),
  },
  {
    key: 'taxes',
    label: 'Taxes',
    to: '/taxes',
    icon: Scale,
    eyebrow: serviceVerticals.taxes.eyebrow,
    description: 'Declaraciones, ITIN, empresas y representación tributaria.',
    items: serviceItems('taxes'),
  },
  {
    key: 'inmigracion',
    label: 'Inmigración',
    to: '/inmigracion',
    icon: Globe,
    eyebrow: serviceVerticals.inmigracion.eyebrow,
    description: 'Soporte documental, traducciones y trámites administrativos.',
    items: serviceItems('inmigracion'),
  },
  {
    key: 'nosotros',
    label: 'Nosotros',
    to: '/#nosotros',
    icon: Users,
    eyebrow: 'Christian Brokerage',
    description: 'Puntos de confianza, proceso de trabajo y contacto directo.',
    items: aboutItems,
  },
]

function splitHash(to: string) {
  const [targetPath, hash] = to.split('#')
  return { targetPath: targetPath || '/', hash }
}

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [openMobileGroup, setOpenMobileGroup] = useState<string | null>('inicio')
  const { pathname, hash: currentHash } = useLocation()
  const { density } = useVariant()

  const activeGroup = navGroups.find((group) => group.key === activeDropdown) ?? null

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleRouteClick = (event: React.MouseEvent, to: string) => {
    setIsMobileMenuOpen(false)
    setActiveDropdown(null)

    const { targetPath, hash } = splitHash(to)
    if (hash && pathname === targetPath) {
      event.preventDefault()
      scrollTo(`#${hash}`)
    }
  }

  const isActive = (to: string) => {
    const { targetPath, hash } = splitHash(to)
    if (hash) {
      if (to === '/#hero') return pathname === '/' && (!currentHash || currentHash === '#hero')
      return pathname === targetPath && currentHash === `#${hash}`
    }
    return pathname === targetPath
  }

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50 px-3 pt-3"
      onMouseLeave={() => setActiveDropdown(null)}
    >
      <div
        className={`mx-auto max-w-7xl rounded-lg border px-4 transition-all duration-300 ${
          isScrolled
            ? 'border-line bg-surface/90 shadow-[0_10px_35px_rgba(10,37,64,0.09)] backdrop-blur-xl'
            : 'border-line bg-surface/80 backdrop-blur'
        }`}
      >
        <div className="flex h-16 items-center justify-between gap-4">
          <Link
            to="/#hero"
            onClick={(event) => handleRouteClick(event, '/#hero')}
            className="flex min-w-0 items-center"
            id="navbar-logo"
          >
            <ThemedLogo className="h-9 w-auto object-contain" />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" id="navbar-desktop" aria-label="Navegación principal">
            {navGroups.map((group) => {
              const active = isActive(group.to)
              const isOpen = activeDropdown === group.key
              return (
                <Link
                  key={group.key}
                  to={group.to}
                  onClick={(event) => handleRouteClick(event, group.to)}
                  onMouseEnter={() => setActiveDropdown(group.key)}
                  onFocus={() => setActiveDropdown(group.key)}
                  aria-haspopup="menu"
                  aria-expanded={isOpen}
                  className={`relative inline-flex min-h-10 items-center gap-1.5 rounded-md px-3 py-2 text-sm font-semibold transition ${
                    active || isOpen ? 'text-heading' : 'text-muted hover:bg-surface-card hover:text-heading'
                  }`}
                >
                  {group.label}
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${isOpen ? 'rotate-180 text-accent' : 'text-muted'}`}
                  />
                  {active ? (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-accent"
                    />
                  ) : null}
                </Link>
              )
            })}
          </nav>

          <div className="hidden items-center gap-3 lg:flex" id="navbar-cta">
            <a
              href={officePhoneHref}
              className="inline-flex items-center gap-2 text-sm font-semibold text-muted transition hover:text-heading"
            >
              <Phone size={15} />
              <span>{officePhoneDisplay}</span>
            </a>
            <Link
              to="/#contacto"
              onClick={(event) => handleRouteClick(event, '/#contacto')}
              className="inline-flex min-h-11 items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-dark"
            >
              Agendar
              <ArrowRight size={15} />
            </Link>
          </div>

          <motion.button
            whileTap={{ scale: 0.96 }}
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-md border border-line bg-surface-card text-heading lg:hidden"
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={isMobileMenuOpen}
            id="navbar-mobile-toggle"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {activeGroup ? (
          <motion.div
            key={activeGroup.key}
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="nav-mega fixed left-1/2 top-[86px] hidden w-[min(760px,calc(100vw-2rem))] -translate-x-1/2 overflow-hidden rounded-lg border border-line bg-surface/95 shadow-[0_26px_70px_rgba(10,37,64,0.18)] backdrop-blur-xl lg:block"
            style={{ '--menu-bg': `url("${menuImage(menuGroupKey[activeGroup.key] ?? 'neutral', density)}")` } as React.CSSProperties}
            role="menu"
            aria-label={`Menú de ${activeGroup.label}`}
            onMouseEnter={() => setActiveDropdown(activeGroup.key)}
          >
            <div className="grid grid-cols-12">
              <div className="col-span-4 border-r border-line bg-surface-2/70 p-5">
                <p className="eyebrow mb-3">{activeGroup.eyebrow}</p>
                <h2 className="font-sans text-lg font-semibold leading-tight text-heading">{activeGroup.label}</h2>
                <p className="mt-3 text-sm leading-6 text-muted">{activeGroup.description}</p>
                <Link
                  to={activeGroup.to}
                  onClick={(event) => handleRouteClick(event, activeGroup.to)}
                  className="mt-5 inline-flex min-h-10 items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-dark"
                  role="menuitem"
                >
                  Ver página
                  <ArrowRight size={15} />
                </Link>
              </div>
              <div className="col-span-8 grid max-h-[460px] grid-cols-2 gap-1 overflow-y-auto p-3">
                {activeGroup.items.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={(event) => handleRouteClick(event, item.to)}
                    className="group flex min-h-[76px] gap-3 rounded-md p-3 transition hover:bg-surface-card hover:shadow-[0_10px_26px_rgba(10,37,64,0.07)] focus-visible:bg-surface-card"
                    role="menuitem"
                  >
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-accent/10 text-accent transition group-hover:bg-primary group-hover:text-white">
                      <item.icon size={17} />
                    </span>
                    <span>
                      <span className="block text-sm font-semibold leading-snug text-heading">{item.label}</span>
                      <span className="mt-1 block text-xs leading-5 text-muted">{item.desc}</span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {isMobileMenuOpen ? (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.22 }}
            className="mx-auto mt-2 max-h-[calc(100vh-92px)] max-w-7xl overflow-y-auto rounded-lg border border-line bg-surface/96 p-3 shadow-[0_18px_45px_rgba(10,37,64,0.14)] backdrop-blur-xl lg:hidden"
            id="navbar-mobile-menu"
          >
            <div className="space-y-1">
              {navGroups.map((group) => {
                const Icon = group.icon
                const isOpen = openMobileGroup === group.key
                return (
                  <div key={group.key} className="rounded-md">
                    <button
                      type="button"
                      onClick={() => setOpenMobileGroup((current) => (current === group.key ? null : group.key))}
                      className="flex min-h-12 w-full items-center justify-between gap-3 rounded-md px-3 text-left text-sm font-semibold text-body transition hover:bg-surface-card hover:text-heading"
                      aria-expanded={isOpen}
                    >
                      <span className="flex items-center gap-3">
                        <Icon size={17} className="text-accent" />
                        {group.label}
                      </span>
                      <ChevronDown size={16} className={`text-muted transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {isOpen ? (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="space-y-1 border-l border-line py-2 pl-4">
                            <Link
                              to={group.to}
                              onClick={(event) => handleRouteClick(event, group.to)}
                              className="flex min-h-10 items-center justify-between rounded-md px-3 text-sm font-semibold text-heading transition hover:bg-surface-card"
                            >
                              Ver página principal
                              <ArrowRight size={15} />
                            </Link>
                            {group.items.map((item) => (
                              <Link
                                key={item.to}
                                to={item.to}
                                onClick={(event) => handleRouteClick(event, item.to)}
                                className="flex min-h-11 items-center gap-3 rounded-md px-3 py-2 text-sm text-body transition hover:bg-surface-card hover:text-heading"
                              >
                                <item.icon size={16} className="shrink-0 text-accent" />
                                <span>
                                  <span className="block font-semibold leading-snug">{item.label}</span>
                                  <span className="block text-xs leading-5 text-muted">{item.desc}</span>
                                </span>
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </div>
                )
              })}
            </div>
            <div className="mt-3 grid grid-cols-1 gap-2 border-t border-line pt-3 sm:grid-cols-2">
              <Link
                to="/#contacto"
                onClick={(event) => handleRouteClick(event, '/#contacto')}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-white"
              >
                Agendar
                <ArrowRight size={15} />
              </Link>
              <a
                href={officePhoneHref}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-line bg-surface-card px-4 py-2.5 text-sm font-semibold text-heading"
              >
                <Phone size={15} />
                {officePhoneDisplay}
              </a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  )
}
