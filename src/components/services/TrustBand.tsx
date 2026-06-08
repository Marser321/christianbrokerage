import { motion } from 'framer-motion'
import type { TrustPoint } from '../../data/serviceCatalog'

type TrustBandProps = {
  items: TrustPoint[]
}

export function TrustBand({ items }: TrustBandProps) {
  return (
    <section className="border-y border-line bg-surface-card/70 py-6" aria-label="Puntos de confianza">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-5 sm:px-6 md:grid-cols-3 lg:px-8">
        {items.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: index * 0.08 }}
            className="flex gap-4 border-line py-4 md:border-r md:pr-6 last:md:border-r-0"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-accent/10 text-accent">
              <item.icon size={20} />
            </div>
            <div>
              <h2 className="font-sans text-sm font-semibold text-heading">{item.title}</h2>
              <p className="mt-1 text-sm leading-6 text-muted">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
