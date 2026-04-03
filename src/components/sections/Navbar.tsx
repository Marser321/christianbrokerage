import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone, ArrowRight } from 'lucide-react'
import { scrollTo } from '../../hooks/useSmoothScroll'

const navLinks = [
  { label: 'Inicio', href: '#hero' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Contacto', href: '#contacto' },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault()
    scrollTo(href)
    setIsMobileMenuOpen(false)
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        isScrolled
          ? 'py-2'
          : 'py-4'
      }`}
    >
      <div
        className={`mx-auto max-w-7xl px-4 transition-all duration-700 ${
          isScrolled
            ? 'bg-white/70 backdrop-blur-2xl shadow-[0_4px_30px_rgba(10,37,64,0.06)] rounded-2xl mx-4 lg:mx-8 border border-white/50'
            : ''
        }`}
      >
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="flex items-center gap-2.5 group"
            id="navbar-logo"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="relative"
            >
              <img src="/src/assets/images/logo-fcig.png" alt="First Choice Insurance Group" className="h-10 w-auto" />
            </motion.div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1" id="navbar-desktop">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="relative px-4 py-2 text-sm font-medium text-neutral-500 hover:text-primary transition-all duration-300 group"
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-accent rounded-full group-hover:w-4/5 transition-all duration-300" />
              </a>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-4" id="navbar-cta">
            <a
              href="tel:3059741833"
              className="flex items-center gap-2 text-sm font-medium text-neutral-500 hover:text-primary transition-colors"
            >
              <Phone size={15} />
              <span className="hidden xl:inline">305-974-1833</span>
            </a>
            <motion.a
              href="#contacto"
              onClick={(e) => handleNavClick(e, '#contacto')}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="magnetic-btn flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-primary-light transition-colors duration-300"
            >
              Hablemos Gratis
              <ArrowRight size={14} />
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="lg:hidden p-2 rounded-xl text-neutral-600"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            id="navbar-mobile-toggle"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="lg:hidden mx-4 mt-2 bg-white/90 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/60 overflow-hidden"
            id="navbar-mobile-menu"
          >
            <div className="p-6 space-y-1">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="block px-4 py-3.5 text-base font-medium text-neutral-700 hover:text-primary hover:bg-accent/5 rounded-xl transition-all"
                >
                  {link.label}
                </motion.a>
              ))}
              <div className="pt-4 mt-4 border-t border-neutral-100">
                <a
                  href="#contacto"
                  onClick={(e) => handleNavClick(e, '#contacto')}
                  className="flex items-center justify-center gap-2 w-full bg-primary text-white px-5 py-3.5 rounded-xl text-base font-semibold"
                >
                  Hablemos Gratis
                  <ArrowRight size={16} />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
