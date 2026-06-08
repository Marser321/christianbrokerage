import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { useSmoothScroll } from './hooks/useSmoothScroll'
import { MetaPixel } from './components/integrations/MetaPixel'
import { Navbar } from './components/sections/Navbar'
import { Footer } from './components/sections/Footer'
import { ScrollProgress } from './components/ui/ScrollProgress'
import { ScrollToTop } from './components/ui/ScrollToTop'
import { VariantSwitcher } from './components/ui/VariantSwitcher'
import { WhatsAppButton } from './components/ui/WhatsAppButton'

function App() {
  useSmoothScroll()
  const { pathname } = useLocation()

  useEffect(() => {
    const titles: Record<string, string> = {
      '/': 'Christian Brokerage | Seguros, Taxes e Inmigración en Nueva York',
      '/seguros': 'Seguros Generales y Comerciales | Christian Brokerage',
      '/taxes': 'Taxes e Impuestos Certificados | Christian Brokerage',
      '/inmigracion': 'Acompañamiento y Trámites Migratorios | Christian Brokerage',
    }

    const descriptions: Record<string, string> = {
      '/': 'Asesoría bilingüe en seguros, taxes e inmigración desde una oficina local en Nueva York.',
      '/seguros': 'Cotiza seguro de auto, TLC, negocio, casa, vida y más con asesoría clara en español.',
      '/taxes': 'Preparación de taxes personales y comerciales, ITIN y representación ante el IRS.',
      '/inmigracion': 'Soporte administrativo para trámites migratorios, traducciones certificadas y organización documental.',
    }

    document.title = titles[pathname] || 'Christian Brokerage | Seguros, Taxes e Inmigración'

    let metaDesc = document.querySelector('meta[name="description"]')
    if (!metaDesc) {
      metaDesc = document.createElement('meta')
      metaDesc.setAttribute('name', 'description')
      document.head.appendChild(metaDesc)
    }
    metaDesc.setAttribute('content', descriptions[pathname] || descriptions['/'])
  }, [pathname])

  return (
    <div className="relative">
      <div className="global-noise" aria-hidden="true" />
      <MetaPixel />
      <ScrollProgress />
      <ScrollToTop />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
      <VariantSwitcher />
    </div>
  )
}

export default App
