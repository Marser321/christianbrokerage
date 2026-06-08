import { Building2, CheckCircle2, MapPin } from 'lucide-react'
import damarisOfficeWhite from '../../assets/images/real/damaris-office-white.jpg'

const principles = [
  'Explicar antes de vender.',
  'Pedir documentos con intención.',
  'Diferenciar trámite administrativo de asesoría legal.',
  'Responder con seguimiento humano.',
]

export function Storytelling() {
  return (
    <section id="nosotros" className="bg-paper py-16 md:py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-5 sm:px-6 lg:grid-cols-12 lg:items-center lg:px-8">
        <div className="lg:col-span-6">
          <p className="eyebrow mb-4">Nuestra forma de trabajar</p>
          <h2 className="text-3xl font-serif font-semibold leading-tight text-primary md:text-5xl">
            Una firma local para decisiones que necesitan calma y claridad.
          </h2>
          <p className="mt-5 text-base leading-8 text-neutral-600">
            Christian Brokerage reúne seguros, taxes e inmigración en una oficina bilingüe. El valor no está en prometerlo todo, sino en ordenar cada proceso con documentación, límites claros y seguimiento.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="border-l border-primary/15 pl-4">
              <Building2 className="mb-3 text-accent" size={21} />
              <p className="font-sans text-sm font-semibold text-primary">Oficina física</p>
              <p className="mt-1 text-sm leading-6 text-neutral-600">Atención presencial y bilingüe en Nueva York.</p>
            </div>
            <div className="border-l border-primary/15 pl-4">
              <MapPin className="mb-3 text-accent" size={21} />
              <p className="font-sans text-sm font-semibold text-primary">Presencia comunitaria</p>
              <p className="mt-1 text-sm leading-6 text-neutral-600">Cercanía con familias, negocios y conductores locales.</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6">
          <img
            src={damarisOfficeWhite}
            alt="Atención en la oficina de Christian Brokerage"
            className="aspect-[4/3] w-full rounded-lg border border-primary/10 object-cover shadow-[0_22px_58px_rgba(10,37,64,0.1)]"
            loading="lazy"
          />
          <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {principles.map((principle) => (
              <li key={principle} className="flex gap-3 rounded-lg border border-primary/10 bg-white p-4 text-sm leading-6 text-neutral-700">
                <CheckCircle2 className="mt-0.5 shrink-0 text-accent" size={16} />
                <span>{principle}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
