import { ServicePage } from '../components/services/ServicePage'
import { useLocalizedServiceVerticals } from '../context/LanguageContext'

export function Otros() {
  const serviceVerticals = useLocalizedServiceVerticals()
  return <ServicePage vertical={serviceVerticals.otros} />
}

export default Otros
