import { AnimatePresence, motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { createWhatsappHref } from '../../data/serviceCatalog'
import { useLanguage } from '../../context/LanguageContext'
import { useScrolledPastHero } from '../../hooks/useScrolledPastHero'

export function WhatsAppButton() {
  // Aparece solo tras pasar el hero: ahí ya hay un CTA de WhatsApp, así que el
  // flotante sería redundante mientras el hero está a la vista.
  const show = useScrolledPastHero()
  const { tr } = useLanguage()

  return (
    <AnimatePresence>
      {show ? (
        <motion.a
          href={createWhatsappHref(tr('Hola, vengo del sitio web y necesito información.'))}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => window.fbq?.('track', 'Contact', { content_name: 'WhatsApp' })}
          className="group fixed right-4 z-50 md:right-6 bottom-[calc(env(safe-area-inset-bottom)+1.25rem)] md:bottom-6"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 18 }}
          aria-label={tr('Contactar por WhatsApp')}
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
          <div className="pointer-events-none absolute right-full top-1/2 mr-3 hidden -translate-y-1/2 translate-x-2 whitespace-nowrap rounded-md border border-line bg-surface-card px-4 py-2.5 opacity-0 shadow-xl transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 md:block">
            <p className="text-sm font-semibold text-heading">{tr('¿Necesitas ayuda?')}</p>
            <p className="text-xs text-muted">{tr('Escríbenos por WhatsApp')}</p>
          </div>
        </motion.a>
      ) : null}
    </AnimatePresence>
  )
}
