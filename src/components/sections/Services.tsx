import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { serviceVerticals } from '../../data/serviceCatalog'

const verticals = [serviceVerticals.seguros, serviceVerticals.taxes, serviceVerticals.inmigracion]

export function Services() {
  return (
    <section id="servicios" className="bg-warm py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-3xl">
          <p className="eyebrow mb-4">Servicios</p>
          <h2 className="text-3xl font-serif font-semibold leading-tight text-primary md:text-5xl">
            Soluciones organizadas para procesos que no deberían sentirse solos.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          {verticals.map((vertical) => (
            <article key={vertical.slug} className="flex min-h-[360px] flex-col rounded-lg border border-primary/10 bg-white p-6 shadow-[0_16px_42px_rgba(10,37,64,0.06)]">
              <p className="eyebrow mb-4">{vertical.eyebrow}</p>
              <h3 className="font-sans text-2xl font-semibold leading-tight text-primary">{vertical.title}</h3>
              <p className="mt-4 text-sm leading-7 text-neutral-600">{vertical.highlight}</p>
              <ul className="mt-6 space-y-3">
                {vertical.services.slice(0, 3).map((service) => (
                  <li key={service.id} className="flex gap-3 text-sm leading-6 text-neutral-700">
                    <CheckCircle2 className="mt-0.5 shrink-0 text-accent" size={16} />
                    <span>{service.title}</span>
                  </li>
                ))}
              </ul>
              <Link
                to={`/${vertical.slug}`}
                className="mt-auto inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-dark"
              >
                Ver área
                <ArrowRight size={16} />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
