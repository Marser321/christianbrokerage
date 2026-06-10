import { AnimatePresence, motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { createWhatsappHref } from '../../data/serviceCatalog'
import { useScrolledPastHero } from '../../hooks/useScrolledPastHero'

export function WhatsAppButton() {
  // Aparece solo tras pasar el hero: ahí ya hay un CTA de WhatsApp, así que el
  // flotante sería redundante mientras el hero está a la vista.
  const show = useScrolledPastHero()

  return (
    <AnimatePresence>
      {show ? (
        <motion.a
          href={createWhatsappHref('Hola, vengo del sitio web y necesito información.')}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => window.fbq?.('track', 'Contact', { content_name: 'WhatsApp' })}
          className="group fixed bottom-6 right-6 z-50 hidden md:block"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 18 }}
          aria-label="Contactar por WhatsApp"
          id="whatsapp-button"
        >
          <span className="absolute inset-0 rounded-full bg-[#25D366] animate-pulse-ring" />
          <motion.div
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg shadow-[#25D366]/30"
          >
            <MessageCircle size={26} className="text-white" />
          </motion.div>
          <div className="pointer-events-none absolute right-full top-1/2 mr-3 -translate-y-1/2 translate-x-2 whitespace-nowrap rounded-md border border-line bg-surface-card px-4 py-2.5 opacity-0 shadow-xl transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
            <p className="text-sm font-semibold text-heading">¿Necesitas ayuda?</p>
            <p className="text-xs text-muted">Escríbenos por WhatsApp</p>
          </div>
        </motion.a>
      ) : null}
    </AnimatePresence>
  )
}
