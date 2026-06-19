import { useEffect, useState } from 'react'
import type { CSSProperties, MouseEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, ChevronDown, Compass, Languages, Menu, Moon, Sun, X } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { ThemedLogo } from '../ui/ThemedLogo'
import { useLanguage, useLocalizedNavigation } from '../../context/LanguageContext'
import { useVariant } from '../../context/VariantContext'
import { useScrollSpy } from '../../hooks/useScrollSpy'
import { menuGroupKey, menuImage } from '../../data/imageLibrary'
import type { AreaNavGroup, SiteNavLink } from '../../data/navigationCatalog'
import { scrollTo } from '../../hooks/useSmoothScroll'

type DesktopNavItem =
  | { type: 'simple'; item: SiteNavLink }
  | { type: 'area'; item: AreaNavGroup }

// Secciones del Home observadas por scroll-spy para mover el indicador activo.
const HOME_SECTIONS = ['hero', 'servicios', 'nosotros', 'valores', 'contacto']
const NOSOTROS_SECTIONS = ['nosotros', 'valores', 'contacto']

function splitTarget(to: string) {
  const [pathAndSearch, hash] = to.split('#')
  const [targetPath] = pathAndSearch.split('?')
  return { targetPath: targetPath || '/', hash }
}

function areaFromPath(pathname: string, areaNavGroups: AreaNavGroup[]) {
  return areaNavGroups.find((area) => area.to === pathname)?.key ?? null
}

function groupedItemCount(area: AreaNavGroup) {
  return area.groups.reduce((total, group) => total + group.items.length, 0)
}

type ThemeToggleProps = {
  theme: 'light' | 'dark'
  onToggle: () => void
  tr: (text: string) => string
  size?: 'desktop' | 'mobile'
}

function ThemeToggle({ theme, onToggle, tr, size = 'desktop' }: ThemeToggleProps) {
  const isDark = theme === 'dark'
  const Icon = isDark ? Sun : Moon
  const label = isDark ? tr('Activar modo claro') : tr('Activar modo oscuro')
  const sizeClass = size === 'desktop' ? 'h-11 w-11' : 'h-10 w-10'

  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      type="button"
      onClick={onToggle}
      aria-label={label}
      title={label}
      className={`inline-flex ${sizeClass} shrink-0 items-center justify-center rounded-md border border-line bg-surface-card text-heading transition hover:border-accent hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent`}
    >
      <Icon size={17} aria-hidden="true" />
    </motion.button>
  )
}

type LanguageToggleProps = {
  language: 'es' | 'en'
  onToggle: () => void
  tr: (text: string) => string
  size?: 'desktop' | 'mobile'
}

function LanguageToggle({ language, onToggle, tr, size = 'desktop' }: LanguageToggleProps) {
  const nextLabel = language === 'es' ? 'EN' : 'ES'
  const label = language === 'es' ? tr('Cambiar a English') : tr('Cambiar a Español')
  const sizeClass = size === 'desktop' ? 'h-11 px-3' : 'h-10 px-3'

  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      type="button"
      onClick={onToggle}
      aria-label={label}
      title={label}
      className={`inline-flex ${sizeClass} shrink-0 items-center justify-center gap-1.5 rounded-md border border-line bg-surface-card text-sm font-semibold text-heading transition hover:border-accent hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent`}
    >
      <Languages size={16} aria-hidden="true" />
      {nextLabel}
    </motion.button>
  )
}

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const { pathname, hash: currentHash } = useLocation()
  const { simpleNavLinks, mobileUtilityLinks, areaNavGroups } = useLocalizedNavigation()
  const { language, toggleLanguage, tr } = useLanguage()
  const [openMobileGroup, setOpenMobileGroup] = useState<string | null>('seguros')
  const { density, theme, toggleTheme } = useVariant()
  const isHome = pathname === '/'
  const activeSection = useScrollSpy(isHome ? HOME_SECTIONS : [])

  const activeArea = areaNavGroups.find((area) => area.key === activeDropdown) ?? null
  const desktopNavItems: DesktopNavItem[] = [
    { type: 'simple', item: simpleNavLinks[0]! },
    ...areaNavGroups.map((area) => ({ type: 'area' as const, item: area })),
    { type: 'simple', item: simpleNavLinks[1]! },
  ]

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleRouteClick = (event: MouseEvent, to: string) => {
    setIsMobileMenuOpen(false)
    setActiveDropdown(null)

    const { targetPath, hash } = splitTarget(to)
    if (hash && pathname === targetPath) {
      event.preventDefault()
      scrollTo(`#${hash}`)
    }
  }

  const isActive = (to: string) => {
    const { targetPath, hash } = splitTarget(to)
    if (hash) {
      if (to === '/#hero') return pathname === '/' && (!currentHash || currentHash === '#hero')
      return pathname === targetPath && currentHash === `#${hash}`
    }
    return pathname === targetPath
  }

  // En el Home, el indicador activo sigue la sección visible (scroll-spy) para los
  // enlaces de ancla (Inicio / Nosotros); fuera del Home usa la ruta.
  const computeActive = (to: string) => {
    if (isHome && (to === '/#hero' || to.endsWith('#nosotros'))) {
      const section = activeSection ?? 'hero'
      if (to === '/#hero') return !NOSOTROS_SECTIONS.includes(section)
      return NOSOTROS_SECTIONS.includes(section)
    }
    return isActive(to)
  }

  const toggleMobileMenu = () => {
    const nextOpen = !isMobileMenuOpen
    if (nextOpen) setOpenMobileGroup(areaFromPath(pathname, areaNavGroups) ?? 'seguros')
    setIsMobileMenuOpen(nextOpen)
  }

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50 px-3 pt-3"
      onMouseLeave={() => setActiveDropdown(null)}
      onKeyDown={(event) => {
        if (event.key === 'Escape') {
          setActiveDropdown(null)
          setIsMobileMenuOpen(false)
        }
      }}
    >
      <div
        className={`mx-auto max-w-7xl rounded-lg border px-4 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300 ${
          isScrolled
            ? 'border-line bg-surface/90 shadow-[0_10px_35px_rgba(10,37,64,0.09)] backdrop-blur-xl'
            : 'border-line bg-surface/80 backdrop-blur'
        }`}
      >
        <div className="flex h-16 items-center justify-between gap-4">
          <Link
            to="/#hero"
            onClick={(event) => handleRouteClick(event, '/#hero')}
            onMouseEnter={() => setActiveDropdown(null)}
            onPointerEnter={() => setActiveDropdown(null)}
            onFocus={() => setActiveDropdown(null)}
            className="flex min-w-0 items-center"
            id="navbar-logo"
          >
            <ThemedLogo className="h-9 w-auto object-contain" />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" id="navbar-desktop" aria-label={tr('Navegación principal')}>
            {desktopNavItems.map(({ type, item: navItem }) => {
              const active = computeActive(navItem.to)
              const isOpen = type === 'area' && activeDropdown === navItem.key

              if (type === 'simple') {
                return (
                  <Link
                    key={navItem.key}
                    to={navItem.to}
                    onClick={(event) => handleRouteClick(event, navItem.to)}
                    onMouseEnter={() => setActiveDropdown(null)}
                    onPointerEnter={() => setActiveDropdown(null)}
                    onFocus={() => setActiveDropdown(null)}
                    className={`relative inline-flex min-h-10 items-center rounded-md px-3 py-2 text-sm font-semibold transition ${
                      active ? 'text-heading' : 'text-muted hover:bg-surface-card hover:text-heading'
                    }`}
                  >
                    {navItem.label}
                    {active ? (
                      <motion.span
                        layoutId="activeNavIndicator"
                        className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-accent"
                      />
                    ) : null}
                  </Link>
                )
              }

              return (
                <Link
                  key={navItem.key}
                  to={navItem.to}
                  onClick={(event) => handleRouteClick(event, navItem.to)}
                  onMouseEnter={() => setActiveDropdown(navItem.key)}
                  onPointerEnter={() => setActiveDropdown(navItem.key)}
                  onMouseMove={() => setActiveDropdown(navItem.key)}
                  onFocus={() => setActiveDropdown(navItem.key)}
                  aria-haspopup="menu"
                  aria-expanded={isOpen}
                  className={`relative inline-flex min-h-10 items-center gap-1.5 rounded-md px-3 py-2 text-sm font-semibold transition ${
                    active || isOpen ? 'text-heading' : 'text-muted hover:bg-surface-card hover:text-heading'
                  }`}
                >
                  {navItem.label}
                  <ChevronDown
                    size={14}
                    aria-hidden="true"
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
            <LanguageToggle language={language} onToggle={toggleLanguage} tr={tr} />
            <ThemeToggle theme={theme} onToggle={toggleTheme} tr={tr} />
            <Link
              to="/diagnostico"
              onMouseEnter={() => setActiveDropdown(null)}
              onPointerEnter={() => setActiveDropdown(null)}
              onFocus={() => setActiveDropdown(null)}
              className="inline-flex min-h-11 items-center gap-2 rounded-md border border-accent/40 px-4 py-2.5 text-sm font-semibold text-heading transition hover:border-accent hover:text-accent"
            >
              <Compass size={15} aria-hidden="true" />
              {tr('Encuentra tu servicio')}
            </Link>
            <Link
              to="/#contacto"
              onClick={(event) => handleRouteClick(event, '/#contacto')}
              onMouseEnter={() => setActiveDropdown(null)}
              onPointerEnter={() => setActiveDropdown(null)}
              onFocus={() => setActiveDropdown(null)}
              className="inline-flex min-h-11 items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-dark"
            >
              {tr('Agendar')}
              <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <LanguageToggle language={language} onToggle={toggleLanguage} tr={tr} size="mobile" />
            <ThemeToggle theme={theme} onToggle={toggleTheme} tr={tr} size="mobile" />
            <motion.button
              whileTap={{ scale: 0.96 }}
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-md border border-line bg-surface-card text-heading"
              onClick={toggleMobileMenu}
              aria-label={isMobileMenuOpen ? tr('Cerrar menú') : tr('Abrir menú')}
              aria-expanded={isMobileMenuOpen}
              aria-controls="navbar-mobile-menu"
              id="navbar-mobile-toggle"
            >
              {isMobileMenuOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
            </motion.button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {activeArea ? (
          <motion.div
            key={activeArea.key}
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="nav-mega fixed left-1/2 top-[86px] hidden w-[min(940px,calc(100vw-2rem))] -translate-x-1/2 overflow-hidden rounded-lg border border-line bg-surface/95 shadow-[0_26px_70px_rgba(10,37,64,0.18)] backdrop-blur-xl lg:block"
            style={{ '--menu-bg': `url("${menuImage(menuGroupKey[activeArea.key] ?? 'neutral', density)}")` } as CSSProperties}
            role="menu"
            aria-label={`${tr('Menú de')} ${activeArea.label}`}
            onMouseEnter={() => setActiveDropdown(activeArea.key)}
            onPointerEnter={() => setActiveDropdown(activeArea.key)}
          >
            <div className="grid grid-cols-12">
              <div className="col-span-4 border-r border-line bg-surface-2/72 p-5">
                <p className="eyebrow mb-3">{activeArea.eyebrow}</p>
                <h2 className="font-sans text-lg font-semibold leading-tight text-heading">{activeArea.label}</h2>
                <p className="mt-3 text-sm leading-6 text-muted">{activeArea.description}</p>
                <p className="mt-4 text-xs font-semibold uppercase text-accent">
                  {groupedItemCount(activeArea)} {tr('servicios organizados')}
                </p>
                <Link
                  to={activeArea.to}
                  onClick={(event) => handleRouteClick(event, activeArea.to)}
                  className="mt-5 inline-flex min-h-10 items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-dark"
                  role="menuitem"
                >
                  {tr('Ver página del área')}
                  <ArrowRight size={15} aria-hidden="true" />
                </Link>
              </div>
              <div
                className="nav-mega-scroll col-span-8 grid max-h-[calc(100vh-7rem)] grid-cols-2 gap-3 overflow-y-auto p-4"
                data-lenis-prevent
              >
                {activeArea.groups.map((group) => (
                  <section key={group.label} className="rounded-md border border-line bg-surface/78 p-3 backdrop-blur-sm">
                    <h3 className="font-sans text-sm font-semibold leading-tight text-heading">{group.label}</h3>
                    <p className="mt-1 text-xs leading-5 text-muted">{group.description}</p>
                    <div className="mt-3 space-y-1">
                      {group.items.map((item) => (
                        <Link
                          key={item.to}
                          to={item.to}
                          onClick={(event) => handleRouteClick(event, item.to)}
                          className="group flex min-h-[58px] gap-3 rounded-md p-2.5 transition hover:bg-surface-card hover:shadow-[0_10px_26px_rgba(10,37,64,0.07)] focus-visible:bg-surface-card"
                          role="menuitem"
                        >
                          <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-accent/10 text-accent transition group-hover:bg-primary group-hover:text-white">
                            <item.icon size={16} aria-hidden="true" />
                          </span>
                          <span className="min-w-0">
                            <span className="block text-sm font-semibold leading-snug text-heading">{item.label}</span>
                            <span className="mt-0.5 block text-xs leading-5 text-muted">{item.desc}</span>
                          </span>
                        </Link>
                      ))}
                    </div>
                  </section>
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
            className="nav-mega-scroll mx-auto mt-2 max-h-[calc(100dvh-92px)] max-w-7xl overflow-y-auto rounded-lg border border-line bg-surface/96 p-3 shadow-[0_18px_45px_rgba(10,37,64,0.14)] backdrop-blur-xl lg:hidden"
            id="navbar-mobile-menu"
            data-lenis-prevent
          >
            <div className="grid grid-cols-3 gap-2 border-b border-line pb-3">
              {mobileUtilityLinks.map((link) => {
                const Icon = link.icon
                return (
                  <Link
                    key={link.key}
                    to={link.to}
                    onClick={(event) => handleRouteClick(event, link.to)}
                    className="flex min-h-11 items-center justify-center gap-2 rounded-md bg-surface-card px-2 text-sm font-semibold text-heading transition hover:bg-surface-2"
                  >
                    <Icon size={15} aria-hidden="true" />
                    <span>{link.label}</span>
                  </Link>
                )
              })}
            </div>

            <div className="mt-3 space-y-2">
              {areaNavGroups.map((area) => {
                const Icon = area.icon
                const isOpen = openMobileGroup === area.key
                return (
                  <div key={area.key} className="rounded-md">
                    <button
                      type="button"
                      onClick={() => setOpenMobileGroup((current) => (current === area.key ? null : area.key))}
                      className="flex min-h-12 w-full items-center justify-between gap-3 rounded-md px-3 text-left text-sm font-semibold text-body transition hover:bg-surface-card hover:text-heading"
                      aria-expanded={isOpen}
                      aria-controls={`mobile-area-${area.key}`}
                    >
                      <span className="flex items-center gap-3">
                        <Icon size={17} className="text-accent" aria-hidden="true" />
                        {area.label}
                      </span>
                      <ChevronDown size={16} aria-hidden="true" className={`text-muted transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {isOpen ? (
                        <motion.div
                          id={`mobile-area-${area.key}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="space-y-4 border-l border-line py-3 pl-4">
                            <Link
                              to={area.to}
                              onClick={(event) => handleRouteClick(event, area.to)}
                              className="flex min-h-10 items-center justify-between rounded-md px-3 text-sm font-semibold text-heading transition hover:bg-surface-card"
                            >
                              {tr('Ver página del área')}
                              <ArrowRight size={15} aria-hidden="true" />
                            </Link>

                            {area.groups.map((group) => (
                              <section key={group.label} className="rounded-md bg-surface-card/60 p-3">
                                <h3 className="font-sans text-xs font-semibold uppercase text-accent">{group.label}</h3>
                                <div className="mt-2 space-y-1">
                                  {group.items.map((item) => (
                                    <Link
                                      key={item.to}
                                      to={item.to}
                                      onClick={(event) => handleRouteClick(event, item.to)}
                                      className="flex min-h-11 items-center gap-3 rounded-md px-2 py-2 text-sm text-body transition hover:bg-surface-card hover:text-heading"
                                    >
                                      <item.icon size={16} className="shrink-0 text-accent" aria-hidden="true" />
                                      <span className="min-w-0">
                                        <span className="block font-semibold leading-snug">{item.label}</span>
                                        <span className="block text-xs leading-5 text-muted">{item.desc}</span>
                                      </span>
                                    </Link>
                                  ))}
                                </div>
                              </section>
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
                to="/diagnostico"
                onClick={(event) => handleRouteClick(event, '/diagnostico')}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-accent/40 bg-surface-card px-4 py-2.5 text-sm font-semibold text-heading"
              >
                <Compass size={15} aria-hidden="true" />
                {tr('Encuentra tu servicio')}
              </Link>
              <Link
                to="/#contacto"
                onClick={(event) => handleRouteClick(event, '/#contacto')}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-white"
              >
                {tr('Agendar')}
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  )
}
