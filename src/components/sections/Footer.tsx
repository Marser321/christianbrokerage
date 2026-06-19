import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ThemedLogo } from '../ui/ThemedLogo'
import { footerCompanyLinks, footerServiceLinks } from '../../data/navigationCatalog'
import { officePhoneDisplay, officePhoneHref } from '../../data/serviceCatalog'
import { staggerContainer, staggerItem, viewportOnce } from '../../lib/motion'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer id="footer" className="border-t border-white/10 bg-surface-invert text-white">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 gap-10 border-b border-white/10 py-14 md:grid-cols-2 lg:grid-cols-4"
        >
          <motion.div variants={staggerItem}>
            <ThemedLogo tone="onInvert" className="h-9 w-auto object-contain" />
            <p className="mt-5 max-w-xs text-sm leading-7 text-white/65">
              Seguros, taxes e inmigración con atención local, documentos claros y acompañamiento en español.
            </p>
          </motion.div>

          <motion.div variants={staggerItem}>
            <h2 className="font-sans text-sm font-semibold uppercase text-accent">Servicios</h2>
            <ul className="mt-5 space-y-3">
              {footerServiceLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="text-sm text-white/70 transition hover:text-accent">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={staggerItem}>
            <h2 className="font-sans text-sm font-semibold uppercase text-accent">Empresa</h2>
            <ul className="mt-5 space-y-3">
              {footerCompanyLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="text-sm text-white/70 transition hover:text-accent">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={staggerItem}>
            <h2 className="font-sans text-sm font-semibold uppercase text-accent">Contacto</h2>
            <div className="mt-5 space-y-4 text-sm text-white/70">
              <a href={officePhoneHref} className="flex items-center gap-3 transition hover:text-accent">
                <Phone size={15} className="shrink-0" aria-hidden="true" />
                {officePhoneDisplay}
              </a>
              <a href="mailto:christianbrokerage@hotmail.com" className="flex items-center gap-3 transition hover:text-accent">
                <Mail size={15} className="shrink-0" aria-hidden="true" />
                christianbrokerage@hotmail.com
              </a>
              <a
                href="https://maps.google.com/?q=501+W+161st+St,+New+York,+NY+10032"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 transition hover:text-accent"
              >
                <MapPin size={15} className="mt-0.5 shrink-0" aria-hidden="true" />
                <span>
                  501 W 161st St
                  <br />
                  New York, NY 10032
                </span>
              </a>
              <div className="flex items-start gap-3 border-t border-white/10 pt-4">
                <Clock size={15} className="mt-0.5 shrink-0" aria-hidden="true" />
                <span>
                  Lun-Vie: 9 AM - 5 PM
                  <br />
                  Sábados (Enero–Abril): 10 AM - 3 PM
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <div className="flex flex-col gap-3 py-6 text-sm text-white/55 md:flex-row md:items-center md:justify-between">
          <p>© {currentYear} Christian Brokerage Inc. Todos los derechos reservados.</p>
          <p>Servicios administrativos y financieros sujetos a elegibilidad, regulación y documentación aplicable.</p>
        </div>
      </div>
    </footer>
  )
}
