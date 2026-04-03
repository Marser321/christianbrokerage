import { motion } from 'framer-motion'
import { Phone, Mail, MapPin } from 'lucide-react'
import { scrollTo } from '../../hooks/useSmoothScroll'

const footerLinks = {
  servicios: [
    { label: 'Seguro de Auto', href: '#servicios' },
    { label: 'Hogar e Inundaciones', href: '#servicios' },
    { label: 'Comercial y Negocios', href: '#servicios' },
    { label: 'Contratistas', href: '#servicios' },
    { label: 'Salud y Vida', href: '#servicios' },
  ],
  empresa: [
    { label: 'Sobre Nosotros', href: '#nosotros' },
    { label: 'Valores', href: '#valores' },
    { label: 'Liderazgo', href: '#liderazgo' },
    { label: 'Contacto', href: '#contacto' },
  ],
}

export function Footer() {
  const currentYear = new Date().getFullYear()

  const handleClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault()
    scrollTo(href)
  }

  return (
    <footer className="relative bg-primary text-white overflow-hidden" id="footer">
      {/* Background effects */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent/[0.04] rounded-full blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 py-16 border-b border-white/[0.06]">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="bg-white/95 px-4 py-3 rounded-2xl w-max mb-6 inline-block">
              <img src="/src/assets/images/logo-fcig.png" alt="FCIG" className="h-8 w-auto mix-blend-multiply" />
            </div>
            <p className="text-white/65 text-sm leading-relaxed mb-6">
              Tu familia, tu negocio, tu tranquilidad. Nosotros los cuidamos.
            </p>
            {/* Social icons */}
            <div className="flex gap-2.5">
              {[
                {
                  name: 'Facebook',
                  path: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
                },
                {
                  name: 'Instagram',
                  path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z',
                },
              ].map((social) => (
                <motion.a
                  key={social.name}
                  href="#"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] flex items-center justify-center transition-colors"
                  aria-label={social.name}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d={social.path} />
                  </svg>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Services links */}
          <div>
            <h4 className="font-serif font-bold text-white text-sm mb-5 uppercase tracking-widest">
              Servicios
            </h4>
            <ul className="space-y-3">
              {footerLinks.servicios.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleClick(e, link.href)}
                    className="text-white/60 hover:text-accent text-sm transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company links */}
          <div>
            <h4 className="font-serif font-bold text-white text-sm mb-5 uppercase tracking-widest">
              Empresa
            </h4>
            <ul className="space-y-3">
              {footerLinks.empresa.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleClick(e, link.href)}
                    className="text-white/60 hover:text-accent text-sm transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h4 className="font-serif font-bold text-white text-sm mb-5 uppercase tracking-widest">
              Contacto
            </h4>
            <div className="space-y-4">
              <a
                href="tel:3059741833"
                className="flex items-center gap-3 text-white/60 hover:text-accent text-sm transition-colors group"
              >
                <Phone
                  size={14}
                  className="flex-shrink-0 group-hover:scale-110 transition-transform"
                />
                305-974-1833
              </a>
              <a
                href="mailto:info@thefcig.com"
                className="flex items-center gap-3 text-white/60 hover:text-accent text-sm transition-colors group"
              >
                <Mail
                  size={14}
                  className="flex-shrink-0 group-hover:scale-110 transition-transform"
                />
                info@thefcig.com
              </a>
              <div className="flex items-start gap-3 text-white/60 text-sm">
                <MapPin size={14} className="flex-shrink-0 mt-0.5" />
                <span>
                  Florida & Texas
                  <br />
                  <span className="text-white/50">Agencia con Licencia</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/55 text-sm">
            © {currentYear} First Choice Insurance Group. Todos los derechos
            reservados.
          </p>
          <div className="flex gap-6 text-white/50 text-sm">
            <a href="#" className="hover:text-white/70 transition-colors">
              Privacidad
            </a>
            <a href="#" className="hover:text-white/70 transition-colors">
              Términos
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
