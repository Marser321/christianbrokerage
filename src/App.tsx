import { useSmoothScroll } from './hooks/useSmoothScroll'
import { ScrollProgress } from './components/ui/ScrollProgress'
import { CustomCursor } from './components/ui/CustomCursor'
import { Navbar } from './components/sections/Navbar'
import { Hero } from './components/sections/Hero'
import { MarqueeBand } from './components/ui/MarqueeBand'
import { Services } from './components/sections/Services'
import { Storytelling } from './components/sections/Storytelling'
import { WaveDivider } from './components/ui/WaveDivider'
import { Values } from './components/sections/Values'
import { Founder } from './components/sections/Founder'
import { ContactSection } from './components/sections/CTA'
import { Footer } from './components/sections/Footer'
import { WhatsAppButton } from './components/ui/WhatsAppButton'

function App() {
  useSmoothScroll()

  return (
    <div className="relative cursor-none lg:cursor-none">
      <div className="global-noise" aria-hidden="true" />
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <MarqueeBand variant="dark" speed={35} />
        <Services />
        <WaveDivider from="#0A1628" to="#081a2e" variant="wave" />
        <Storytelling />
        <WaveDivider from="#061629" to="#0a2540" variant="wave" flip />
        <Values />
        <WaveDivider from="#0a2540" to="#ffffff" variant="curve" flip />
        <Founder />
        <MarqueeBand variant="light" speed={30} />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}

export default App
