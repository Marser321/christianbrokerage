import { ServicePage } from '../components/services/ServicePage'
import { useLocalizedServiceVerticals } from '../context/LanguageContext'

export function Inmigracion() {
  const serviceVerticals = useLocalizedServiceVerticals()
  return <ServicePage vertical={serviceVerticals.inmigracion} />
}

export default Inmigracion
