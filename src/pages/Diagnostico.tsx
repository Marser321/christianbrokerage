import { useEffect, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CheckCircle2, Languages, Lock } from 'lucide-react'
import { DiagnosticoWizard, findService, resolveInitialFromParams } from '../components/services/ServiceLeadWizard'
import { fadeUp, viewportOnce } from '../lib/motion'

const trustCues = [
  { icon: CheckCircle2, label: 'Sin compromiso' },
  { icon: Languages, label: 'Atención en español' },
  { icon: Lock, label: 'Tus datos no se comparten' },
]

export function Diagnostico() {
  const [searchParams, setSearchParams] = useSearchParams()
  const area = searchParams.get('area')
  const servicio = searchParams.get('servicio')

  // Resolver el estado inicial UNA sola vez al montar: así "Atrás" no reenvía al deep-link.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const initial = useMemo(() => resolveInitialFromParams(area, servicio), [])

  // Limpiar un ?servicio= inválido de la URL (mismo patrón que ServicePage).
  useEffect(() => {
    if (servicio && !findService(servicio)) {
      const next = new URLSearchParams(searchParams)
      next.delete('servicio')
      setSearchParams(next, { replace: true })
    }
  }, [servicio, searchParams, setSearchParams])

  return (
    <div className="bg-surface text-body">
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-2xl px-5 sm:px-6 lg:px-8">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}>
            <p className="eyebrow mb-4">Diagnóstico</p>
            <h1 className="text-3xl font-serif font-semibold leading-tight text-heading md:text-5xl">
              Cuéntanos tu situación y te decimos por dónde empezar.
            </h1>
            <p className="mt-5 text-base leading-8 text-muted">
              Tres o cuatro preguntas rápidas. Al final verás una recomendación clara y, si quieres, dejas tus datos.
              Sin compromiso.
            </p>
            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
              {trustCues.map(({ icon: Icon, label }) => (
                <li key={label} className="inline-flex items-center gap-2">
                  <Icon size={16} className="text-accent" aria-hidden="true" />
                  {label}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="mt-8 md:mt-10"
          >
            <DiagnosticoWizard initial={initial} />
          </motion.div>
        </div>
      </section>
    </div>
  )
}
