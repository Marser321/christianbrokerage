import { ServicePage } from '../components/services/ServicePage'
import { useLocalizedServiceVerticals } from '../context/LanguageContext'

export function Seguros() {
  const serviceVerticals = useLocalizedServiceVerticals()
  return <ServicePage vertical={serviceVerticals.seguros} />
}

export default Seguros
