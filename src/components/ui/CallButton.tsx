import { AnimatePresence, motion } from 'framer-motion'
import { PhoneCall } from 'lucide-react'
import { officePhoneDisplay, officePhoneHref } from '../../data/serviceCatalog'
import { useLanguage } from '../../context/LanguageContext'
import { useScrolledPastHero } from '../../hooks/useScrolledPastHero'

export function CallButton() {
  const show = useScrolledPastHero()
  const { tr } = useLanguage()

  return (
    <AnimatePresence>
      {show ? (
        <motion.a
          href={officePhoneHref}
          onClick={() => window.fbq?.('track', 'Contact', { content_name: 'Phone' })}
          className="group fixed left-4 z-50 md:left-6 bottom-[calc(env(safe-area-inset-bottom)+1.25rem)] md:bottom-6"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 18 }}
          aria-label={tr('Llamar a Christian Brokerage')}
          id="call-button"
        >
          <span className="absolute inset-0 rounded-full bg-primary/70 animate-pulse-ring" />
          <motion.div
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="relative flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-lg shadow-primary/25"
          >
            <PhoneCall size={25} aria-hidden="true" />
          </motion.div>
          <div className="pointer-events-none absolute left-full top-1/2 ml-3 hidden -translate-y-1/2 -translate-x-2 whitespace-nowrap rounded-md border border-line bg-surface-card px-4 py-2.5 opacity-0 shadow-xl transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 md:block">
            <p className="text-sm font-semibold text-heading">{tr('Habla con la oficina')}</p>
            <p className="text-xs text-muted">{officePhoneDisplay}</p>
          </div>
        </motion.a>
      ) : null}
    </AnimatePresence>
  )
}
